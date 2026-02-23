import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId) => {
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            // Already on home — just scroll
            const element = document.getElementById(sectionId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // On event page — navigate home then scroll after render
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 350);
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <div className="navbar-logo" onClick={() => handleNavClick('hero')}>
                        <img src="/heisenbyte-logo-green.png" alt="Heisenbyte" className="logo-image" />
                    </div>
                    <div className="navbar-college-logos">
                        <img src="/assets/logo1.png" alt="Logo 1" className="college-logo" />
                        <img src="/assets/logo2.png" alt="Logo 2" className="college-logo" />
                        <img src="/assets/logo3.png" alt="Logo 3" className="college-logo" />
                        <img src="/assets/logo4.png" alt="Logo 4" className="college-logo" />
                    </div>
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <a onClick={() => handleNavClick('hero')}>Home</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('about')}>About</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('technical-events')}>Events</a>
                    </li>
                    <li>
                        <a onClick={() => handleNavClick('contact')}>Contact</a>
                    </li>
                    <li>
                        <a
                            href="/assets/poster.png"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-brochure-btn"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                            </svg>
                            Brochure
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
