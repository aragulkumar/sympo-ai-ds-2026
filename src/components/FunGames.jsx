import './TechnicalEvents.css';

const FunGames = () => {
    const games = [
        {
            id: 1,
            title: 'Who Eats More?',
            description: 'Pani Puri Edition - Test your eating speed and capacity in this delicious challenge. Can you handle the heat?',
            category: 'Food Challenge',
            icon: '🥟',
            prize: 'Exciting Rewards'
        },
        {
            id: 2,
            title: 'Battle of Endurance',
            description: 'Push-up challenge to test your physical strength and stamina. Show your endurance and compete for glory!',
            category: 'Physical Challenge',
            icon: '💪',
            prize: 'Exciting Rewards'
        },
        {
            id: 3,
            title: 'Splash Clash',
            description: 'Cup splash water game - Precision, timing, and a bit of luck. Get ready to make a splash!',
            category: 'Fun Game',
            icon: '💧',
            prize: 'Exciting Rewards'
        },
        {
            id: 4,
            title: 'Track the Tune',
            description: 'Song identification challenge. Test your music knowledge and identify songs from short clips.',
            category: 'Music Quiz',
            icon: '🎵',
            prize: 'Exciting Rewards'
        },
        {
            id: 5,
            title: 'Heisen Guess',
            description: 'Movie identification game. Guess the movie from clues, scenes, or dialogues. Are you a true cinephile?',
            category: 'Movie Quiz',
            icon: '🎬',
            prize: 'Exciting Rewards'
        }
    ];

    return (
        <section id="fun-games" className="section events-section">
            <div className="container">
                <h2 className="section-title">Fun Games</h2>
                <p className="section-description text-center">
                    Entry Fee: ₹50 per head | Winners receive exciting rewards!
                </p>
                <div className="grid events-grid">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="card event-card"
                        >
                            <div className="event-icon">{game.icon}</div>
                            <div className="event-category">{game.category}</div>
                            <h3 className="event-title">{game.title}</h3>
                            <p className="event-description">{game.description}</p>
                            <div className="event-prize">{game.prize}</div>
                            <button className="btn event-btn">Join Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FunGames;
