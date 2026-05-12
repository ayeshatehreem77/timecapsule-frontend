import "../styles/landing.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function SecurityVisual() {
    return (
        <section className="security-section container-fluid py-5">
            <div className="row align-items-center">

                {/* LEFT SIDE (LOCK VISUAL) */}
                <div className="col-md-6 text-center position-relative">
                    <div className="lock-wrapper">
                        <div className="lock-container">
                            <div style={{ width: '500px', height: '500px', position: 'relative' }}>

                                <DotLottieReact
                                    src="/cyber-security.lottie"
                                    loop
                                    autoplay
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE (CONTENT) */}
                <div className="col-md-6">
                    <h1 className="security-title mb-4">Security</h1>
                    <p className="text-center mt-3">
                        Every capsule is encrypted, isolated, and only revealed at the perfect moment.
                    </p>

                    <div className="security-card active">
                        <h5>End-to-End Encryption</h5>
                        <p>Your memories are encrypted before they even reach our database.</p>
                    </div>

                    <div className="security-card active2">
                        <h5>Immutable Storage</h5>
                        <p>Once sealed, unlock dates can never be altered.</p>
                    </div>

                    <div className="security-card active3">
                        <h5>Secure Onboarding</h5>
                        <p>Authentication via JWT ensures only you have access to your vault.</p>
                    </div>

                </div>

            </div>
        </section>
    );
}