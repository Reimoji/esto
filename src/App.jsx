import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar, { Logo } from './components/Sidebar.jsx';
import { IconMenu, IconClose, IconGlasses } from './components/Icons.jsx';
import CreditLine from './pages/CreditLine.jsx';
import { randomCardDetails } from './format.js';
import { Placeholder, Dashboard } from './pages/Placeholder.jsx';

const INITIAL = { signed: false, used: 0, limit: 2000, card: null, cardNumber: null, cardCvc: null };
const KEY = 'esto-demo-state-v2'; // bump to reset everyone's saved demo state

function load() {
  try {
    const s = { ...INITIAL, ...JSON.parse(localStorage.getItem(KEY)) };
    if (s.card && !s.cardNumber) {
      const { number, cvc } = randomCardDetails();
      return { ...s, cardNumber: number, cardCvc: cvc };
    }
    return s;
  } catch {
    return INITIAL;
  }
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Vestlus">
          <div className="chat-head">
            <strong>ESTO klienditugi</strong>
            <button className="icon-btn light" onClick={() => setOpen(false)} aria-label="Sulge"><IconClose /></button>
          </div>
          <div className="chat-body">
            <div className="bubble">Tere! 👋 Kuidas saame sind aidata?</div>
          </div>
          <form className="chat-input" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Kirjuta sõnum…" />
          </form>
        </div>
      )}
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label="Ava vestlus">e</button>
    </>
  );
}

export default function App() {
  const [state, setState] = useState(load);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const location = useLocation();

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false); }, [location.pathname]);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  }, []);

  const navigate = useNavigate();
  const resetFlow = () => {
    setState(INITIAL);
    setMenuOpen(false);
    navigate('/krediidiliin');
    window.scrollTo(0, 0);
    toast('Voog lähtestatud – alusta krediidiliini taotlusest');
  };

  const logout = () => {
    setState(INITIAL);
    setMenuOpen(false);
    toast('Demo andmed lähtestatud');
  };

  return (
    <div className="app">
      <button className="reset-flow" onClick={resetFlow} title="Alusta demo algusest">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
        </svg>
        Reset flow
      </button>
      <header className="topbar">
        <Logo />
        <button className="icon-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menüü">
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </header>
      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} onLogout={logout} />

      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/krediidiliin" replace />} />
          <Route path="/toolaud" element={<Dashboard state={state} />} />
          <Route path="/krediidiliin" element={<CreditLine state={state} setState={setState} toast={toast} />} />
          {['arved', 'tehingud', 'lepingud', 'kindlustus', 'premium', 'klienditugi', 'profiil'].map((p) => (
            <Route key={p} path={`/${p}`} element={<Placeholder page={p} />} />
          ))}
          <Route path="*" element={<Navigate to="/krediidiliin" replace />} />
        </Routes>

        <footer className="footer">
          © ESTO AS, Harju maakond, Tallinn, Laeva tn 2, 10111. Olete finantsteenuseid pakkuva krediidiandja ESTO AS
          veebilehel. Enne lepingu sõlmimist tutvuge hoolikalt soovitava lepingu tingimustega ja vajadusel konsulteerige
          ESTO AS töötajaga või muu asjatundjaga. Veebilehe kasutamisega kinnitate nõustumist{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>veebilehe kasutustingimustega</a>.
        </footer>
      </main>

      <button className="a11y-fab" aria-label="Ligipääsetavus"><IconGlasses /></button>
      <ChatWidget />
      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </div>
  );
}
