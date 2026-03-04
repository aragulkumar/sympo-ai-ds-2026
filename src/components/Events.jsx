import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { technicalEvents, nonTechnicalEvents } from '../data/events';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
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
    const [closedEvents, setClosedEvents] = useState({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const snap = await getDocs(collection(db, 'eventSettings'));
                const map = {};
                snap.docs.forEach(d => { map[d.id] = d.data().registrationClosed === true; });
                setClosedEvents(map);
            } catch (err) {
                console.warn('Could not fetch eventSettings:', err.message);
            }
        };
        fetchSettings();
    }, []);

    const isClosed = (event) => closedEvents[event.id] ?? event.registrationClosed ?? false;

    const renderCard = (event) => {
        const Icon = event.icon;
        const closed = isClosed(event);
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
                {closed && (
                    <div className="reg-closed-badge">🔒 Registration Closed</div>
                )}
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
                    <Link
                        to={`/event/${event.id}`}
                        className={`explore-btn ${closed ? 'explore-btn-closed' : ''}`}
                    >
                        <span>{closed ? 'View Details' : 'Explore'}</span>
                        <div className="btn-glow-small"></div>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Technical Events Section */}
            <section id="technical-events" className="section events-section">
                <div className="container">
                    <h2 className="section-title">Technical Events</h2>
                    <div className="events-grid">
                        {technicalEvents.map(renderCard)}
                    </div>
                </div>
            </section>

            {/* Non-Technical Events Section */}
            <section id="non-technical-events" className="section events-section">
                <div className="container">
                    <h2 className="section-title">Non-Technical Events</h2>
                    <div className="events-grid">
                        {nonTechnicalEvents.map(renderCard)}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Events;
