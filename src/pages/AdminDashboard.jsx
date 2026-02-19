import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { X, FileText, LogOut, Eye, Phone, Mail, User, CreditCard, Image, Cpu, PartyPopper, Trophy } from 'lucide-react';
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

    // Filter registrations by selected category
    const filtered = activeCategory === 'all'
        ? registrations
        : registrations.filter(r => categoryMap[r.eventName] === activeCategory);

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
                                onClick={() => setActiveCategory(cat.key)}
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
                            <span className="total-count">{filtered.length} entries</span>
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
                                    {filtered.length > 0 ? filtered.map(reg => (
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
                                                {reg.screenshotUrl
                                                    ? <span className="payment-badge paid">✓ PAID</span>
                                                    : reg.transactionId
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
                                    )) : (
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
            {selectedReg && (
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

                        {/* ─── Payment Screenshot ─── */}
                        <div className="payment-proof-section">
                            <h3><Image size={16} /> PAYMENT PROOF</h3>
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
                                        ? <>📎 <strong>{selectedReg.screenshotName}</strong><br /><small>Cloudinary not set up — image not stored.</small></>
                                        : 'No payment screenshot uploaded.'
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
