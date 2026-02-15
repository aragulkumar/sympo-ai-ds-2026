import './NonTechnicalEvents.css';
import { Palette, Gamepad2, Sparkles, Megaphone, Image } from "lucide-react";

const NonTechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: "Adapture",
            description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
            icon: Palette,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            icon: Gamepad2,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Squad (4 Members)",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            icon: Sparkles,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual or Pair",
            image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop"
        },
        {
            id: 4,
            title: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            icon: Megaphone,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "1-3 Members",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
        },
        {
            id: 5,
            title: "Decode the Frame",
            description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
            icon: Image,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
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

export default NonTechnicalEvents;
