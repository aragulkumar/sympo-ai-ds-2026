import { Link } from 'react-router-dom';
import { technicalEvents, nonTechnicalEvents } from '../data/events';
import './Events.css';

const BreakingBadTitle = ({ title }) => {
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
                <span className="element-name">Element</span>
            </span>
            <span className="title-text">{rest}</span>
        </h3>
    );
};

const Events = () => {
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
                                    <div className="card-footer-explore">
                                        <Link to={`/event/${event.id}`} className="explore-btn">
                                            <span>Explore</span>
                                            <div className="btn-glow-small"></div>
                                        </Link>
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
                        Entry Fee: ₹75 per team | E-Certificates for all participants
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
                                    <div className="card-footer-explore">
                                        <Link to={`/event/${event.id}`} className="explore-btn">
                                            <span>Explore</span>
                                            <div className="btn-glow-small"></div>
                                        </Link>
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
