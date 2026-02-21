import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
                    <img src="/heisenbyte-logo-green.png" alt="Heisenbyte" className="logo-image" />
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
                        <a onClick={() => scrollToSection('hero')}>Home</a>
                    </li>
                    <li>
                        <a onClick={() => scrollToSection('about')}>About</a>
                    </li>
                    <li>
                        <a onClick={() => scrollToSection('technical-events')}>Events</a>
                    </li>
                    <li>
                        <a onClick={() => scrollToSection('contact')}>Contact</a>
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
