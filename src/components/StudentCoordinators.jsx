import './StudentCoordinators.css';

const coordinators = {
    leadership: [
        { name: "Gowtham", role: "President", phone: "+91 63858 81949" },
        { name: "Srina", role: "Vice President", phone: "+91 63798 64735" },
    ],
    eventCoordinators: [
        { name: "Sanjay Raj", role: "Event Coordinator", phone: "+91 77088 66917" },
        { name: "Rithika", role: "Event Coordinator", phone: "+91 73392 92203" },
    ],
};

const CoordinatorCard = ({ name, role, phone }) => (
    <div className="sc-card">
        <div className="sc-avatar">
            {name.charAt(0).toUpperCase()}
        </div>
        <h3 className="sc-name">{name}</h3>
        <p className="sc-role">{role}</p>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="sc-phone">{phone}</a>
    </div>
);

const StudentCoordinators = () => {
    return (
        <section id="student-coordinators" className="sc-section">
            <div className="sc-container">
                <h2 className="sc-title">Student Coordinators</h2>
                <div className="sc-divider"></div>

                {/* Leadership */}
                <div className="sc-group">
                    <div className="sc-group-grid sc-leadership">
                        {coordinators.leadership.map((c) => (
                            <CoordinatorCard key={c.name} {...c} />
                        ))}
                    </div>
                </div>

                {/* Event Coordinators */}
                <div className="sc-group">
                    <p className="sc-group-label">Event Coordinators</p>
                    <div className="sc-group-grid">
                        {coordinators.eventCoordinators.map((c) => (
                            <CoordinatorCard key={c.name} {...c} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentCoordinators;
