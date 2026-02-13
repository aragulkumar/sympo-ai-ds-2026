import './FunGames.css';
import { UtensilsCrossed, Dumbbell, Droplet, Music, Film } from "lucide-react";

const FunGames = () => {
    const games = [
        {
            id: 1,
            title: "Who Eats More?",
            description: "Pani Puri Edition - Test your eating speed and capacity in this delicious challenge. Can you handle the heat?",
            icon: UtensilsCrossed,
            prize: "Exciting Rewards!",
        },
        {
            id: 2,
            title: "Battle of Endurance",
            description: "Push-up challenge to test your physical strength and stamina. Show your endurance and compete for glory!",
            icon: Dumbbell,
            prize: "Exciting Rewards!",
        },
        {
            id: 3,
            title: "Splash Clash",
            description: "Cup splash water game - Precision, timing, and a bit of luck. Get ready to make a splash!",
            icon: Droplet,
            prize: "Exciting Rewards!",
        },
        {
            id: 4,
            title: "Track the Tune",
            description: "Song identification challenge. Test your music knowledge and identify songs from short clips.",
            icon: Music,
            prize: "Exciting Rewards!",
        },
        {
            id: 5,
            title: "Heisen Guess",
            description: "Movie identification game. Guess the movie from clues, scenes, or dialogues. Are you a true cinephile?",
            icon: Film,
            prize: "Exciting Rewards!",
        },
    ];

    return (
        <section id="fun-games" className="section events-section">
            <div className="container">
                <h2 className="section-title">Fun Games</h2>
                <p className="section-subtitle">
                    Entry Fee: ₹50 per head | Winners receive exciting rewards!
                </p>
                <div className="events-grid">
                    {games.map((game) => {
                        const Icon = game.icon;
                        return (
                            <div key={game.id} className="event-card">
                                <div className="card-header">
                                    <div className="icon-wrapper">
                                        <Icon className="event-icon" />
                                    </div>
                                    <h3 className="event-title">{game.title}</h3>
                                </div>
                                <div className="card-content">
                                    <p className="event-description">{game.description}</p>
                                    <div className="prize-badge">
                                        <span className="trophy">🎁</span>
                                        <span className="prize-text">{game.prize}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="register-btn">
                                        <span>Join Now</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FunGames;
