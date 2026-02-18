import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { X, LayoutDashboard, FileText, PlusCircle, LogOut } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('events');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        category: 'technical',
        description: '',
        prize: '',
        fee: '',
        team: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/admin/login');
            } else {
                setUser(currentUser);
                fetchData();
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const eventsSnapshot = await getDocs(collection(db, 'events'));
            setEvents(eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const regSnapshot = await getDocs(collection(db, 'registrations'));
            setRegistrations(regSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteDoc(doc(db, 'events', id));
                setEvents(events.filter(e => e.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'events'), {
                ...newEvent,
                timestamp: serverTimestamp()
            });
            setNewEvent({ title: '', category: 'technical', description: '', prize: '', fee: '', team: '' });
            setShowAddForm(false);
            fetchData();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    if (loading) return <div className="admin-loading">INITIALIZING SYSTEM...</div>;

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
                    </button>
                </aside>

                <main className="dashboard-content">
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
                                                    <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">DELETE</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No events found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {activeTab === 'registrations' && (
                        <section className="management-section">
                            <div className="section-header">
                                <h2>REGISTRATION LOGS</h2>
                            </div>
                            <div className="data-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>EVENT</th>
                                            <th>COLLEGE</th>
                                            <th>DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrations.length > 0 ? registrations.map(reg => (
                                            <tr key={reg.id}>
                                                <td>{reg.name}</td>
                                                <td className="email-cell">{reg.email}</td>
                                                <td className="event-cell">{reg.eventName}</td>
                                                <td>{reg.college}</td>
                                                <td className="date-cell">
                                                    {reg.timestamp ? new Date(reg.timestamp.seconds * 1000).toLocaleDateString() : 'N/A'}
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No registrations found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </main>
            </div>

            {/* Add Event Modal */}
            {showAddForm && (
                <div className="registration-overlay">
                    <div className="registration-modal admin-modal">
                        <button className="close-btn" onClick={() => setShowAddForm(false)}><X size={24} /></button>
                        <h2>SYNTHESIZE NEW EVENT</h2>
                        <form onSubmit={handleAddEvent} className="admin-form">
                            <div className="form-group">
                                <label>Event Title</label>
                                <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
                                    <option value="technical">Technical</option>
                                    <option value="non-technical">Non-Technical</option>
                                    <option value="fun">Fun Games</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Prize</label>
                                <input type="text" value={newEvent.prize} onChange={(e) => setNewEvent({ ...newEvent, prize: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Entry Fee</label>
                                <input type="text" value={newEvent.fee} onChange={(e) => setNewEvent({ ...newEvent, fee: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Team Size</label>
                                <input type="text" value={newEvent.team} onChange={(e) => setNewEvent({ ...newEvent, team: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                            </div>
                            <button type="submit" className="submit-reg-btn">CREATE ELEMENT</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
