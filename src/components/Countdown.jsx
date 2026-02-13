import { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const targetDate = new Date('2026-03-05T00:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatNumber = (num) => String(num).padStart(2, '0');

    return (
        <div className="countdown-container">
            <p className="countdown-label">EVENT STARTS IN</p>
            <div className="countdown-timer">
                <div className="countdown-item">
                    <div className="countdown-value">{formatNumber(timeLeft.days)}</div>
                    <div className="countdown-unit">DAYS</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                    <div className="countdown-value">{formatNumber(timeLeft.hours)}</div>
                    <div className="countdown-unit">HOURS</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                    <div className="countdown-value">{formatNumber(timeLeft.minutes)}</div>
                    <div className="countdown-unit">MINS</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                    <div className="countdown-value">{formatNumber(timeLeft.seconds)}</div>
                    <div className="countdown-unit">SECS</div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
