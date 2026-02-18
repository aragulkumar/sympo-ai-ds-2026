import { useState } from 'react';
// Firebase auth import removed for local login
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

        // Local credential check for event purpose using env variables
        if (email === adminEmail && password === adminPass) {
            localStorage.setItem('heisenbyte_admin_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid restricted credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="login-card">
                <div className="bb-logo-small">
                    <span className="element">Ad</span>
                    <span className="details">
                        <span className="atomic">101</span>
                        <span className="name">Admin</span>
                    </span>
                </div>
                <h2>RESTRICTED ACCESS</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Identity (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter Email"
                        />
                    </div>
                    <div className="input-group">
                        <label>Security Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Security Key"
                        />
                    </div>
                    {error && <p className="login-error">{error}</p>}
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
