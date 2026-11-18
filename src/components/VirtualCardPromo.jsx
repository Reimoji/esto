import { useState } from 'react';
import Modal from './Modal.jsx';

/* Card designs (A · Midnight front, B · Emerald, C · Stone). Wordmark and Visa
   mark are placeholders for the official assets. */
const Contactless = () => (
  <svg className="vcard-nfc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M8.5 7.5a6 6 0 0 1 0 9" /><path d="M12 5a10 10 0 0 1 0 14" /><path d="M15.5 2.5a14 14 0 0 1 0 19" />
  </svg>
);

export function VirtualCard({ variant = 'midnight', className = '' }) {
  return (
    <div className={`vcard vcard--${variant} ${className}`} aria-hidden>
      <div className="vcard-body">
      <div className="vcard-top">
        <span className="vcard-logo">esto</span>
        {variant !== 'stone' && <Contactless />}
      </div>
      <div className="vcard-bottom">
        <div className="vcard-meta">
          <span className="vcard-kind">Virtuaalkaart · Krediidiliin</span>
          <span className="vcard-num">•••• 4821</span>
        </div>
        <span className="vcard-visa">VISA</span>
      </div>
      </div>
      {variant === 'midnight' && <span className="vcard-line" />}
      {variant === 'stone' && <span className="vcard-dot" />}
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
          <VirtualCard variant="stone" className="vcard-back vcard-back-2" />
          <VirtualCard variant="emerald" className="vcard-back vcard-back-1" />
          <VirtualCard variant="midnight" className="vcard-front" />
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
            <p className="muted small">Ava kaart pärast krediidiliini lepingu allkirjastamist.</p>
            <button className="btn btn-green btn-block" onClick={() => { setDetails(false); onApply(); }}>
              Esita taotlus
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}
