import './NonTechnicalEvents.css';

const NonTechnicalEvents = () => {
    const events = [
        {
            id: 1,
            title: 'Pixel Perfect',
            description: 'Photography and visual arts competition. Capture moments, tell stories.',
            category: 'Photography',
            icon: '📸'
        },
        {
            id: 2,
            title: 'Design Lab',
            description: 'UI/UX and graphic design challenge. Create stunning visual experiences.',
            category: 'Design',
            icon: '🎨'
        },
        {
            id: 3,
            title: 'Game Theory',
            description: 'Gaming tournament across multiple titles. Compete, strategize, dominate.',
            category: 'Gaming',
            icon: '🎮'
        },
        {
            id: 4,
            title: 'Brain Freeze',
            description: 'Quiz competition testing knowledge across science, tech, and pop culture.',
            category: 'Quiz',
            icon: '🧠'
        },
        {
            id: 5,
            title: 'Pitch Perfect',
            description: 'Business idea presentation. Pitch your startup to industry experts.',
            category: 'Business',
            icon: '💼'
        },
        {
            id: 6,
            title: 'Treasure Hunt',
            description: 'Campus-wide treasure hunt with tech twists. Solve clues, find treasures.',
            category: 'Adventure',
            icon: '🗺️'
        }
    ];

    return (
        <section id="non-technical-events" className="section events-section">
            <div className="container">
                <h2 className="section-title">Non-Technical Events</h2>
                <p className="section-description text-center">
                    Showcase your creativity and skills beyond coding
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

export default NonTechnicalEvents;
