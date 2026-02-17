import './Events.css';
import { FlaskConical, Binary, Atom, Wrench, Ghost, Gamepad2, Pipette, Megaphone, Eye } from "lucide-react";

const Events = () => {
    const technicalEvents = [
        {
            id: 1,
            title: "Visual Paper Expo",
            description: "Showcase your innovative prototypes and engineering marvels in this exciting exhibition.",
            icon: FlaskConical,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 3 Members",
            image: "https://images.unsplash.com/photo-1544383835-2ce29149b7ee?w=800&q=80"
        },
        {
            id: 2,
            title: "Algo Fest",
            description: "Present your research papers and innovative ideas to expert judges and win exciting prizes.",
            icon: Binary,
            prize: "₹1500 / No refund",
            fee: "₹150",
            team: "1 to 5 Members",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
        },
        {
            id: 3,
            title: "Neural Knockout",
            description: "Test your technical knowledge and quick thinking in this ultimate tech quiz battle.",
            icon: Atom,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 2 Members",
            image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80"
        },
        {
            id: 4,
            title: "Technovate",
            description: "Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.",
            icon: Wrench,
            prize: "Winner: ₹500",
            fee: "₹100 per team",
            team: "2-4 Members",
            image: "https://images.unsplash.com/photo-1551065823-2475ba5476a6?w=800&q=80"
        },
    ];

    const nonTechnicalEvents = [
        {
            id: 5,
            title: "Adapture",
            description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
            icon: Ghost,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80"
        },
        {
            id: 6,
            title: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            icon: Gamepad2,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Squad (4 Members)",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
        },
        {
            id: 7,
            title: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            icon: Pipette,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual or Pair",
            image: "https://images.unsplash.com/photo-1576086213369-97a306dca664?w=800&q=80"
        },
        {
            id: 8,
            title: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            icon: Megaphone,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "1-3 Members",
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"
        },
        {
            id: 9,
            title: "Decode the Frame",
            description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
            icon: Eye,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
        },
    ];

    return (
        <>
            {/* Technical Events Section */}
            <section id="technical-events" className="section events-section">
                <div className="container">
                    <h2 className="section-title">Technical Events</h2>
                    <p className="section-subtitle">
                        Entry Fee: ₹100 per team | E-Certificates for all participants
                    </p>
                    <div className="events-grid">
                        {technicalEvents.map((event) => {
                            const Icon = event.icon;
                            return (
                                <div key={event.id} className="event-card">
                                    <div className="card-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="card-icon-overlay">
                                            <Icon size={24} />
                                        </div>
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

            {/* Non-Technical Events Section */}
            <section id="non-technical-events" className="section events-section">
                <div className="container">
                    <h2 className="section-title">Non-Technical Events</h2>
                    <p className="section-subtitle">
                        Entry Fee: ₹75 per head | Winners: ₹500 | Runners-up: ₹400 | E-Certificates for all
                    </p>
                    <div className="events-grid">
                        {nonTechnicalEvents.map((event) => {
                            const Icon = event.icon;
                            return (
                                <div key={event.id} className="event-card">
                                    <div className="card-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="card-icon-overlay">
                                            <Icon size={24} />
                                        </div>
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
        </>
    );
};

export default Events;
