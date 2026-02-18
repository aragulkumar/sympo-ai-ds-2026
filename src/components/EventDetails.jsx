import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { allItems } from '../data/events';
import './EventDetails.css';
import { ChevronLeft, Info, ScrollText, Trophy, Users, BadgeIndianRupee, X } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendInvitationEmail } from '../services/emailService';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = allItems.find(item => item.id === id);

    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        college: '',
        phone: '',
        teamMembers: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!event) {
        return (
            <div className="error-page">
                <h2>Element Not Found</h2>
                <Link to="/" className="back-btn-error">Back to Lab</Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            // Save to Firestore
            await addDoc(collection(db, 'registrations'), {
                ...formData,
                eventId: event.id,
                eventName: event.title,
                timestamp: serverTimestamp()
            });

            // Send Email
            await sendInvitationEmail(formData.email, formData.name, event.title);

            setSuccess(true);
            setTimeout(() => {
                setShowRegisterForm(false);
                setSuccess(false);
                setFormData({ name: '', email: '', college: '', phone: '', teamMembers: '' });
            }, 3000);
        } catch (error) {
            console.error('Error submitting registration:', error);
            alert('Submission failed. Check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    const Icon = event.icon;
    // ... (rest of the component structure remains similar until registration footer)
    // ... (Periodic Table Typography logic)

    return (
        <div className="details-container">
            <button className="back-nav" onClick={() => navigate(-1)}>
                <ChevronLeft size={24} />
                <span>Back</span>
            </button>

            <div className="details-card-main">
                {/* ... Header and Body content ... */}

                <div className="details-footer">
                    <button onClick={() => setShowRegisterForm(true)} className="register-btn-main">
                        <span>REGISTER NOW</span>
                        <div className="btn-glow"></div>
                    </button>
                </div>
            </div>

            {/* Registration Modal */}
            {showRegisterForm && (
                <div className="registration-overlay">
                    <div className="registration-modal">
                        <button className="close-btn" onClick={() => setShowRegisterForm(false)}>
                            <X size={24} />
                        </button>

                        {!success ? (
                            <>
                                <h2>{event.title} Registration</h2>
                                <p className="modal-subtitle">Secure your spot in the experiment.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Gmail Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>College Name</label>
                                        <input type="text" name="college" value={formData.college} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Team Members (Optional)</label>
                                        <textarea name="teamMembers" value={formData.teamMembers} onChange={handleInputChange} placeholder="Name 1, Name 2..." />
                                    </div>
                                    <button type="submit" className="submit-reg-btn" disabled={submitting}>
                                        {submitting ? 'PROCESSING...' : 'CONFIRM REGISTRATION'}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="success-message">
                                <div className="success-icon">✓</div>
                                <h2>REGISTRATION SUCCESSFUL</h2>
                                <p>An invitation has been sent to your Gmail.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
