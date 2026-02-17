import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title">About Heisenbyte</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p className="about-intro">
                            <span className="text-primary">Heisenbyte 2026</span> is a national-level technical symposium
                            that brings together the brightest minds in technology, innovation, and creativity.
                        </p>
                        <p>
                            Inspired by the groundbreaking chemistry of Breaking Bad, we're creating a platform where
                            students can <span className="text-secondary">experiment</span>, <span className="text-secondary">innovate</span>,
                            and <span className="text-secondary">transform</span> their ideas into reality.
                        </p>
                        <p>
                            Join us for an unforgettable experience featuring cutting-edge technical competitions,
                            creative challenges, workshops by industry experts, and networking opportunities with
                            leading tech companies.
                        </p>
                    </div>
                    <div className="about-logo">
                        <img src="/heisenbyte-logo.png" alt="Heisenbyte Logo" className="about-logo-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
