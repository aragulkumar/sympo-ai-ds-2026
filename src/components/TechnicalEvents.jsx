import './TechnicalEvents.css';
import { Code, Cpu, Brain, Lightbulb } from "lucide-react";

const TechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: "Visual Paper Expo",
            description: "Showcase your innovative prototypes and engineering marvels in this exciting exhibition.",
            icon: Code,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 3 Members",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Algo Fest",
            description: "Present your research papers and innovative ideas to expert judges and win exciting prizes.",
            icon: Cpu,
            prize: "₹1500 / No refund",
            fee: "₹150",
            team: "1 to 5 Members",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Neural Knockout",
            description: "Test your technical knowledge and quick thinking in this ultimate tech quiz battle.",
            icon: Brain,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 2 Members",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop"
        },
        {
            id: 4,
            title: "Technovate",
            description: "Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.",
            icon: Lightbulb,
            prize: "Winner: ₹500",
            fee: "₹100 per team",
            team: "2-4 Members",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop"
        },
    ];

    return (
        <section id="technical-events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Technical Events</h2>
                <p className="section-subtitle">
                    Entry Fee: ₹100 per team | All participants receive E-Certificates
                </p>
                <div className="events-grid">
                    {events.map((event) => {
                        const Icon = event.icon;
                        return (
                            <div key={event.id} className="event-card">
                                <div className="card-image">
                                    <img src={event.image} alt={event.title} />
                                </div>
                                <div className="card-header">
                                    <h3 className="event-title">{event.title}</h3>
                                </div>
                                <div className="card-content">
                                    <p className="event-description">{event.description}</p>

                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">FEE</span>
                                            <span className="info-value">{event.fee}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">PRIZES</span>
                                            <span className="info-value">{event.prize}</span>
                                        </div>
                                    </div>

                                    <div className="team-info">
                                        <span className="team-label">TEAM</span>
                                        <span className="team-value">{event.team}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="register-btn">
                                        <span>Register Now</span>
                                    </button>
                                    <button className="rules-btn">Rules</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechnicalEvents;
