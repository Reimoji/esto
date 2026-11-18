import { useState } from 'react';
import Modal from './Modal.jsx';

/* Card designs: dark (front, matches esto.ee), green (self-service) and light. */
export function VirtualCard({ variant = 'dark', className = '' }) {
  return (
    <div className={`vcard vcard--${variant} ${className}`} aria-hidden>
      <span className="vcard-logo">esto</span>
      <span className="vcard-num">•••• 4821</span>
      <span className="vcard-label">Krediidiliin</span>
      <span className="vcard-visa">VISA</span>
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
          <VirtualCard variant="light" className="vcard-back vcard-back-2" />
          <VirtualCard variant="green" className="vcard-back vcard-back-1" />
          <VirtualCard variant="dark" className="vcard-front" />
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
