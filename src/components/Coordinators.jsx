import './Coordinators.css';

const convenors = [
    { name: "Dr. K. Senthil Kumar", role: "Principal", photo: "/assets/principal.jpg" },
    { name: "Dr. T.R. Chenthil", role: "Head of Department, AI&DS", photo: "/assets/hod.jpg" },
];

const staffCoordinators = [
    { name: "Mrs. Priya Dharshini", role: "Staff Coordinator", photo: null },
];

const PersonCard = ({ name, role, photo }) => {
    const initials = name
        .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');

    return (
        <div className="coord-card">
            {photo ? (
                <img src={photo} alt={name} className="coord-photo" />
            ) : (
                <div className="coord-avatar">{initials}</div>
            )}
            <h3 className="coord-name">{name}</h3>
            <p className="coord-role">{role}</p>
        </div>
    );
};

const Coordinators = () => {
    return (
        <section id="coordinators" className="coord-section">
            <div className="coord-container">

                {/* Convenors */}
                <div className="coord-group">
                    <h2 className="coord-title">Convenors</h2>
                    <div className="coord-title-bar"></div>
                    <div className="coord-grid">
                        {convenors.map((p) => <PersonCard key={p.name} {...p} />)}
                    </div>
                </div>

                {/* Staff Coordinator */}
                <div className="coord-group">
                    <h2 className="coord-title">Staff Coordinator</h2>
                    <div className="coord-title-bar"></div>
                    <div className="coord-grid coord-grid-center">
                        {staffCoordinators.map((p) => <PersonCard key={p.name} {...p} />)}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Coordinators;
