import './DeptInfo.css';

const DeptInfo = () => {
    return (
        <section id="dept-info" className="dept-info-section">
            <div className="dept-info-container">

                {/* College Location */}
                <div className="dept-map-wrapper">
                    <h2 className="dept-section-title">College Location</h2>
                    <div className="dept-title-bar"></div>
                    <div className="dept-map-container">
                        <iframe
                            title="Jeppiaar Engineering College"
                            src="https://maps.google.com/maps?q=Jeppiaar+Engineering+College,Rajiv+Gandhi+Salai,Chennai&output=embed&z=17"
                            width="100%"
                            height="380"
                            style={{ border: 0, borderRadius: '16px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>

                {/* About The Department */}
                <div className="dept-about-wrapper">
                    <h2 className="dept-section-title">About The Department</h2>
                    <div className="dept-title-bar"></div>
                    <div className="dept-about-card">
                        <p className="dept-about-text">
                            The <span className="dept-highlight">Artificial Intelligence &amp; Data Science (AI&amp;DS) Department</span> was
                            established in <span className="dept-highlight">2021</span> with an initial intake of 60 students. In 2023, due to
                            growing interest and demand, the intake was increased to <span className="dept-highlight">120 students</span>. Initially,
                            the department functioned alongside the Computer Science and Engineering (CSE) Department, but in
                            <span className="dept-highlight"> 2024</span>, it emerged as a separate, independent department dedicated to the
                            fields of AI and Data Science.
                        </p>
                        <p className="dept-about-text">
                            The department actively encourages students to engage in innovative projects that apply AI and data
                            science concepts to real-world problems. Through its <span className="dept-highlight">Innovation Hub</span>, a
                            student-driven club, it fosters creativity, research, and technological advancements. With a strong
                            emphasis on <span className="dept-highlight">AI, machine learning, data analytics, and automation</span>, the
                            AI&amp;DS department aims to equip students with the skills needed to excel in the industry and
                            contribute to cutting-edge advancements.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default DeptInfo;
