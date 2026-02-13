import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="section-description text-center">
                    Have questions? Want to sponsor? Reach out to us!
                </p>
                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item card">
                            <div className="contact-icon">📧</div>
                            <h3>Email Us</h3>
                            <p>heisenbyte2026@jec.edu.in</p>
                        </div>
                        <div className="contact-item card">
                            <div className="contact-icon">📱</div>
                            <h3>Call Us</h3>
                            <div className="contact-person">
                                <p className="person-name">Gowtham</p>
                                <p className="person-phone">+91 63858 81949</p>
                            </div>
                            <div className="contact-person">
                                <p className="person-name">Srina</p>
                                <p className="person-phone">+91 63798 64735</p>
                            </div>
                        </div>
                        <div className="contact-item card">
                            <div className="contact-icon">📍</div>
                            <h3>Visit Us</h3>
                            <p>Jeppiaar Engineering College<br />Chennai, Tamil Nadu</p>
                        </div>
                    </div>
                    <div className="social-links">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="#" className="social-icon">Instagram</a>
                            <a href="#" className="social-icon">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2026 Heisenbyte. All rights reserved.</p>
                <p className="footer-tagline">Breaking Bad Themed • National Technical Symposium</p>
            </footer>
        </section>
    );
};

export default Contact;
