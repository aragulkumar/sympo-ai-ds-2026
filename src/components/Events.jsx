import './Events.css';
import { FlaskConical, Binary, Atom, Wrench, Ghost, Gamepad2, Pipette, Megaphone, Eye } from "lucide-react";

const BreakingBadTitle = ({ title }) => {
    // These are common 2-letter elements or first 2 letters for the theme
    // We'll try to match specific elements for flavor
    const matches = {
        "Visual Paper Expo": "Vi",
        "Algo Fest": "Al",
        "Neural Knockout": "Ne",
        "Technovate": "Te",
        "Adapture": "Ad",
        "Heisenberg's Last Stand": "He",
        "Beauty Glitz": "Be",
        "Heisenpitch": "Hi",
        "Decode the Frame": "De"
    };

    const symbol = matches[title] || title.substring(0, 2);
    const rest = title.startsWith(symbol) ? title.substring(symbol.length) : title;

    return (
        <h3 className="event-title-bb">
            <span className="periodic-element">
                <span className="atomic-number">{Math.floor(Math.random() * 100) + 1}</span>
                <span className="symbol">{symbol}</span>
                <span className="element-name">{symbol === 'Vi' ? 'Vision' : symbol === 'Al' ? 'Algorithm' : 'Element'}</span>
            </span>
            <span className="title-text">{rest}</span>
        </h3>
    );
};

const Events = () => {
    const technicalEvents = [
        {
            id: 1,
            title: "Visual Paper Expo",
            description: "Showcase your innovative prototypes and engineering marvels in this exciting exhibition.",
            icon: FlaskConical,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 3 Members"
        },
        {
            id: 2,
            title: "Algo Fest",
            description: "Present your research papers and innovative ideas to expert judges and win exciting prizes.",
            icon: Binary,
            prize: "₹1500 / No refund",
            fee: "₹150",
            team: "1 to 5 Members"
        },
        {
            id: 3,
            title: "Neural Knockout",
            description: "Test your technical knowledge and quick thinking in this ultimate tech quiz battle.",
            icon: Atom,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 2 Members"
        },
        {
            id: 4,
            title: "Technovate",
            description: "Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.",
            icon: Wrench,
            prize: "Winner: ₹500",
            fee: "₹100 per team",
            team: "2-4 Members"
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
            team: "Individual"
        },
        {
            id: 6,
            title: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            icon: Gamepad2,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Squad (4 Members)"
        },
        {
            id: 7,
            title: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            icon: Pipette,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual or Pair"
        },
        {
            id: 8,
            title: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            icon: Megaphone,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "1-3 Members"
        },
        {
            id: 9,
            title: "Decode the Frame",
            description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
            icon: Eye,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual"
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
                                <div key={event.id} className="event-card themed-typography">
                                    <div className="card-header">
                                        <div className="card-top">
                                            <BreakingBadTitle title={event.title} />
                                            <div className="card-icon-styled">
                                                <Icon size={32} />
                                            </div>
                                        </div>
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
                                <div key={event.id} className="event-card themed-typography">
                                    <div className="card-header">
                                        <div className="card-top">
                                            <BreakingBadTitle title={event.title} />
                                            <div className="card-icon-styled">
                                                <Icon size={32} />
                                            </div>
                                        </div>
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
