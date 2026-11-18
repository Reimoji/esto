import { useState } from 'react';
import Modal from './Modal.jsx';

/* Card artwork: deep ESTO green, a cream "track" with a green inset and a
   golden slider bar, after the "Rahastus, mis liugleb sinu suunas" campaign. */
export function VirtualCard({ className = '' }) {
  return (
    <div className={`vcard ${className}`} aria-hidden>
      <svg className="vcard-art" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="vc-bg" cx="70%" cy="20%" r="95%">
            <stop offset="0" stopColor="#13886a" />
            <stop offset=".55" stopColor="#0b6450" />
            <stop offset="1" stopColor="#063f33" />
          </radialGradient>
          <linearGradient id="vc-track" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbf8f1" />
            <stop offset="1" stopColor="#e3dccd" />
          </linearGradient>
          <linearGradient id="vc-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6b73c" />
            <stop offset="1" stopColor="#df9418" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#vc-bg)" />
        <g transform="translate(192 98) rotate(-24)">
          <rect x="-82" y="-34" width="300" height="68" rx="34" fill="url(#vc-track)" />
          <rect x="-66" y="-20" width="110" height="40" rx="20" fill="#0f7a5d" />
          <rect x="40" y="-15" width="62" height="13" rx="6.5" fill="url(#vc-gold)" />
          <rect x="52" y="4" width="62" height="13" rx="6.5" fill="url(#vc-gold)" />
        </g>
      </svg>
      <span className="vcard-logo">esto</span>
      <svg className="vcard-nfc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M8.5 8.5a5 5 0 0 1 0 7M12 6a8.5 8.5 0 0 1 0 12M15.5 3.5a12 12 0 0 1 0 17" />
      </svg>
      <span className="vcard-label">Virtuaalkaart</span>
      <span className="vcard-num">•••• 2026</span>
    </div>
  );
}

export default function VirtualCardPromo({ onApply }) {
  const [details, setDetails] = useState(false);
  return (
    <section className="card vpromo">
      <span className="ribbon">Uus</span>
      <div className="vpromo-text">
        <h2 className="vpromo-title">Virtuaalkaart</h2>
        <p className="vpromo-desc">
          Krediidiliin nüüd ka virtuaalkaardiga – maksa e-poes ning Apple Pay ja Google Payga.
        </p>
        <div className="vpromo-pills">
          <span className="pill">Apple Pay</span>
          <span className="pill">Google Pay</span>
          <span className="pill">E-poed</span>
        </div>
        <button className="vpromo-more" onClick={() => setDetails(true)}>
          Vaata lähemalt
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <div className="vpromo-visual">
        <div className="vcard-stack">
          <span className="vcard-back vcard-back-2" />
          <span className="vcard-back vcard-back-1" />
          <VirtualCard />
        </div>
      </div>

      {details && (
        <Modal title="Virtuaalkaart" onClose={() => setDetails(false)}>
          <div className="modal-body">
            <VirtualCard className="vcard-modal" />
            <p className="muted">
              Krediidiliin nüüd ka virtuaalkaardiga – maksa e-poes ning Apple Pay ja Google Payga.
            </p>
            <ul className="facts">
              <li><span>Kus maksta</span><strong>E-poed, Apple Pay, Google Pay</strong></li>
              <li><span>Kaart</span><strong>Virtuaalne</strong></li>
              <li><span>Intress esimesed 30 päeva</span><strong>0%</strong></li>
              <li><span>Maksad</span><strong>Ainult kasutatud summa eest</strong></li>
            </ul>
            <p className="muted small">Virtuaalkaart on saadaval pärast krediidiliini lepingu allkirjastamist.</p>
            <button className="btn btn-green btn-block" onClick={() => { setDetails(false); onApply(); }}>
              Esita taotlus
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
