import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { allItems } from '../data/events';
import './EventDetails.css';
import { ChevronLeft, Info, ScrollText, Trophy, Users, BadgeIndianRupee, X, Send } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendInvitationEmail } from '../services/emailService';
import { uploadPaymentScreenshot } from '../services/cloudinaryService';

// Helper to parse max members from team string
const getMaxMembers = (teamStr) => {
    if (!teamStr) return 1;
    const s = teamStr.toLowerCase();
    if (s.includes('squad') || s.includes('4 members') || s.includes('upto 4')) return 4;
    if (s.includes('3 members') || s.includes('2-3')) return 3;
    if (s.includes('2 members') || s.includes('team of 2')) return 2;
    if (s.includes('individual') || s.includes('solo')) return 1;
    return 1;
};

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = allItems.find(item => item.id === id);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        leaderName: '',
        leaderEmail: '',
        leaderPhone: '',
        members: [
            { name: '', email: '' },
            { name: '', email: '' },
            { name: '', email: '' }
        ],
        college: '',
        ign: '',
        uid: '',
        transactionId: '',
        paymentScreenshot: null,
        screenshotName: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!event) {
        return (
            <div className="error-page">
                <h2>ELEMENT NOT FOUND</h2>
                <Link to="/" className="back-btn-error">RETURN TO LAB</Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('member')) {
            const [_, index, field] = name.split('-');
            const newMembers = [...formData.members];
            newMembers[parseInt(index)][field] = value;
            setFormData(prev => ({ ...prev, members: newMembers }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                paymentScreenshot: file,
                screenshotName: file.name
            }));
        }
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const maxMembers = getMaxMembers(event.team);
            const activeMembers = formData.members.slice(0, maxMembers - 1);

            // Upload payment screenshot to Cloudinary if provided
            let screenshotUrl = '';
            let screenshotPublicId = '';
            if (formData.paymentScreenshot && event.fee !== 'Free Entry') {
                setUploadStatus('Uploading payment proof...');
                const uploaded = await uploadPaymentScreenshot(formData.paymentScreenshot);
                screenshotUrl = uploaded.url;
                screenshotPublicId = uploaded.publicId;
                setUploadStatus('Saving registration...');
            }

            await addDoc(collection(db, 'registrations'), {
                leaderName: formData.leaderName,
                leaderEmail: formData.leaderEmail,
                leaderPhone: formData.leaderPhone,
                members: activeMembers,
                college: formData.college,
                ign: formData.ign,
                uid: formData.uid,
                transactionId: formData.transactionId,
                screenshotName: formData.screenshotName,
                screenshotUrl,
                screenshotPublicId,
                eventId: event.id,
                eventName: event.title,
                timestamp: serverTimestamp()
            });

            setUploadStatus('');
            // Send invitation to leader
            await sendInvitationEmail(formData.leaderEmail, formData.leaderName, event.title);

            // Send invitations to other members
            for (const member of activeMembers) {
                if (member.email && member.name) {
                    await sendInvitationEmail(member.email, member.name, event.title);
                }
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({
                    leaderName: '', leaderEmail: '', leaderPhone: '',
                    members: [{ name: '', email: '' }, { name: '', email: '' }, { name: '', email: '' }],
                    college: '', ign: '', uid: '', transactionId: '', paymentScreenshot: null, screenshotName: ''
                });
            }, 8000);
        } catch (error) {
            console.error('Error submitting registration:', error);
            setUploadStatus('');
            alert('SYSTEM ERROR: Could not synthesize registration. ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const isGaming = event.id === 'heisenbergs-last-stand';
    const isTeamEvent = event.team && event.team !== 'Individual';

    return (
        <div className="details-container">
            <button className="back-nav" onClick={() => navigate(-1)}>
                <ChevronLeft size={24} />
                <span>BACK</span>
            </button>

            <div className="details-card-main">
                <div className="details-header">
                    <div className="details-title-bb">
                        <div className="periodic-element-large">
                            <span className="atomic-number-lg">{event.id.length}</span>
                            <span className="symbol-lg">{event.title.substring(0, 2)}</span>
                            <span className="element-name-lg">{event.title.split(' ')[0]}</span>
                        </div>
                        <h1 className="title-text-lg">{event.title}</h1>
                    </div>
                    <div className="details-icon-styled">
                        <event.icon size={48} />
                    </div>
                </div>

                <div className="details-content-main">
                    <p className="description-text">{event.description}</p>

                    <div className="details-grid-main">
                        <div className="details-box">
                            <div className="box-label"><Trophy size={16} /> REWARDS</div>
                            <div className="box-value">{event.prize}</div>
                        </div>
                        <div className="details-box">
                            <div className="box-label"><BadgeIndianRupee size={16} /> ENTRY FEE</div>
                            <div className="box-value">{event.fee}</div>
                        </div>
                        <div className="details-box">
                            <div className="box-label"><Users size={16} /> TEAM SIZE</div>
                            <div className="box-value">{event.team}</div>
                        </div>
                    </div>

                    <div className="rules-guidelines">
                        <div className="rules-section">
                            <h3 className="section-label"><ScrollText size={18} /> PROTOCOLS</h3>
                            <ul>
                                {event.rules.map((rule, i) => <li key={i}>{rule}</li>)}
                            </ul>
                        </div>
                        <div className="guidelines-section">
                            <h3 className="section-label"><Info size={18} /> LAB MANUAL</h3>
                            <ul>
                                {event.guidelines.map((guide, i) => <li key={i}>{guide}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="details-footer">
                    <button onClick={scrollToForm} className="register-btn-main">
                        <span>START EXPERIMENT</span>
                        <div className="btn-glow"></div>
                    </button>
                </div>

                {/* Inline Registration Form Section */}
                <div className="registration-section-inline" ref={formRef}>
                    {!success ? (
                        <div className="google-form-wrapper">
                            <div className="google-form-header">
                                <div className="header-color-strip"></div>
                                <div className="periodic-sm">{event.title.substring(0, 1)}</div>
                                <div className="header-text-bb">
                                    <h2>{event.title} REGISTRATION</h2>
                                    <p>Please fill out the form below to secure your spot.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="google-style-form">
                                <div className="form-question-card">
                                    <div className="section-header-pill">TEAM LEADER</div>
                                    <div className="form-field-group">
                                        <label className="question-label">Full Name <span className="required-star">*</span></label>
                                        <input type="text" name="leaderName" value={formData.leaderName} onChange={handleInputChange} placeholder="Your answer" required />
                                    </div>
                                    <div className="form-field-group">
                                        <label className="question-label">Gmail Address <span className="required-star">*</span></label>
                                        <input type="email" name="leaderEmail" value={formData.leaderEmail} onChange={handleInputChange} placeholder="Your answer" required />
                                    </div>
                                    <div className="form-field-group">
                                        <label className="question-label">Phone Number <span className="required-star">*</span></label>
                                        <input type="tel" name="leaderPhone" value={formData.leaderPhone} onChange={handleInputChange} placeholder="Your answer" required />
                                    </div>
                                </div>

                                {getMaxMembers(event.team) > 1 && Array.from({ length: getMaxMembers(event.team) - 1 }).map((_, i) => (
                                    <div key={i} className="form-question-card">
                                        <div className="section-header-pill member">TEAM MEMBER {i + 2}</div>
                                        <div className="form-field-group">
                                            <label className="question-label">Full Name <span className="required-star">*</span></label>
                                            <input
                                                type="text"
                                                name={`member-${i}-name`}
                                                value={formData.members[i].name}
                                                onChange={handleInputChange}
                                                placeholder="Your answer"
                                                required
                                            />
                                        </div>
                                        <div className="form-field-group">
                                            <label className="question-label">Gmail Address <span className="required-star">*</span></label>
                                            <input
                                                type="email"
                                                name={`member-${i}-email`}
                                                value={formData.members[i].email}
                                                onChange={handleInputChange}
                                                placeholder="Your answer"
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}

                                <div className="form-question-card">
                                    <label className="question-label">College / Department <span className="required-star">*</span></label>
                                    <input type="text" name="college" value={formData.college} onChange={handleInputChange} placeholder="Your answer" required />
                                </div>

                                {isGaming && (
                                    <>
                                        <div className="form-question-card">
                                            <label className="question-label">In-Game Name (IGN) <span className="required-star">*</span></label>
                                            <input type="text" name="ign" value={formData.ign} onChange={handleInputChange} placeholder="Your answer" required />
                                        </div>
                                        <div className="form-question-card">
                                            <label className="question-label">UID / Game ID <span className="required-star">*</span></label>
                                            <input type="text" name="uid" value={formData.uid} onChange={handleInputChange} placeholder="Your answer" required />
                                        </div>
                                    </>
                                )}

                                {isTeamEvent && (
                                    <div className="form-question-card hidden">
                                        {/* Removed old teamMembers textarea as we now have dynamic fields */}
                                    </div>
                                )}

                                {event.fee !== 'Free Entry' && (
                                    <>
                                        <div className="form-question-card payment-qr-card">
                                            <label className="question-label">Scan to Pay <span className="required-star">*</span></label>
                                            <p className="question-help">UPI ID: your-id@upi (Placeholder)</p>
                                            <div className="qr-container-bb">
                                                <div className="qr-placeholder">
                                                    {/* We can use a real QR image if provided, for now a styled placeholder */}
                                                    <div className="qr-mock">
                                                        <div className="qr-inner-eye"></div>
                                                        <div className="qr-inner-eye top-right"></div>
                                                        <div className="qr-inner-eye bottom-left"></div>
                                                        <div className="qr-pattern"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="qr-instruction">Scan this QR code using any UPI app (GPay, PhonePe, Paytm) to complete the payment of <strong>{event.fee}</strong>.</p>
                                        </div>

                                        <div className="form-question-card">
                                            <label className="question-label">Upload Payment Screenshot <span className="required-star">*</span></label>
                                            <p className="question-help">Supported formats: JPG, PNG, PDF</p>
                                            <div className="file-upload-wrapper">
                                                <input
                                                    type="file"
                                                    id="payment-upload"
                                                    name="paymentScreenshot"
                                                    className="hidden-file-input"
                                                    onChange={handleFileChange}
                                                    accept="image/*,.pdf"
                                                />
                                                <label htmlFor="payment-upload" className="file-upload-label">
                                                    <Send size={18} />
                                                    <span>{formData.screenshotName || "Add file"}</span>
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="form-question-card">
                                    <label className="question-label">Transaction ID / UPI Reference <span className="required-star">{event.fee !== 'Free Entry' && '*'}</span></label>
                                    <p className="question-help">Entry Fee: {event.fee}</p>
                                    <input type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange} placeholder="Your answer" required={event.fee !== 'Free Entry'} />
                                </div>

                                <div className="form-actions-bb">
                                    <button type="submit" className="google-submit-btn" disabled={submitting}>
                                        {submitting ? (
                                            <div className="btn-loading">
                                                <div className="spinner-bb"></div>
                                                <span>{uploadStatus || 'SUBMITTING...'}</span>
                                            </div>
                                        ) : (
                                            <span>SUBMIT</span>
                                        )}
                                    </button>
                                    <button type="reset" className="google-clear-btn" onClick={() => setFormData({
                                        leaderName: '', leaderEmail: '', leaderPhone: '',
                                        members: [{ name: '', email: '' }, { name: '', email: '' }, { name: '', email: '' }],
                                        college: '', ign: '', uid: '', transactionId: '', paymentScreenshot: null, screenshotName: ''
                                    })}>Clear form</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="success-google-card">
                            <div className="header-color-strip success"></div>
                            <h2 className="success-title-bb">REGISTRATION SUBMITTED</h2>
                            <p className="success-text-bb">Your response for <strong>{event.title}</strong> has been recorded.</p>
                            <p className="success-subtext-bb">A protocol confirmation has been sent to {formData.email}.</p>
                            <button className="submit-another-btn" onClick={() => setSuccess(false)}>Submit another response</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
