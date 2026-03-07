import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { allItems } from '../data/events';
import './EventDetails.css';
import { ChevronLeft, Info, ScrollText, Trophy, Users, BadgeIndianRupee, X, Send } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
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

// Helper to parse minimum required members from team string
const getMinMembers = (teamStr) => {
    if (!teamStr) return 1;
    const s = teamStr.toLowerCase();
    // If 'individual' or 'solo' is mentioned, solo registration is always valid → min = 1
    if (s.includes('individual') || s.includes('solo')) return 1;
    // Exact fixed sizes (all members required)
    if (s.includes('squad (4') || s === '4 members') return 4;
    if (s === '3 members') return 3;
    if (s === '2 members' || s === 'team of 2') return 2;
    // Ranges like "2 to 4", "2-3" → min is 2
    if (s.includes('2 to') || s.includes('2-3')) return 2;
    // Default: solo valid
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
    const [registrationId, setRegistrationId] = useState('');
    const [countdown, setCountdown] = useState(20);
    const [showAltQR, setShowAltQR] = useState(false);
    const [autoLimitClosed, setAutoLimitClosed] = useState(false);
    const countdownRef = useRef(null);

    // Auto-reset after exactly 20 seconds
    // Uses a local `secs` closure variable — NOT React state — to track time
    // This avoids any state batching / StrictMode / async update issues
    useEffect(() => {
        if (!success) return;

        // Clear any previous interval first
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
        }

        let secs = 20;
        setCountdown(20);

        countdownRef.current = setInterval(() => {
            secs -= 1;
            setCountdown(secs);
            if (secs <= 0) {
                clearInterval(countdownRef.current);
                countdownRef.current = null;
                setSuccess(false);
                setRegistrationId('');
            }
        }, 1000);

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
                countdownRef.current = null;
            }
        };
    }, [success]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Check Firestore eventSettings (admin toggle) AND registration count limit
    useEffect(() => {
        if (!event?.id) return;
        const checkStatus = async () => {
            try {
                // 1. Check admin-controlled Firestore override — if set, trust it completely
                const settingsSnap = await getDoc(doc(db, 'eventSettings', event.id));
                if (settingsSnap.exists()) {
                    // Admin has explicitly set this event's status — honour it, skip count check
                    setAutoLimitClosed(settingsSnap.data().registrationClosed === true);
                    return;
                }

                // 2. No admin override — fall back to registration count check
                if (event?.maxTeams) {
                    const q = query(
                        collection(db, 'registrations'),
                        where('eventId', '==', event.id),
                        limit(event.maxTeams)
                    );
                    const snap = await getDocs(q);
                    if (snap.size >= event.maxTeams) {
                        setAutoLimitClosed(true);
                    }
                }
            } catch (err) {
                console.warn('Could not check event status:', err.message);
            }
        };
        checkStatus();
    }, [event?.id, event?.maxTeams]);

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

            // Upload payment screenshot to Cloudinary if provided (non-blocking)
            let screenshotUrl = '';
            let screenshotPublicId = '';
            if (formData.paymentScreenshot && event.fee !== 'Free Entry') {
                setUploadStatus('Uploading payment proof...');
                try {
                    const uploaded = await uploadPaymentScreenshot(formData.paymentScreenshot);
                    screenshotUrl = uploaded.url;
                    screenshotPublicId = uploaded.publicId;
                } catch (uploadErr) {
                    console.warn('Cloudinary upload failed (registration will still be saved):', uploadErr.message);
                    // Continue without screenshot — registration still saves
                }
                setUploadStatus('Saving registration...');
            }

            const docRef = await addDoc(collection(db, 'registrations'), {
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
                checkedIn: false,
                timestamp: serverTimestamp()
            });
            setRegistrationId(docRef.id);

            setUploadStatus('');
            // Send confirmation to leader
            if (formData.leaderEmail && formData.leaderName) {
                console.log('[Email] Sending to leader:', formData.leaderEmail);
                await sendInvitationEmail(formData.leaderEmail, formData.leaderName, event.title);
            }

            // Send confirmations to other members
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

                        {event.coordinators && event.coordinators.length > 0 && (
                            <div className="coordinator-section">
                                <h3 className="section-label coordinator-label">📞 Event Co-Coordinator</h3>
                                <div className="coordinator-list">
                                    {event.coordinators.map((c, i) => (
                                        <div key={i} className="coordinator-card">
                                            <span className="coordinator-name">{c.name}</span>
                                            <span className="coordinator-phone">{c.phone}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="details-footer">
                    <button onClick={scrollToForm} className="register-btn-main">
                        <span>START EXPERIMENT</span>
                        <div className="btn-glow"></div>
                    </button>
                </div>

                {/* Inline Registration Form Section — Symposium concluded, form disabled */}
                <div className="registration-section-inline" ref={formRef}>
                    {(event.registrationClosed || autoLimitClosed) ? (
                        <div className="reg-closed-banner">
                            <div className="reg-closed-icon">🔒</div>
                            <h3 className="reg-closed-title">Registration Closed</h3>
                            <p className="reg-closed-reason">
                                {event.registrationClosed
                                    ? (event.closedReason || "Registration for this event is now closed.")
                                    : `Registration limit of ${event.maxTeams} teams has been reached.`}
                            </p>
                            <p className="reg-closed-sub">Thank you for your interest in HeisenByte 2026.</p>
                        </div>
                    ) : (
                        <div className="reg-closed-banner event-concluded-banner">
                            <div className="reg-closed-icon">🎉</div>
                            <h3 className="reg-closed-title">HeisenByte 2026 — Event Concluded</h3>
                            <p className="reg-closed-reason">
                                This symposium has successfully concluded. This website is now for viewing purposes only.
                            </p>
                            <p className="reg-closed-sub">Thank you to all participants who made HeisenByte 2026 a success! 🧪</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
