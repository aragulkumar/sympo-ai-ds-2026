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
            fee: "₹50 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=400&fit=crop"
        },
        {
            id: 2,
            title: "Battle of Endurance",
            description: "Push-up challenge to test your physical strength and stamina. Show your endurance and compete for glory!",
            icon: Dumbbell,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Splash Clash",
            description: "Cup splash water game - Precision, timing, and a bit of luck. Get ready to make a splash!",
            icon: Droplet,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&h=400&fit=crop"
        },
        {
            id: 4,
            title: "Track the Tune",
            description: "Song identification challenge. Test your music knowledge and identify songs from short clips.",
            icon: Music,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual or Pair",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop"
        },
        {
            id: 5,
            title: "Heisen Guess",
            description: "Movie identification game. Guess the movie from clues, scenes, or dialogues. Are you a true cinephile?",
            icon: Film,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual",
            image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=400&fit=crop"
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
                                <div className="card-image">
                                    <img src={game.image} alt={game.title} />
                                </div>
                                <div className="card-header">
                                    <h3 className="event-title">{game.title}</h3>
                                </div>
                                <div className="card-content">
                                    <p className="event-description">{game.description}</p>

                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">FEE</span>
                                            <span className="info-value">{game.fee}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">PRIZES</span>
                                            <span className="info-value">{game.prize}</span>
                                        </div>
                                    </div>

                                    <div className="team-info">
                                        <span className="team-label">TEAM</span>
                                        <span className="team-value">{game.team}</span>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="register-btn">
                                        <span>Join Now</span>
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

export default FunGames;
