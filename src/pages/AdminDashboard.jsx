import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { X, FileText, LogOut, Eye, Phone, Mail, User, CreditCard, Image, Cpu, PartyPopper, Trophy, Download, ArrowUpDown, Filter } from 'lucide-react';
import { technicalEvents, nonTechnicalEvents, funGames } from '../data/events';
import './AdminDashboard.css';

// Map event title → category
const categoryMap = {};
technicalEvents.forEach(e => { categoryMap[e.title] = 'technical'; });
nonTechnicalEvents.forEach(e => { categoryMap[e.title] = 'non-technical'; });
funGames.forEach(e => { categoryMap[e.title] = 'fun'; });

const CATEGORIES = [
    { key: 'all', label: 'ALL EVENTS', icon: FileText },
    { key: 'technical', label: 'TECHNICAL', icon: Cpu },
    { key: 'non-technical', label: 'NON-TECHNICAL', icon: Trophy },
    { key: 'fun', label: 'FUN GAMES', icon: PartyPopper },
];

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedReg, setSelectedReg] = useState(null);
    const [sortBy, setSortBy] = useState('event-asc');
    const [eventFilter, setEventFilter] = useState('all');
    const [paymentUpdating, setPaymentUpdating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = localStorage.getItem('heisenbyte_admin_auth') === 'true';
        if (!isAuth) { navigate('/admin/login'); return; }
        setUser({ email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@heisenbyte.com' });
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        let done = false;
        const timeout = setTimeout(() => {
            if (!done) { setError('Connection timeout. Check Firestore rules.'); setLoading(false); }
        }, 8000);
        try {
            const snap = await getDocs(collection(db, 'registrations'));
            setRegistrations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            done = true; clearTimeout(timeout);
        } catch (err) {
            setError('Could not reach database. Check Firestore rules.');
            done = true; clearTimeout(timeout);
        } finally { setLoading(false); }
    };

    const handleLogout = () => {
        localStorage.removeItem('heisenbyte_admin_auth');
        navigate('/admin/login');
    };

    const updatePaymentStatus = async (regId, newStatus) => {
        setPaymentUpdating(true);
        try {
            await updateDoc(doc(db, 'registrations', regId), { paymentStatus: newStatus });
            // Patch local state immediately so table reflects the change
            setRegistrations(prev => prev.map(r =>
                r.id === regId ? { ...r, paymentStatus: newStatus } : r
            ));
            setSelectedReg(prev => ({ ...prev, paymentStatus: newStatus }));
        } catch (err) {
            alert('Failed to update payment status: ' + err.message);
        } finally {
            setPaymentUpdating(false);
        }
    };

    const deleteRegistration = async (regId) => {
        if (!window.confirm('Are you sure you want to DELETE this registration? This cannot be undone.')) return;
        try {
            await deleteDoc(doc(db, 'registrations', regId));
            setRegistrations(prev => prev.filter(r => r.id !== regId));
            setSelectedReg(null);
        } catch (err) {
            alert('Failed to delete registration: ' + err.message);
        }
    };

    // Filter by category
    const filtered = activeCategory === 'all'
        ? registrations
        : registrations.filter(r => categoryMap[r.eventName] === activeCategory);

    // Unique event names present in current category (for event filter dropdown)
    const uniqueEvents = [...new Set(filtered.map(r => r.eventName).filter(Boolean))].sort();

    // Filter by specific event name
    const eventFiltered = eventFilter === 'all'
        ? filtered
        : filtered.filter(r => r.eventName === eventFilter);

    // Event registration count map (for sorting by popularity)
    const eventCountMap = {};
    registrations.forEach(r => {
        if (r.eventName) eventCountMap[r.eventName] = (eventCountMap[r.eventName] || 0) + 1;
    });

    // Sort (on eventFiltered, not filtered)
    const sortedFiltered = [...eventFiltered].sort((a, b) => {
        if (sortBy === 'date-desc') return (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0);
        if (sortBy === 'date-asc') return (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0);
        if (sortBy === 'event-asc') return (a.eventName || '').localeCompare(b.eventName || '');
        if (sortBy === 'event-desc') return (b.eventName || '').localeCompare(a.eventName || '');
        if (sortBy === 'count-desc') return (eventCountMap[b.eventName] || 0) - (eventCountMap[a.eventName] || 0);
        if (sortBy === 'count-asc') return (eventCountMap[a.eventName] || 0) - (eventCountMap[b.eventName] || 0);
        return 0;
    });

    // CSV Export
    const exportCSV = () => {
        const headers = ['Leader Name', 'Leader Email', 'Phone', 'College', 'Event', 'Category', 'Transaction ID', 'Payment Status', 'Date', 'Members'];
        const rows = sortedFiltered.map(r => [
            r.leaderName || '',
            r.leaderEmail || '',
            r.leaderPhone || '',
            r.college || '',
            r.eventName || '',
            categoryMap[r.eventName] || '',
            r.transactionId || '',
            r.screenshotUrl ? 'PAID' : r.transactionId ? 'PENDING' : 'FREE',
            r.timestamp ? new Date(r.timestamp.seconds * 1000).toLocaleDateString('en-IN') : '',
            (r.members || []).filter(m => m.name).map(m => m.name).join(' | ')
        ]);
        const csvContent = [headers, ...rows]
            .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
            .join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `heisenbyte-registrations-${activeCategory}-${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (loading) return (
        <div className="admin-loading-container">
            <div className="admin-loading">INITIALIZING SYSTEM...</div>
            <p style={{ color: '#39ff14', fontSize: '0.8rem', marginTop: '1rem' }}>Connecting to Firestore...</p>
        </div>
    );

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>HEISENBYTE COMMAND CENTER</h1>
                    <span className="user-id">ADMIN: {user?.email}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={18} />
                    <span>TERMINATE SESSION</span>
                </button>
            </header>

            {error && (
                <div className="connection-warning">
                    <span>⚠️ {error}</span>
                    <button onClick={fetchData} className="retry-inline-btn">RETRY</button>
                </div>
            )}

            <div className="dashboard-main">
                {/* ─── Sidebar: Category Tabs ─── */}
                <aside className="dashboard-sidebar">
                    {CATEGORIES.map(cat => {
                        const count = cat.key === 'all'
                            ? registrations.length
                            : registrations.filter(r => categoryMap[r.eventName] === cat.key).length;
                        return (
                            <button
                                key={cat.key}
                                className={activeCategory === cat.key ? 'active' : ''}
                                onClick={() => { setActiveCategory(cat.key); setEventFilter('all'); }}
                            >
                                <cat.icon size={18} />
                                <span>{cat.label}</span>
                                {count > 0 && <span className="badge">{count}</span>}
                            </button>
                        );
                    })}
                </aside>

                {/* ─── Main content ─── */}
                <main className="dashboard-content">
                    <section className="management-section">
                        <div className="section-header">
                            <h2>
                                {CATEGORIES.find(c => c.key === activeCategory)?.label} — REGISTRATIONS
                            </h2>
                            <div className="header-actions">
                                <span className="total-count">{sortedFiltered.length} entries</span>

                                {/* Event Name Filter */}
                                <div className="sort-control">
                                    <Filter size={14} />
                                    <select
                                        value={eventFilter}
                                        onChange={e => setEventFilter(e.target.value)}
                                        className="sort-select"
                                    >
                                        <option value="all">All Events ({filtered.length})</option>
                                        {uniqueEvents.map(evName => (
                                            <option key={evName} value={evName}>
                                                {evName} ({filtered.filter(r => r.eventName === evName).length})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort Control */}
                                <div className="sort-control">
                                    <ArrowUpDown size={14} />
                                    <select
                                        value={sortBy}
                                        onChange={e => setSortBy(e.target.value)}
                                        className="sort-select"
                                    >
                                        <optgroup label="DATE">
                                            <option value="date-desc">Newest First</option>
                                            <option value="date-asc">Oldest First</option>
                                        </optgroup>
                                        <optgroup label="EVENT">
                                            <option value="event-asc">Event A → Z</option>
                                            <option value="event-desc">Event Z → A</option>
                                        </optgroup>
                                        <optgroup label="POPULARITY">
                                            <option value="count-desc">Most Registrations</option>
                                            <option value="count-asc">Least Registrations</option>
                                        </optgroup>
                                    </select>
                                </div>

                                <button className="export-csv-btn" onClick={exportCSV} title="Export to CSV">
                                    <Download size={14} />
                                    <span>EXPORT CSV</span>
                                </button>
                            </div>
                        </div>

                        <div className="data-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>LEADER NAME</th>
                                        <th>PHONE</th>
                                        <th>COLLEGE</th>
                                        <th>EVENT</th>
                                        <th>PAYMENT</th>
                                        <th>DATE</th>
                                        <th>VIEW</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedFiltered.length > 0 ? (() => {
                                        let lastEvent = null;
                                        return sortedFiltered.map(reg => {
                                            const showGroup = (sortBy === 'event-asc' || sortBy === 'event-desc' || sortBy === 'count-desc' || sortBy === 'count-asc') && reg.eventName !== lastEvent;
                                            lastEvent = reg.eventName;
                                            return (
                                                <>
                                                    {showGroup && (
                                                        <tr key={`group-${reg.eventName}`} className="event-group-row">
                                                            <td colSpan="7">
                                                                <span className="event-group-name">{reg.eventName}</span>
                                                                <span className="event-group-count">{eventCountMap[reg.eventName] || 0} registration{eventCountMap[reg.eventName] !== 1 ? 's' : ''}</span>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    <tr
                                                        key={reg.id}
                                                        className="clickable-row"
                                                        onClick={() => setSelectedReg(reg)}
                                                    >
                                                        <td>{reg.leaderName || '—'}</td>
                                                        <td>{reg.leaderPhone || '—'}</td>
                                                        <td>{reg.college || '—'}</td>
                                                        <td className="event-cell">{reg.eventName}</td>
                                                        <td>
                                                            {reg.paymentStatus === 'verified'
                                                                ? <span className="payment-badge paid">✓ VERIFIED</span>
                                                                : reg.paymentStatus === 'rejected'
                                                                    ? <span className="payment-badge" style={{ background: 'rgba(255,68,68,0.1)', color: '#ff4444', borderColor: '#ff4444' }}>✗ REJECTED</span>
                                                                    : reg.screenshotUrl || reg.transactionId
                                                                        ? <span className="payment-badge pending">⏳ PENDING</span>
                                                                        : <span className="payment-badge free">FREE</span>
                                                            }
                                                        </td>
                                                        <td className="date-cell">
                                                            {reg.timestamp
                                                                ? new Date(reg.timestamp.seconds * 1000).toLocaleDateString('en-IN')
                                                                : 'N/A'}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="view-btn"
                                                                onClick={e => { e.stopPropagation(); setSelectedReg(reg); }}
                                                            >
                                                                <Eye size={14} /> VIEW
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            );
                                        });
                                    })() : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#444' }}>
                                                No registrations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            </div>

            {/* ─── Payment Details Modal ─── */}
            {
                selectedReg && (
                    <div className="registration-overlay" onClick={() => setSelectedReg(null)}>
                        <div className="payment-details-modal" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setSelectedReg(null)}><X size={24} /></button>
                            <div className="modal-header-strip"></div>
                            <h2 className="modal-title">REGISTRATION DETAILS</h2>
                            <p className="modal-event-name">{selectedReg.eventName}</p>

                            <div className="details-grid">
                                <div className="detail-item">
                                    <User size={16} />
                                    <div>
                                        <span className="detail-label">LEADER</span>
                                        <span className="detail-value">{selectedReg.leaderName || '—'}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <Mail size={16} />
                                    <div>
                                        <span className="detail-label">EMAIL</span>
                                        <span className="detail-value">{selectedReg.leaderEmail || '—'}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <Phone size={16} />
                                    <div>
                                        <span className="detail-label">PHONE</span>
                                        <span className="detail-value">{selectedReg.leaderPhone || '—'}</span>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <User size={16} />
                                    <div>
                                        <span className="detail-label">COLLEGE</span>
                                        <span className="detail-value">{selectedReg.college || '—'}</span>
                                    </div>
                                </div>
                                {selectedReg.transactionId && (
                                    <div className="detail-item">
                                        <CreditCard size={16} />
                                        <div>
                                            <span className="detail-label">TRANSACTION ID</span>
                                            <span className="detail-value txn-id">{selectedReg.transactionId}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {selectedReg.members?.filter(m => m.name).length > 0 && (
                                <div className="members-section">
                                    <h3>TEAM MEMBERS</h3>
                                    <div className="members-grid">
                                        {selectedReg.members.filter(m => m.name).map((m, i) => (
                                            <div key={i} className="member-card">
                                                <span className="member-num">{i + 2}</span>
                                                <div>
                                                    <div className="member-name">{m.name}</div>
                                                    <div className="member-email">{m.email}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ─── Payment Verification Panel ─── */}
                            <div className="payment-proof-section">
                                <div className="payment-proof-header">
                                    <h3><Image size={16} /> PAYMENT PROOF</h3>
                                    {/* Current status badge */}
                                    <span className={`payment-status-badge ${selectedReg.paymentStatus || 'pending'}`}>
                                        {selectedReg.paymentStatus === 'verified' ? '✓ VERIFIED'
                                            : selectedReg.paymentStatus === 'rejected' ? '✗ REJECTED'
                                                : '⏳ PENDING'}
                                    </span>
                                </div>

                                {/* Screenshot */}
                                {selectedReg.screenshotUrl ? (
                                    <div className="screenshot-wrapper">
                                        <img
                                            src={selectedReg.screenshotUrl}
                                            alt="Payment Screenshot"
                                            className="payment-screenshot"
                                            onClick={() => window.open(selectedReg.screenshotUrl, '_blank')}
                                        />
                                        <p className="screenshot-hint">Click image to open full size ↗</p>
                                    </div>
                                ) : (
                                    <div className="no-screenshot">
                                        {selectedReg.screenshotName
                                            ? <><CreditCard size={14} /> <strong>{selectedReg.screenshotName}</strong><br /><small>Cloudinary not configured — image not stored.</small></>
                                            : 'No payment screenshot uploaded.'
                                        }
                                    </div>
                                )}

                                {/* Manual Status Change */}
                                <div className="payment-action-bar">
                                    <p className="action-bar-label">MANUALLY UPDATE STATUS:</p>
                                    <div className="payment-status-btns">
                                        <button
                                            className={`status-btn pending ${selectedReg.paymentStatus === 'pending' || !selectedReg.paymentStatus ? 'active' : ''}`}
                                            disabled={paymentUpdating || selectedReg.paymentStatus === 'pending' || !selectedReg.paymentStatus}
                                            onClick={() => updatePaymentStatus(selectedReg.id, 'pending')}
                                        >
                                            ⏳ PENDING
                                        </button>
                                        <button
                                            className={`status-btn verified ${selectedReg.paymentStatus === 'verified' ? 'active' : ''}`}
                                            disabled={paymentUpdating || selectedReg.paymentStatus === 'verified'}
                                            onClick={() => updatePaymentStatus(selectedReg.id, 'verified')}
                                        >
                                            ✓ VERIFIED
                                        </button>
                                        <button
                                            className={`status-btn rejected ${selectedReg.paymentStatus === 'rejected' ? 'active' : ''}`}
                                            disabled={paymentUpdating || selectedReg.paymentStatus === 'rejected'}
                                            onClick={() => updatePaymentStatus(selectedReg.id, 'rejected')}
                                        >
                                            ✗ REJECTED
                                        </button>
                                    </div>
                                    {paymentUpdating && <p className="updating-text">Updating...</p>}
                                </div>

                                {/* ─── Delete Registration ─── */}
                                <div className="delete-action-bar">
                                    <button
                                        className="delete-reg-btn"
                                        onClick={() => deleteRegistration(selectedReg.id)}
                                    >
                                        🗑 DELETE REGISTRATION
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default AdminDashboard;
