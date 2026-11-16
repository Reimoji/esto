import { Link } from 'react-router-dom';
import { eur } from '../format.js';

const COPY = {
  arved: ['Arved', 'Sul ei ole hetkel ühtegi tasumata arvet.'],
  tehingud: ['Tehingud', 'Siia ilmuvad sinu tehingud.'],
  lepingud: ['Lepingud', 'Sinu allkirjastatud lepingud kuvatakse siin.'],
  kindlustus: ['Kindlustus', 'Kaitse oma oste ja makseid ESTO kindlustusega. Peagi saadaval.'],
  premium: ['Premium', 'ESTO Premium annab ligipääsu soodsamatele tingimustele ja eripakkumistele.'],
  klienditugi: ['Klienditugi', 'Oleme sinu jaoks olemas E–R 9:00–18:00. Kirjuta meile info@esto.ee või helista +372 622 5252.'],
  profiil: ['Profiil', 'Halda oma isikuandmeid, kontaktandmeid ja seadeid.'],
};

export function Placeholder({ page }) {
  const [title, text] = COPY[page];
  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      <div className="card empty">
        <p>{text}</p>
        <Link to="/krediidiliin" className="btn btn-black btn-sm">Ava krediidiliin</Link>
      </div>
    </div>
  );
}

export function Dashboard({ state }) {
  return (
    <div className="page">
      <h1 className="page-title">Tere tulemast!</h1>
      <Link to="/krediidiliin" className="card dash-card">
        <div>
          <span className="label">Krediidiliin</span>
          <div className="dash-amount">{eur(state.limit - state.used)}</div>
          <span className="muted small">Vaba limiit</span>
        </div>
        <span className="btn btn-green btn-sm">{state.signed ? 'Ava' : 'Esita taotlus'}</span>
      </Link>
    </div>
  );
}
