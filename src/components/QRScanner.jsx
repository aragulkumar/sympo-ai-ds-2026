import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { QrCode, CheckCircle, XCircle, Camera } from 'lucide-react';

const QRScanner = () => {
    const scannerRef = useRef(null);
    const html5QrRef = useRef(null);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [loading, setLoading] = useState(false);

    const startScanner = async () => {
        setScanResult(null);
        setScanError('');
        setIsScanning(true);

        const { Html5Qrcode } = await import('html5-qrcode');
        const scanner = new Html5Qrcode('qr-reader');
        html5QrRef.current = scanner;

        try {
            await scanner.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                onScanSuccess,
                () => { } // ignore scan errors
            );
        } catch (err) {
            setScanError('Camera access denied or unavailable.');
            setIsScanning(false);
        }
    };

    const stopScanner = async () => {
        if (html5QrRef.current) {
            try {
                await html5QrRef.current.stop();
                html5QrRef.current.clear();
            } catch (_) { }
        }
        setIsScanning(false);
    };

    const onScanSuccess = async (text) => {
        await stopScanner();
        setLoading(true);

        try {
            const data = JSON.parse(text);
            const regId = data.regId;

            if (!regId) throw new Error('Invalid QR code');

            const regRef = doc(db, 'registrations', regId);
            const regSnap = await getDoc(regRef);

            if (!regSnap.exists()) {
                setScanResult({ status: 'error', message: 'Registration not found in database.' });
                return;
            }

            const regData = regSnap.data();

            if (regData.checkedIn) {
                setScanResult({
                    status: 'already',
                    message: 'Already checked in!',
                    name: regData.leaderName,
                    event: regData.eventName,
                    college: regData.college,
                });
                return;
            }

            await updateDoc(regRef, { checkedIn: true, checkInTime: new Date().toISOString() });

            setScanResult({
                status: 'success',
                message: 'CHECK-IN SUCCESSFUL!',
                name: regData.leaderName,
                event: regData.eventName,
                college: regData.college,
                members: regData.members || [],
            });
        } catch (err) {
            setScanResult({ status: 'error', message: 'Invalid QR code or database error.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => { stopScanner(); };
    }, []);

    return (
        <section className="management-section">
            <div className="section-header">
                <h2>QR CHECK-IN SCANNER</h2>
                <span style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '1px' }}>
                    Scan participant&apos;s QR code to check them in
                </span>
            </div>

            <div className="qr-scanner-wrapper">
                {/* Scanner viewport */}
                <div className="scanner-viewport">
                    <div id="qr-reader" style={{ width: '100%' }}></div>

                    {!isScanning && !scanResult && (
                        <div className="scanner-placeholder">
                            <QrCode size={64} color="#39ff14" />
                            <p>Camera preview will appear here</p>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="scanner-controls">
                    {!isScanning ? (
                        <button className="scan-start-btn" onClick={startScanner}>
                            <Camera size={18} />
                            <span>START SCANNER</span>
                        </button>
                    ) : (
                        <button className="scan-stop-btn" onClick={stopScanner}>
                            STOP SCANNER
                        </button>
                    )}
                </div>

                {/* Loading */}
                {loading && (
                    <div className="scan-loading">
                        <div className="spinner-bb"></div>
                        <span>VERIFYING...</span>
                    </div>
                )}

                {/* Result */}
                {scanResult && (
                    <div className={`scan-result-card ${scanResult.status}`}>
                        {scanResult.status === 'success' && <CheckCircle size={48} color="#39ff14" />}
                        {scanResult.status === 'already' && <CheckCircle size={48} color="#ffa500" />}
                        {scanResult.status === 'error' && <XCircle size={48} color="#ff4444" />}

                        <h3 className="scan-status-text">{scanResult.message}</h3>

                        {(scanResult.status === 'success' || scanResult.status === 'already') && (
                            <div className="scan-details">
                                <div className="scan-detail-row">
                                    <span className="sd-label">NAME</span>
                                    <span className="sd-value">{scanResult.name}</span>
                                </div>
                                <div className="scan-detail-row">
                                    <span className="sd-label">EVENT</span>
                                    <span className="sd-value">{scanResult.event}</span>
                                </div>
                                <div className="scan-detail-row">
                                    <span className="sd-label">COLLEGE</span>
                                    <span className="sd-value">{scanResult.college}</span>
                                </div>
                                {scanResult.members?.filter(m => m.name).length > 0 && (
                                    <div className="scan-detail-row">
                                        <span className="sd-label">TEAM</span>
                                        <span className="sd-value">
                                            {scanResult.members.filter(m => m.name).map(m => m.name).join(', ')}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <button className="scan-again-btn" onClick={() => { setScanResult(null); setScanError(''); }}>
                            SCAN NEXT
                        </button>
                    </div>
                )}

                {scanError && (
                    <div className="scan-error-msg">⚠️ {scanError}</div>
                )}
            </div>
        </section>
    );
};

export default QRScanner;
