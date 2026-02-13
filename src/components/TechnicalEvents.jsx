import './TechnicalEvents.css';

const TechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Visual Paper Expo',
            description: 'Present your innovative research ideas through stunning visual paper presentations. Showcase your technical knowledge and creativity.',
            category: 'Presentation',
            icon: '📄',
            prize: 'Winner: ₹500'
        },
        {
            id: 2,
            title: 'Algo Fest',
            description: 'Put your algorithmic skills to the test. Solve complex problems, optimize code, and compete with the best minds.',
            category: 'Competitive Programming',
            icon: '💻',
            prize: 'E-Certificate'
        },
        {
            id: 3,
            title: 'Neural Knockout',
            description: 'Code debugging quiz with a neural twist. Test your debugging skills and technical knowledge in this knockout competition.',
            category: 'Quiz',
            icon: '🧠',
            prize: 'E-Certificate'
        },
        {
            id: 4,
            title: 'Technovate',
            description: 'Innovate and create breakthrough technical solutions. Present your project ideas and bring your vision to life.',
            category: 'Innovation',
            icon: '💡',
            prize: 'E-Certificate'
        }
    ];

    return (
        <section id="technical-events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Technical Events</h2>
                <p className="section-description text-center">
                    Entry Fee: ₹100 per team | All participants receive E-Certificates
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

export default TechnicalEvents;
