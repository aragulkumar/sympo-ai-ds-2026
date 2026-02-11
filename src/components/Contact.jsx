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
                            <h3>Email</h3>
                            <p>heisenbyte2026@college.edu</p>
                        </div>
                        <div className="contact-item card">
                            <div className="contact-icon">📱</div>
                            <h3>Phone</h3>
                            <p>+91 XXXXX XXXXX</p>
                        </div>
                        <div className="contact-item card">
                            <div className="contact-icon">📍</div>
                            <h3>Location</h3>
                            <p>Your College Name<br />City, State</p>
                        </div>
                    </div>
                    <div className="social-links">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="#" className="social-icon">Instagram</a>
                            <a href="#" className="social-icon">Twitter</a>
                            <a href="#" className="social-icon">LinkedIn</a>
                            <a href="#" className="social-icon">Facebook</a>
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
