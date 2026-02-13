import './NonTechnicalEvents.css';
import { Palette, Gamepad2, Sparkles, Megaphone, Image } from "lucide-react";

const NonTechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: "Adapture",
            description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
            icon: Palette,
            prize: "Winner: ₹500 | Runner-up: ₹400",
        },
        {
            id: 2,
            title: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            icon: Gamepad2,
            prize: "Winner: ₹500 | Runner-up: ₹400",
        },
        {
            id: 3,
            title: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            icon: Sparkles,
            prize: "Winner: ₹500 | Runner-up: ₹400",
        },
        {
            id: 4,
            title: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            icon: Megaphone,
            prize: "Winner: ₹500 | Runner-up: ₹400",
        },
        {
            id: 5,
            title: "Decode the Frame",
            description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
            icon: Image,
            prize: "Winner: ₹500 | Runner-up: ₹400",
        },
    ];

    return (
        <section id="non-technical-events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Non-Technical Events</h2>
                <p className="section-subtitle">
                    Entry Fee: ₹75 per head | Winners: ₹500 | Runners-up: ₹400 | E-Certificates for all
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
                                    <button className="register-btn">
                                        <span>Register Now</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NonTechnicalEvents;
