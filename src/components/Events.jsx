import './Events.css';
import { Code, Cpu, Brain, Lightbulb, Palette, Gamepad2, Sparkles, Megaphone, Image } from "lucide-react";

const Events = () => {
    const technicalEvents = [
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

    const nonTechnicalEvents = [
        {
            id: 5,
            title: "Adapture",
            description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
            icon: Palette,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop"
        },
        {
            id: 6,
            title: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            icon: Gamepad2,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Squad (4 Members)",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop"
        },
        {
            id: 7,
            title: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            icon: Sparkles,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual or Pair",
            image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop"
        },
        {
            id: 8,
            title: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            icon: Megaphone,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "1-3 Members",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
        },
        {
            id: 9,
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


const Events = () => {
    const events = [
        // Technical Events
        {
            id: 1,
            title: "Visual Paper Expo",
            description: "Showcase your innovative prototypes and engineering marvels in this exciting exhibition.",
            icon: Code,
            prize: "₹1500 / ₹1000 / ₹500 + Certification",
            fee: "Free Entry",
            team: "1 to 3 Members",
            category: "Technical",
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
            category: "Technical",
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
            category: "Technical",
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
            category: "Technical",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop"
        },
        // Non-Technical Events
        {
            id: 5,
            title: "Adapture",
            description: "Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.",
            icon: Palette,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            category: "Non-Technical",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=400&fit=crop"
        },
        {
            id: 6,
            title: "Heisenberg's Last Stand",
            description: "Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.",
            icon: Gamepad2,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Squad (4 Members)",
            category: "Non-Technical",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop"
        },
        {
            id: 7,
            title: "Beauty Glitz",
            description: "On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.",
            icon: Sparkles,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual or Pair",
            category: "Non-Technical",
            image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop"
        },
        {
            id: 8,
            title: "Heisenpitch",
            description: "The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.",
            icon: Megaphone,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "1-3 Members",
            category: "Non-Technical",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
        },
        {
            id: 9,
            title: "Decode the Frame",
            description: "Image identification challenge. Test your visual recognition skills and decode hidden messages in images.",
            icon: Image,
            prize: "₹500 / ₹400",
            fee: "₹75 per head",
            team: "Individual",
            category: "Non-Technical",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
        },
    ];

    return (
        <section id="events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Events</h2>
                <p className="section-subtitle">
                    Technical & Non-Technical Events | E-Certificates for all participants
                </p>
                <div className="events-grid">
                    {events.map((event) => {
                        const Icon = event.icon;
                        return (
                            <div key={event.id} className="event-card">
                                <div className="category-badge">{event.category}</div>
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

export default Events;
