import './Contact.css';

const studentCoordinators = [
    { name: "Gowtham", role: "President", phone: "+91 63858 81949" },
    { name: "Srina", role: "Vice President", phone: "+91 63798 64735" },
    { name: "Sanjay Raj", role: "Event Coordinator", phone: "+91 77088 66917" },
    { name: "Rithika", role: "Event Coordinator", phone: "+91 73392 92203" },
];

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                {/* Student Coordinators */}
                <div className="sc-list-wrapper">
                    <h3 className="sc-list-title">Student Coordinators</h3>
                    <div className="sc-list-divider"></div>
                    <div className="sc-list-card">
                        {studentCoordinators.map((person, idx) => (
                            <div key={person.name}>
                                <div className="sc-list-row">
                                    <div className="sc-list-info">
                                        <span className="sc-list-name">{person.name}</span>
                                        <span className="sc-list-role">{person.role}</span>
                                    </div>
                                    <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="sc-list-phone">
                                        {person.phone}
                                    </a>
                                </div>
                                {idx < studentCoordinators.length - 1 && <div className="sc-row-divider" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* College Location */}
                <div className="map-wrapper">
                    <h3 className="map-title">College Location</h3>
                    <div className="map-divider"></div>
                    <div className="map-container">
                        <iframe
                            title="Jeppiaar Engineering College"
                            src="https://maps.google.com/maps?q=Jeppiaar+Engineering+College,Rajiv+Gandhi+Salai,Chennai&output=embed&z=17"
                            width="100%"
                            height="380"
                            style={{ border: 0, borderRadius: '16px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* Contact Us */}
                <div className="contact-links-wrapper">
                    <div className="contact-link-item">
                        <div className="contact-link-icon">📧</div>
                        <div>
                            <p className="contact-link-label">Email Us</p>
                            <a href="mailto:jec.aids.dept@gmail.com" className="contact-link-value">jec.aids.dept@gmail.com</a>
                        </div>
                    </div>
                    <div className="contact-link-item">
                        <div className="contact-link-icon">📷</div>
                        <div>
                            <p className="contact-link-label">Follow Us</p>
                            <a href="https://www.instagram.com/byte_of_heisen_26?igsh=MWN6bjE1ZDZ0MWRnaw==" target="_blank" rel="noopener noreferrer" className="contact-link-value">@byte_of_heisen_26</a>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>© 2026 Heisenbyte. All rights reserved.</p>
                <p className="footer-tagline">Breaking Bad Themed • National Technical Symposium</p>
            </footer>
        </section>
    );
};

export default Contact;
