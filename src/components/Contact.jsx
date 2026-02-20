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
                            <p>jec.aids.dept@gmail.com</p>
                        </div>
                        <div className="contact-item card">
                            <div className="contact-icon">📱</div>
                            <h3>Call Us</h3>
                            <p className="contact-role-label">Event Coordinators</p>
                            <div className="contact-person">
                                <p className="person-name">Sanjay Raj</p>
                                <p className="person-phone">+91 77088 66917</p>
                            </div>
                            <div className="contact-person">
                                <p className="person-name">Rithika</p>
                                <p className="person-phone">+91 73392 92203</p>
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
                            <a href="https://www.instagram.com/byte_of_heisen_26?igsh=MWN6bjE1ZDZ0MWRnaw==" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
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
