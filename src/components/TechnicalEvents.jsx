import './TechnicalEvents.css';

const TechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Code Cook',
            description: 'Competitive programming challenge. Debug, optimize, and code your way to victory.',
            category: 'Coding',
            icon: '💻'
        },
        {
            id: 2,
            title: 'Web Heist',
            description: 'Build a stunning web application in limited time. Design meets functionality.',
            category: 'Web Development',
            icon: '🌐'
        },
        {
            id: 3,
            title: 'AI Lab',
            description: 'Machine learning and AI challenges. Train models, solve real-world problems.',
            category: 'Artificial Intelligence',
            icon: '🤖'
        },
        {
            id: 4,
            title: 'Circuit Break',
            description: 'Hardware hacking and embedded systems. Build innovative IoT solutions.',
            category: 'Hardware',
            icon: '⚡'
        },
        {
            id: 5,
            title: 'Data Meth',
            description: 'Data science and analytics competition. Extract insights from complex datasets.',
            category: 'Data Science',
            icon: '📊'
        },
        {
            id: 6,
            title: 'Cyber Defense',
            description: 'Cybersecurity CTF challenge. Hack, defend, and secure systems.',
            category: 'Security',
            icon: '🔒'
        }
    ];

    return (
        <section id="technical-events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Technical Events</h2>
                <p className="section-description text-center">
                    Challenge your technical skills in our Breaking Bad themed competitions
                </p>
                <div className="grid events-grid">
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            className="card event-card fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="event-icon">{event.icon}</div>
                            <div className="event-category">{event.category}</div>
                            <h3 className="event-title">{event.title}</h3>
                            <p className="event-description">{event.description}</p>
                            <button className="btn event-btn">Learn More</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnicalEvents;
