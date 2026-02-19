import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, LayoutDashboard, FileText, PlusCircle, LogOut, Eye, Phone, Mail, User, CreditCard, Image } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('registrations');
    const [selectedEventFilter, setSelectedEventFilter] = useState('ALL');
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedReg, setSelectedReg] = useState(null); // for payment details modal
    const [newEvent, setNewEvent] = useState({
        title: '', category: 'technical', description: '', prize: '', fee: '', team: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = localStorage.getItem('heisenbyte_admin_auth') === 'true';
        if (!isAuth) {
            navigate('/admin/login');
        } else {
            setUser({ email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@heisenbyte.com' });
            fetchData();
        }
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        let isDataFetched = false;

        const timeout = setTimeout(() => {
            if (!isDataFetched) {
                setError("CONNECTION TIMEOUT: Check your internet connection or Firestore rules.");
                setLoading(false);
            }
        }, 8000);

        try {
            const eventsSnapshot = await getDocs(collection(db, 'events'));
            setEvents(eventsSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));

            const regSnapshot = await getDocs(collection(db, 'registrations'));
            setRegistrations(regSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));

            isDataFetched = true;
            clearTimeout(timeout);
        } catch (err) {
            console.error('Firestore Error:', err);
            setError("ACCESS DENIED: Could not reach the database. Check Firestore rules.");
            isDataFetched = true;
            clearTimeout(timeout);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('heisenbyte_admin_auth');
        navigate('/admin/login');
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Delete this event?')) {
            try {
                await deleteDoc(doc(db, 'events', id));
                setEvents(events.filter(e => e.id !== id));
            } catch (err) {
                console.error('Error deleting event:', err);
            }
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'events'), { ...newEvent, timestamp: serverTimestamp() });
            setNewEvent({ title: '', category: 'technical', description: '', prize: '', fee: '', team: '' });
            setShowAddForm(false);
            fetchData();
        } catch (err) {
            console.error('Error adding event:', err);
        }
    };

    // Get unique event names from registrations data from events.js
    const allEventNames = ['ALL', ...new Set(registrations.map(r => r.eventName).filter(Boolean))];

    const filteredRegs = selectedEventFilter === 'ALL'
        ? registrations
        : registrations.filter(r => r.eventName === selectedEventFilter);

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
                <aside className="dashboard-sidebar">
                    <button
                        className={activeTab === 'events' ? 'active' : ''}
                        onClick={() => setActiveTab('events')}
                    >
                        <LayoutDashboard size={20} />
                        <span>EVENTS</span>
                    </button>
                    <button
                        className={activeTab === 'registrations' ? 'active' : ''}
                        onClick={() => setActiveTab('registrations')}
                    >
                        <FileText size={20} />
                        <span>REGISTRATIONS</span>
                        {registrations.length > 0 && (
                            <span className="badge">{registrations.length}</span>
                        )}
                    </button>
                </aside>

                <main className="dashboard-content">
                    {/* ─── EVENTS TAB ─── */}
                    {activeTab === 'events' && (
                        <section className="management-section">
                            <div className="section-header">
                                <h2>EVENT MANAGEMENT</h2>
                                <button onClick={() => setShowAddForm(true)} className="add-btn">
                                    <PlusCircle size={18} />
                                    <span>ADD NEW ELEMENT</span>
                                </button>
                            </div>
                            <div className="data-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>TITLE</th>
                                            <th>CATEGORY</th>
                                            <th>PRIZE</th>
                                            <th>REGISTRATIONS</th>
                                            <th>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.length > 0 ? events.map(event => (
                                            <tr key={event.id}>
                                                <td>{event.title}</td>
                                                <td className="category-cell">{event.category}</td>
                                                <td>{event.prize}</td>
                                                <td>
                                                    <span className="reg-count-badge">
                                                        {registrations.filter(r => r.eventName === event.title).length}
                                                    </span>
                                                </td>
                                                <td className="actions-cell">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedEventFilter(event.title);
                                                            setActiveTab('registrations');
                                                        }}
                                                        className="view-btn"
                                                    >
                                                        <Eye size={14} /> VIEW
                                                    </button>
                                                    <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">
                                                        DELETE
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No events found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* ─── REGISTRATIONS TAB ─── */}
                    {activeTab === 'registrations' && (
                        <section className="management-section">
                            <div className="section-header">
                                <h2>REGISTRATION LOGS</h2>
                                <span className="total-count">{filteredRegs.length} entries</span>
                            </div>

                            {/* Per-event filter pills */}
                            <div className="event-filter-pills">
                                {allEventNames.map(name => (
                                    <button
                                        key={name}
                                        className={`filter-pill ${selectedEventFilter === name ? 'active' : ''}`}
                                        onClick={() => setSelectedEventFilter(name)}
                                    >
                                        {name === 'ALL' ? 'ALL EVENTS' : name}
                                        <span className="pill-count">
                                            {name === 'ALL'
                                                ? registrations.length
                                                : registrations.filter(r => r.eventName === name).length}
                                        </span>
                                    </button>
                                ))}
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
                                            <th>DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegs.length > 0 ? filteredRegs.map(reg => (
                                            <tr
                                                key={reg.id}
                                                className="clickable-row"
                                                onClick={() => setSelectedReg(reg)}
                                            >
                                                <td>{reg.leaderName || reg.name || '—'}</td>
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
                                                    {reg.timestamp ? new Date(reg.timestamp.seconds * 1000).toLocaleDateString('en-IN') : 'N/A'}
                                                </td>
                                                <td>
                                                    <button className="view-btn" onClick={e => { e.stopPropagation(); setSelectedReg(reg); }}>
                                                        <Eye size={14} /> VIEW
                                                    </button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No registrations found for this event.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {/* ─── ADD EVENT MODAL ─── */}
            {showAddForm && (
                <div className="registration-overlay">
                    <div className="registration-modal admin-modal">
                        <button className="close-btn" onClick={() => setShowAddForm(false)}><X size={24} /></button>
                        <h2>SYNTHESIZE NEW EVENT</h2>
                        <form onSubmit={handleAddEvent} className="admin-form">
                            <div className="form-group">
                                <label>Event Title</label>
                                <input type="text" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}>
                                    <option value="technical">Technical</option>
                                    <option value="non-technical">Non-Technical</option>
                                    <option value="fun">Fun Games</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Prize</label>
                                <input type="text" value={newEvent.prize} onChange={e => setNewEvent({ ...newEvent, prize: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Entry Fee</label>
                                <input type="text" value={newEvent.fee} onChange={e => setNewEvent({ ...newEvent, fee: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Team Size</label>
                                <input type="text" value={newEvent.team} onChange={e => setNewEvent({ ...newEvent, team: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                            </div>
                            <button type="submit" className="submit-reg-btn">CREATE ELEMENT</button>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── PAYMENT DETAILS MODAL ─── */}
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
                                    <span className="detail-label">Leader</span>
                                    <span className="detail-value">{selectedReg.leaderName || '—'}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Mail size={16} />
                                <div>
                                    <span className="detail-label">Email</span>
                                    <span className="detail-value">{selectedReg.leaderEmail || '—'}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Phone size={16} />
                                <div>
                                    <span className="detail-label">Phone</span>
                                    <span className="detail-value">{selectedReg.leaderPhone || '—'}</span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <User size={16} />
                                <div>
                                    <span className="detail-label">College</span>
                                    <span className="detail-value">{selectedReg.college || '—'}</span>
                                </div>
                            </div>
                            {selectedReg.transactionId && (
                                <div className="detail-item">
                                    <CreditCard size={16} />
                                    <div>
                                        <span className="detail-label">Transaction ID</span>
                                        <span className="detail-value txn-id">{selectedReg.transactionId}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {selectedReg.members && selectedReg.members.length > 0 && (
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
                                    <p className="screenshot-hint">Click image to open full size</p>
                                </div>
                            ) : (
                                <div className="no-screenshot">
                                    {selectedReg.screenshotName
                                        ? <p>📎 File uploaded: <strong>{selectedReg.screenshotName}</strong><br /><small>(Cloudinary not configured — image not stored)</small></p>
                                        : <p>No payment screenshot uploaded.</p>
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
