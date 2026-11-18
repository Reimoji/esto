import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import VirtualCardPromo from '../components/VirtualCardPromo.jsx';
import { Cursor, IconPlusCircle, IconCheck } from '../components/Icons.jsx';
import { eur } from '../format.js';

const FAQ = [
  {
    q: 'Kuidas taotleda?',
    a: 'Vajuta nupule „Esita taotlus“, vali endale sobiv limiit ja kinnita taotlus. Otsuse saad kohe ning lepingu saad allkirjastada Smart-ID või Mobiil-ID-ga.',
  },
  {
    q: 'Mis juhtub, kui taotlen krediidiliini, kuid see ei leia kasutust?',
    a: 'Midagi ei juhtu. Krediidiliini lepingu allkirjastamine on tasuta ja kuumakseid ei ole enne, kui võtad raha välja. Kasutamata limiit sulle midagi ei maksa.',
  },
  {
    q: 'Kuidas raha välja võtta?',
    a: 'Vali krediidiliini vaates „Võta raha välja“, sisesta soovitud summa ja kinnita. Raha jõuab sinu pangakontole üldjuhul mõne minutiga.',
  },
  {
    q: 'Kuidas toimib tagasimakse?',
    a: 'Iga kuu koostame sulle arve kasutatud summa põhjal. Tasutud põhiosa täiendab automaatselt sinu vaba krediidilimiiti, nii et saad seda uuesti kasutada.',
  },
  {
    q: 'Kui pikk on makseperiood?',
    a: 'Tagasimakse jaotub kuni 36 kuule. Võid igal ajal tasuda ka suurema summa või kogu jäägi korraga ilma lisatasuta.',
  },
];

function BalanceCard({ state, onApply, onWithdraw }) {
  const { signed, used, limit } = state;
  const pct = limit ? Math.min(100, (used / limit) * 100) : 0;
  return (
    <section className="card balance-card">
      <div className="balance-top">
        <div className="balance-head">
          <span className="label">Jääk</span>
          <span className="tag">Krediidiliin</span>
        </div>
        <div className="balance-amount">{eur(used)}</div>
        <div className="progress" aria-hidden>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="balance-limits">
          <div>
            <span className="label">Kasutatud limiit</span>
            <strong>{eur(used)}</strong>
          </div>
          <div className="right">
            <span className="label">Kogulimiit</span>
            <strong>{eur(limit)}</strong>
          </div>
        </div>
      </div>
      <div className="balance-promo">
        {signed ? (
          <>
            <h3 className="promo-title">Vaba limiit {eur(limit - used)}</h3>
            <p>Krediidiliini leping on allkirjastatud. Võta raha välja, kui vajad.</p>
            <button className="btn btn-green" onClick={onWithdraw} disabled={used >= limit}>
              Võta raha välja
            </button>
          </>
        ) : (
          <>
            <h3 className="promo-title">0% intress esimesed 30 päeva</h3>
            <p>Võta raha välja ükskõik millal, ükskõik kus</p>
            <button className="btn btn-green" onClick={onApply}>
              Esita taotlus
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function HowItWorks() {
  const bars = [56, 52, 48, 44, 40, 36, 32];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  return (
    <section>
      <h2 className="section-title">Kuidas see toimib</h2>
      <div className="how-grid">
        <article className="card how-card">
          <div className="illu illu-pill">
            <div className="pill-btn">
              0 €
              <Cursor className="pill-cursor" />
            </div>
          </div>
          <h3>Taotle ja allkirjasta tasuta</h3>
          <p>Krediidiliini kasutamiseks pead allkirjastama lepingu. Kuumaksed algavad alles raha väljavõtmisel.</p>
        </article>

        <article className="card how-card">
          <div className="illu illu-slider">
            <div className="slider-track">
              <div className="slider-fill" />
              <div className="slider-knob" />
            </div>
            <div className="slider-dots">
              {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
            </div>
          </div>
          <h3>Maksa ainult kasutatud summa eest</h3>
          <p>Krediidiliiniga on vajalik raha alati käepärast, ilma ühekordse laenu kuumakseta.</p>
        </article>

        <article className="card how-card">
          <div className="illu illu-bars">
            {bars.map((h, i) => (
              <div className="bar-col" key={i}>
                <div className="bar-wrap"><span className="bar" style={{ height: h }} /></div>
                <span className="bar-label">{months[i]}</span>
              </div>
            ))}
          </div>
          <h3>Kuumaksed vähenevad</h3>
          <p>Sinu kuumakse väheneb iga kuu</p>
        </article>

        <article className="card how-card">
          <div className="illu illu-limit">
            <div className="limit-amount">
              1,465 € <span>+35 €</span>
            </div>
            <div className="limit-bar">
              <span className="limit-a" />
              <span className="limit-b" />
            </div>
          </div>
          <h3>Maksed täiendavad limiiti</h3>
          <p>Kuumaksed täiendavad sinu vaba krediidi summat</p>
        </article>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(null);
  return (
    <section>
      <h2 className="section-title">Korduma kippuvad küsimused</h2>
      <div className="faq">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`card faq-item ${isOpen ? 'open' : ''}`} key={item.q}>
              <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                <span>{item.q}</span>
                <IconPlusCircle className="faq-icon" />
              </button>
              <div className="faq-a" hidden={!isOpen}>
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
        <div className="card faq-item faq-contact">
          <span>Kas sul on veel küsimusi?</span>
          <Link to="/klienditugi" className="btn btn-black btn-sm">Klienditugi</Link>
        </div>
      </div>
    </section>
  );
}

function ApplyModal({ limit, onClose, onSign }) {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(limit);
  return (
    <Modal title={step === 2 ? 'Leping allkirjastatud' : 'Krediidiliini taotlus'} onClose={onClose}>
      {step === 0 && (
        <div className="modal-body">
          <label className="field-label" htmlFor="limit">Soovitud limiit</label>
          <div className="big-number">{eur(amount)}</div>
          <input
            id="limit" type="range" min="300" max="2000" step="100"
            value={amount} onChange={(e) => setAmount(+e.target.value)}
            className="range"
            style={{ '--p': `${((amount - 300) / 1700) * 100}%` }}
          />
          <div className="range-scale"><span>300 €</span><span>2 000 €</span></div>
          <ul className="facts">
            <li><span>Intress esimesed 30 päeva</span><strong>0%</strong></li>
            <li><span>Lepingu tasu</span><strong>0 €</strong></li>
            <li><span>Kuumakse enne kasutamist</span><strong>0 €</strong></li>
          </ul>
          <button className="btn btn-green btn-block" onClick={() => setStep(1)}>Jätka</button>
        </div>
      )}
      {step === 1 && (
        <div className="modal-body">
          <p className="muted">Sinu taotlus on heaks kiidetud. Allkirjasta leping, et krediidiliin aktiveerida.</p>
          <ul className="facts">
            <li><span>Krediidilimiit</span><strong>{eur(amount)}</strong></li>
            <li><span>Allkirjastamine</span><strong>Smart-ID</strong></li>
          </ul>
          <button className="btn btn-green btn-block" onClick={() => { onSign(amount); setStep(2); }}>
            Allkirjasta leping
          </button>
          <button className="btn btn-ghost btn-block" onClick={() => setStep(0)}>Tagasi</button>
        </div>
      )}
      {step === 2 && (
        <div className="modal-body center">
          <div className="success-icon"><IconCheck /></div>
          <p>Sinu krediidiliin limiidiga <strong>{eur(amount)}</strong> on aktiivne.</p>
          <button className="btn btn-black btn-block" onClick={onClose}>Valmis</button>
        </div>
      )}
    </Modal>
  );
}

function WithdrawModal({ available, onClose, onConfirm }) {
  const [value, setValue] = useState(Math.min(200, available));
  const valid = value > 0 && value <= available;
  return (
    <Modal title="Võta raha välja" onClose={onClose}>
      <div className="modal-body">
        <label className="field-label" htmlFor="amt">Summa</label>
        <div className="input-wrap">
          <input id="amt" type="number" inputMode="decimal" min="1" max={available}
            value={value} onChange={(e) => setValue(+e.target.value)} />
          <span>€</span>
        </div>
        <p className="muted small">Vaba limiit {eur(available)}</p>
        <div className="chips">
          {[50, 100, 250, 500].filter((v) => v <= available).map((v) => (
            <button key={v} className="chip" onClick={() => setValue(v)}>{v} €</button>
          ))}
        </div>
        <button className="btn btn-green btn-block" disabled={!valid} onClick={() => onConfirm(value)}>
          Kinnita väljamakse
        </button>
      </div>
    </Modal>
  );
}

export default function CreditLine({ state, setState, toast }) {
  const [modal, setModal] = useState(null);
  return (
    <div className="page">
      <BalanceCard
        state={state}
        onApply={() => setModal('apply')}
        onWithdraw={() => setModal('withdraw')}
      />
      <VirtualCardPromo
        state={state}
        onApply={() => setModal('apply')}
        onOpenCard={(design) => setState((s) => ({ ...s, card: design }))}
      />
      <HowItWorks />
      <Faq />
      {modal === 'apply' && (
        <ApplyModal
          limit={state.limit}
          onClose={() => setModal(null)}
          onSign={(limit) => setState((s) => ({ ...s, signed: true, limit }))}
        />
      )}
      {modal === 'withdraw' && (
        <WithdrawModal
          available={state.limit - state.used}
          onClose={() => setModal(null)}
          onConfirm={(v) => {
            setState((s) => ({ ...s, used: s.used + v }));
            setModal(null);
            toast(`${eur(v)} on teel sinu pangakontole`);
          }}
        />
      )}
    </div>
  );
}
