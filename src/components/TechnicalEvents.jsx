import './TechnicalEvents.css';
import { Code, Cpu, Brain, Lightbulb } from "lucide-react";

const TechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: "Visual Paper Expo",
            description: "Present your innovative research ideas through stunning visual paper presentations. Showcase your technical knowledge and creativity.",
            icon: Code,
            prize: "Winner: ₹500",
        },
        {
            id: 2,
            title: "Algo Fest",
            description: "Put your algorithmic skills to the test. Solve complex problems, optimize code, and compete with the best minds.",
            icon: Cpu,
            prize: "Winner: ₹500",
        },
        {
            id: 3,
            title: "Neural Knockout",
            description: "Code debugging quiz with a neural twist. Test your debugging skills and technical knowledge in this knockout competition.",
            icon: Brain,
            prize: "Winner: ₹500",
        },
        {
            id: 4,
            title: "Technovate",
            description: "Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.",
            icon: Lightbulb,
            prize: "Winner: ₹500",
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
                                <div className="card-header">
                                    <div className="icon-wrapper">
                                        <Icon className="event-icon" />
                                    </div>
                                    <h3 className="event-title">{event.title}</h3>
                                </div>
                                <div className="card-content">
                                    <p className="event-description">{event.description}</p>
                                    <div className="prize-badge">
                                        <span className="trophy">🏆</span>
                                        <span className="prize-text">{event.prize}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="register-btn">Register Now</button>
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
