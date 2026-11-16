import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconDashboard, IconCreditLine, IconInvoice, IconTransactions, IconContract,
  IconShield, IconDiamond, IconSupport, IconUser, IconLogout, IconChevronDown,
} from './Icons.jsx';

export const NAV_GROUPS = [
  [
    { to: '/toolaud', label: 'Töölaud', icon: IconDashboard },
    { to: '/krediidiliin', label: 'Krediidiliin', icon: IconCreditLine },
    { to: '/arved', label: 'Arved', icon: IconInvoice },
    { to: '/tehingud', label: 'Tehingud', icon: IconTransactions },
    { to: '/lepingud', label: 'Lepingud', icon: IconContract },
  ],
  [
    { to: '/kindlustus', label: 'Kindlustus', icon: IconShield, badge: 'UUS' },
    { to: '/premium', label: 'Premium', icon: IconDiamond },
  ],
  [
    { to: '/klienditugi', label: 'Klienditugi', icon: IconSupport },
    { to: '/profiil', label: 'Profiil', icon: IconUser },
  ],
];

const LANGS = [
  { code: 'ET', flag: 'ee' },
  { code: 'EN', flag: 'gb' },
  { code: 'RU', flag: 'ru' },
];

function Flag({ code }) {
  if (code === 'ee')
    return (
      <span className="flag">
        <span style={{ background: '#0072ce' }} />
        <span style={{ background: '#000' }} />
        <span style={{ background: '#fff' }} />
      </span>
    );
  if (code === 'ru')
    return (
      <span className="flag">
        <span style={{ background: '#fff' }} />
        <span style={{ background: '#0039a6' }} />
        <span style={{ background: '#d52b1e' }} />
      </span>
    );
  return (
    <span className="flag flag-gb">
      <span />
    </span>
  );
}

export function Logo() {
  return <span className="logo">esto</span>;
}

function LanguagePicker() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(LANGS[0]);
  return (
    <div className="lang">
      <button className="lang-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <Flag code={lang.flag} />
        <span>{lang.code}</span>
        <IconChevronDown style={{ transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <ul className="lang-menu" role="menu">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="menuitem"
                className={l.code === lang.code ? 'active' : ''}
                onClick={() => { setLang(l); setOpen(false); }}
              >
                <Flag code={l.flag} /> {l.code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Desktop: when the sidebar is taller than the window, stick it by its bottom edge
// (negative sticky top) so it scrolls only as far as Logi välja and then stays visible.
function useStickySidebar(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      const top = desktop.matches ? Math.min(0, window.innerHeight - el.offsetHeight) : 0;
      el.style.setProperty('--sb-top', `${top}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    desktop.addEventListener('change', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      desktop.removeEventListener('change', update);
    };
  }, [ref]);
}

export default function Sidebar({ open, onNavigate, onLogout }) {
  const ref = useRef(null);
  useStickySidebar(ref);
  return (
    <aside ref={ref} className={`sidebar ${open ? 'is-open' : ''}`}>
      <div className="sidebar-logo">
        <Logo />
      </div>
      <nav className="sidebar-nav">
        {NAV_GROUPS.map((group, i) => (
          <ul key={i} className="nav-group">
            {group.map(({ to, label, icon: Icon, badge }) => (
              <li key={to}>
                <NavLink to={to} className="nav-item" onClick={onNavigate}>
                  <Icon />
                  <span>{label}</span>
                  {badge && <span className="badge-new">{badge}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
        <LanguagePicker />
      </nav>
      <button className="nav-item logout" onClick={onLogout}>
        <IconLogout />
        <span>Logi välja</span>
      </button>
    </aside>
  );
}
