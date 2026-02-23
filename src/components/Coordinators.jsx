import './Coordinators.css';

// Row 1 – Founder (alone)
const founder = {
    name: "(Late) Hon. Col. Dr. Jeppiaar",
    role: "Founder, Jeppiaar Educational Trust",
    photo: "/assets/jeppiaar.png",
};

// Row 2 – Management trio
const managementConvenors = [
    { name: "Dr. Regeena J Murali", role: "Chairman & Managing Director", photo: "/assets/logo-regeena.png" },
    { name: "Dr. Shaleesha A. Stanley", role: "Dean-Academics", photo: "/assets/logo-shaleesha.png" },
    { name: "Dr. K. Senthil Kumar", role: "Principal", photo: "/assets/Principal.png" },
];

// Row 3 – HOD (alone)
const hod = {
    name: "Dr. T.R. Chenthil",
    role: "HOD, AI&DS",
    photo: "/assets/HOD.png",
};

const facultyCoordinators = [
    { name: "Mrs. Priyadharshini K", role: "Faculty Coordinator", photo: "/assets/staff-coordinator.png" },
];

const getInitials = (name) =>
    name
        .replace(/^(Col\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/gi, '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');

const PersonCard = ({ name, role, photo, quote }) => (
    <div className="coord-card">
        {photo ? (
            <img src={photo} alt={name} className="coord-photo" />
        ) : (
            <div className="coord-avatar">{getInitials(name)}</div>
        )}
        <h3 className="coord-name">{name}</h3>
        {role && <p className="coord-role">{role}</p>}
        {quote && <p className="coord-quote">{quote}</p>}
    </div>
);

const Coordinators = () => {
    return (
        <section id="coordinators" className="coord-section">
            <div className="coord-container">

                {/* CONVENORS */}
                <div className="coord-group">
                    <h2 className="coord-title">Convenors</h2>
                    <div className="coord-title-bar"></div>

                    {/* Row 1 – Founder alone */}
                    <div className="coord-grid coord-grid-center">
                        <PersonCard {...founder} />
                    </div>

                    {/* Row 2 – Management trio */}
                    <div className="coord-grid coord-grid-trio">
                        {managementConvenors.map((p) => (
                            <PersonCard key={p.name} {...p} />
                        ))}
                    </div>

                    {/* Row 3 – HOD alone */}
                    <div className="coord-grid coord-grid-center">
                        <PersonCard {...hod} />
                    </div>
                </div>

                {/* FACULTY COORDINATOR */}
                <div className="coord-group">
                    <h2 className="coord-title">Faculty Coordinator</h2>
                    <div className="coord-title-bar"></div>
                    <div className="coord-grid coord-grid-center">
                        {facultyCoordinators.map((p) => (
                            <PersonCard key={p.name} {...p} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Coordinators;
