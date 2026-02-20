import { Link } from 'react-router-dom';
import { funGames } from '../data/events';
import './FunGames.css';

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
                <span className="element-name">Element</span>
            </span>
            <span className="title-text">{rest}</span>
        </h3>
    );
};

const FunGames = () => {
    return (
        <section id="fun-games" className="section events-section">
            <div className="container">
                <h2 className="section-title">Fun Games</h2>

                <div className="events-grid">
                    {funGames.map((game) => {
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
                                <div className="card-footer-explore">
                                    <Link to={`/event/${game.id}`} className="explore-btn">
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
    );
};

export default FunGames;
