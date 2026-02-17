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
                    <img src="/heisenbyte-logo-blue.png" alt="Heisenbyte" className="logo-image" />
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
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
