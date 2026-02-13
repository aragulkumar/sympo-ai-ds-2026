import './NonTechnicalEvents.css';

const NonTechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Adapture',
            description: 'Showcase your creativity and adaptability. Think on your feet and present innovative solutions to unexpected challenges.',
            category: 'Creative Challenge',
            icon: '🎭',
            prize: 'Winner: ₹500'
        },
        {
            id: 2,
            title: "Heisenberg's Last Stand",
            description: 'Squad Battle Royale gaming tournament. Team up, strategize, and be the last squad standing in this intense competition.',
            category: 'Gaming - Squad BR',
            icon: '🎮',
            prize: 'Winner: ₹500'
        },
        {
            id: 3,
            title: 'Beauty Glitz',
            description: 'On-the-spot makeup challenge. Transform your canvas with creativity, skill, and style under time pressure.',
            category: 'Beauty & Style',
            icon: '💄',
            prize: 'Winner: ₹500'
        },
        {
            id: 4,
            title: 'Heisenpitch',
            description: 'The Marketing Lab - Present your innovative marketing strategies and pitch your ideas to win over the judges.',
            category: 'Marketing',
            icon: '📢',
            prize: 'Winner: ₹500'
        },
        {
            id: 5,
            title: 'Decode the Frame',
            description: 'Image identification challenge. Test your visual recognition skills and decode hidden messages in images.',
            category: 'Visual Challenge',
            icon: '🖼️',
            prize: 'Winner: ₹500'
        }
    ];

    return (
        <section id="non-technical-events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Non-Technical Events</h2>
                <p className="section-description text-center">
                    Entry Fee: ₹75 per head | Winners: ₹500 | Runners-up: ₹400 | All participants receive E-Certificates
                </p>
                <div className="grid events-grid">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="card event-card"
                        >
                            <div className="event-icon">{event.icon}</div>
                            <div className="event-category">{event.category}</div>
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-description">{event.description}</p>
                            <div className="event-prize">{event.prize}</div>
                            <button className="btn event-btn">Register Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NonTechnicalEvents;
