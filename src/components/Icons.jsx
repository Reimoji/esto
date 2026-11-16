const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const Icon = ({ children, ...props }) => (
  <svg {...base} {...props}>
    {children}
  </svg>
);

export const IconDashboard = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
  </Icon>
);

export const IconCreditLine = (p) => (
  <Icon {...p}>
    <path d="M7 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <path d="M9 3 7 5l2 2" />
    <path d="M15 7l2-2-2-2" />
    <circle cx="12" cy="12.5" r="2.5" />
  </Icon>
);

export const IconInvoice = (p) => (
  <Icon {...p}>
    <rect x="5" y="3" width="14" height="18" rx="1.5" />
    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
  </Icon>
);

export const IconTransactions = (p) => (
  <Icon {...p}>
    <path d="M4 8h15M15 4l4 4-4 4" />
    <path d="M20 16H5M9 12l-4 4 4 4" />
  </Icon>
);

export const IconContract = (p) => (
  <Icon {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="m9.5 14 2 2 3.5-3.5" />
  </Icon>
);

export const IconShield = (p) => (
  <Icon {...p}>
    <path d="M12 3 5 6v5.5c0 4.3 2.9 8.1 7 9.5 4.1-1.4 7-5.2 7-9.5V6z" />
  </Icon>
);

export const IconDiamond = (p) => (
  <Icon {...p}>
    <path d="M6 4h12l3 5-9 11L3 9z" />
    <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
  </Icon>
);

export const IconSupport = (p) => (
  <Icon {...p}>
    <path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.1-4.4A8.5 8.5 0 1 1 20.5 12z" />
    <path d="M10 10a2 2 0 1 1 2.8 1.8c-.5.2-.8.7-.8 1.2v.3" />
    <circle cx="12" cy="16" r=".4" fill="currentColor" />
  </Icon>
);

export const IconUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </Icon>
);

export const IconLogout = (p) => (
  <Icon {...p}>
    <path d="M14 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
    <path d="M10 12h11M17 8l4 4-4 4" />
  </Icon>
);

export const IconChevronDown = (p) => (
  <Icon width={16} height={16} strokeWidth={2} {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const IconPlusCircle = (p) => (
  <Icon width={24} height={24} strokeWidth={1.4} {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 7.5v9M7.5 12h9" />
  </Icon>
);

export const IconMenu = (p) => (
  <Icon width={24} height={24} strokeWidth={1.8} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const IconClose = (p) => (
  <Icon width={24} height={24} strokeWidth={1.8} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const IconGlasses = (p) => (
  <Icon width={24} height={24} strokeWidth={2} {...p}>
    <rect x="2.5" y="8.5" width="8" height="7" rx="3.5" />
    <rect x="13.5" y="8.5" width="8" height="7" rx="3.5" />
    <path d="M10.5 12h3" />
  </Icon>
);

export const IconCheck = (p) => (
  <Icon width={28} height={28} strokeWidth={2.2} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
);

export const Cursor = (p) => (
  <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden {...p}>
    <path
      d="M3 2.5v21.2l5.6-5.2 3.7 8.6 3.9-1.7-3.7-8.4 7.7-.3z"
      fill="#3a3f47"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);
