import './FunGames.css';
import { UtensilsCrossed, Dumbbell, Droplet, Music, Film } from "lucide-react";

const BreakingBadTitle = ({ title }) => {
    // Mapping for game titles to periodic elements for flavor
    const matches = {
        "Who Eats More?": "Wh",
        "Battle of Endurance": "Ba",
        "Splash Clash": "Sp",
        "Track the Tune": "Tr",
        "Heisen Guess": "He"
    };

    const symbol = matches[title] || title.substring(0, 2);
    const rest = title.startsWith(symbol) ? title.substring(symbol.length) : title;

    return (
        <h3 className="event-title-bb">
            <span className="periodic-element">
                <span className="atomic-number">{Math.floor(Math.random() * 100) + 1}</span>
                <span className="symbol">{symbol}</span>
                <span className="element-name">{symbol === 'Wh' ? 'Weight' : symbol === 'Ba' ? 'Barium' : symbol === 'He' ? 'Helium' : 'Element'}</span>
            </span>
            <span className="title-text">{rest}</span>
        </h3>
    );
};

const FunGames = () => {
    const games = [
        {
            id: 1,
            title: "Who Eats More?",
            description: "Pani Puri Edition - Test your eating speed and capacity in this delicious challenge. Can you handle the heat?",
            icon: UtensilsCrossed,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual"
        },
        {
            id: 2,
            title: "Battle of Endurance",
            description: "Push-up challenge to test your physical strength and stamina. Show your endurance and compete for glory!",
            icon: Dumbbell,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual"
        },
        {
            id: 3,
            title: "Splash Clash",
            description: "Cup splash water game - Precision, timing, and a bit of luck. Get ready to make a splash!",
            icon: Droplet,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual"
        },
        {
            id: 4,
            title: "Track the Tune",
            description: "Song identification challenge. Test your music knowledge and identify songs from short clips.",
            icon: Music,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual or Pair"
        },
        {
            id: 5,
            title: "Heisen Guess",
            description: "Movie identification game. Guess the movie from clues, scenes, or dialogues. Are you a true cinephile?",
            icon: Film,
            prize: "Exciting Rewards!",
            fee: "₹50 per head",
            team: "Individual"
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
                            <div key={game.id} className="event-card themed-typography">
                                <div className="card-header">
                                    <div className="card-top">
                                        <BreakingBadTitle title={game.title} />
                                        <div className="card-icon-styled">
                                            <Icon size={32} />
                                        </div>
                                    </div>
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
