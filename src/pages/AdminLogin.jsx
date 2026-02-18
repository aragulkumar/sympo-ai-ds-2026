import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid credentials or authentication error.');
            console.error(err);
        } finally {
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
                            placeholder="mr-white@heisenbyte.com"
                        />
                    </div>
                    <div className="input-group">
                        <label>Security Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
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
