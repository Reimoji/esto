import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx';
import { IconCheck } from './Icons.jsx';
import { eur, formatCardNumber } from '../format.js';

/* Card designs (A · Midnight front, B · Emerald, C · Stone). Wordmark and Visa
   mark are placeholders for the official assets. */
const Contactless = () => (
  <svg className="vcard-nfc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M8.5 7.5a6 6 0 0 1 0 9" /><path d="M12 5a10 10 0 0 1 0 14" /><path d="M15.5 2.5a14 14 0 0 1 0 19" />
  </svg>
);

export function VirtualCard({ variant = 'midnight', className = '', last4 = '4821' }) {
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
          <span className="vcard-num">•••• {last4}</span>
        </div>
        <span className="vcard-visa">VISA</span>
      </div>
      </div>
      {variant === 'midnight' && <span className="vcard-line" />}
      {variant === 'stone' && <span className="vcard-dot" />}
    </div>
  );
}

const DESIGNS = [
  { id: 'midnight', label: 'Tume' },
  { id: 'emerald', label: 'Roheline' },
  { id: 'stone', label: 'Hele' },
];

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

// Demo card details: valid for three years from today.
const expiry = (() => {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${String((d.getFullYear() + 3) % 100).padStart(2, '0')}`;
})();

/* ---------- Ava kaart: pick a design, sign with Smart-ID ---------- */
function OpenCardModal({ onClose, onSign }) {
  const [step, setStep] = useState(0);
  const [design, setDesign] = useState('midnight');
  return (
    <Modal title={step === 1 ? 'Kaart avatud' : 'Ava virtuaalkaart'} onClose={onClose}>
      {step === 0 && (
        <div className="modal-body">
          <VirtualCard variant={design} className="vcard-modal" />
          <span className="field-label">Vali kaardi kujundus</span>
          <div className="design-picker" role="radiogroup" aria-label="Kaardi kujundus">
            {DESIGNS.map((d) => (
              <button
                key={d.id}
                role="radio"
                aria-checked={design === d.id}
                className={`design-opt ${design === d.id ? 'active' : ''}`}
                onClick={() => setDesign(d.id)}
              >
                <VirtualCard variant={d.id} className="vcard-thumb" />
                <span>{d.label}</span>
              </button>
            ))}
          </div>
          <ul className="facts">
            <li><span>Kaart</span><strong>Virtuaalne</strong></li>
            <li><span>Seotud</span><strong>Krediidiliin</strong></li>
            <li><span>Allkirjastamine</span><strong>Smart-ID</strong></li>
          </ul>
          <p className="muted small">
            Kaardi avamisega nõustud kaardi kasutamise tingimustega.{' '}
            <a href="#" className="text-link" onClick={(e) => e.preventDefault()}>Sätted ja tingimused</a>
          </p>
          <button className="btn btn-green btn-block" onClick={() => { onSign(design); setStep(1); }}>
            Allkirjasta leping
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="modal-body center">
          <div className="success-icon"><IconCheck /></div>
          <p>Sinu virtuaalkaart on avatud. Lisa see Apple Pay või Google Pay rakendusse ja maksa kohe.</p>
          <button className="btn btn-black btn-block" onClick={onClose}>Valmis</button>
        </div>
      )}
    </Modal>
  );
}

/* ---------- Wallet buttons (demo look-alikes of the official badges) ---------- */
const GoogleWalletIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
    <rect x="3" y="5" width="26" height="22" rx="5" fill="#1a73e8" />
    <path d="M3 13.5q0-4 5-4h16q5 0 5 4v2H3z" fill="#ea4335" />
    <path d="M3 17q0-4 5-4h16q5 0 5 4v2H3z" fill="#fbbc04" />
    <path d="M3 20.5q0-4 5-4h16q5 0 5 4V22a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" fill="#34a853" />
  </svg>
);
const AppleWalletIcon = () => (
  <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
    <rect x="3" y="4" width="26" height="24" rx="5" fill="#e5e2da" />
    <rect x="5" y="6" width="22" height="5" rx="1.5" fill="#3d8bd9" />
    <rect x="5" y="9.5" width="22" height="5" rx="1.5" fill="#4cb860" />
    <rect x="5" y="13" width="22" height="5" rx="1.5" fill="#f5b63c" />
    <rect x="5" y="16.5" width="22" height="5" rx="1.5" fill="#ef5a3c" />
    <path d="M3 19h8.5c1 0 1.6.6 2 1.4.6 1.2 1.4 1.8 2.5 1.8s1.9-.6 2.5-1.8c.4-.8 1-1.4 2-1.4H29v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" fill="#d9d5cb" />
  </svg>
);

function WalletButtons({ onAdd }) {
  return (
    <div className="vactive-wallets">
      <button className="wallet-btn" onClick={() => onAdd('Apple Wallet')}>
        <AppleWalletIcon />
        <span><small>Add to</small>Apple Wallet</span>
      </button>
      <button className="wallet-btn" onClick={() => onAdd('Google Wallet')}>
        <GoogleWalletIcon />
        <span><small>Add to</small>Google Wallet</span>
      </button>
    </div>
  );
}

/* ---------- Opened card: card left, details right (wallet-style) ---------- */
function ActiveCard({ design, available, number, cvc, toast }) {
  const [details, setDetails] = useState(false);
  const last4 = number.slice(-4);
  return (
    <section className="card vactive">
      <VirtualCard variant={design} last4={last4} className="vactive-card" />
      <div className="vactive-info">
        <div className="vactive-head">
          <h2 className="vpromo-title">Virtuaalkaart</h2>
          <span className="tag">Krediidiliin</span>
        </div>
        <dl className="vactive-rows">
          <dt>Kaardi number</dt><dd>•••• •••• •••• {last4}</dd>
          <dt>Kehtib kuni</dt><dd>{expiry}</dd>
          <dt>Vaba limiit</dt><dd>{eur(available)}</dd>
        </dl>
        <div className="vactive-actions">
          <button className="btn btn-gray btn-sm" onClick={() => setDetails(true)}>Kaardi andmed</button>
          <Link to="/tehingud" className="btn btn-gray btn-sm">Tehingud</Link>
        </div>
      </div>
      <WalletButtons onAdd={(w) => toast(`Kaart lisatud: ${w}`)} />
      {details && (
        <Modal title="Kaardi andmed" onClose={() => setDetails(false)}>
          <div className="modal-body">
            <VirtualCard variant={design} last4={last4} className="vcard-modal" />
            <ul className="facts">
              <li><span>Kaardi number</span><strong className="mono">{formatCardNumber(number)}</strong></li>
              <li><span>Kehtib kuni</span><strong className="mono">{expiry}</strong></li>
              <li><span>CVC</span><strong className="mono">{cvc}</strong></li>
              <li><span>Vaba limiit</span><strong>{eur(available)}</strong></li>
            </ul>
            <p className="muted small">Kaardiga tehtud maksed vähendavad krediidiliini vaba limiiti.</p>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default function VirtualCardPromo({ state, onApply, onOpenCard, toast }) {
  const [modal, setModal] = useState(null);
  const signed = state.signed;
  // Modals live outside the box, so the Ava kaart success step survives the box
  // switching to the opened-card layout.
  return (
    <>
    {state.card ? (
      <ActiveCard design={state.card} number={state.cardNumber} cvc={state.cardCvc} available={state.limit - state.used} toast={toast} />
    ) : (
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
        {signed ? (
          <button className="btn btn-green vpromo-cta" onClick={() => setModal('open')}>Ava kaart</button>
        ) : (
          <button className="vpromo-more" onClick={() => setModal('details')}>Vaata lähemalt <Arrow /></button>
        )}
      </div>
      <div className="vpromo-visual">
        <div className="vcard-stack">
          <VirtualCard variant="stone" className="vcard-back vcard-back-2" />
          <VirtualCard variant="emerald" className="vcard-back vcard-back-1" />
          <VirtualCard variant="midnight" className="vcard-front" />
        </div>
      </div>
    </section>
    )}

      {modal === 'details' && (
        <Modal title="Virtuaalkaart" onClose={() => setModal(null)}>
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
            <button className="btn btn-green btn-block" onClick={() => { setModal(null); onApply(); }}>
              Esita taotlus
            </button>
          </div>
        </Modal>
      )}
      {modal === 'open' && <OpenCardModal onClose={() => setModal(null)} onSign={onOpenCard} />}
    </>
  );
}
