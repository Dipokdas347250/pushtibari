// Line icons (24px grid, stroke-based).
const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  bag: <><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" /><path d="M9 10V7a3 3 0 0 1 6 0v3" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h10" /></>,
  x: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  truck: <><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3.5V16h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M16 12.5h2" /><path d="M3 9.5h18" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19c3-4 6-6 9-7.5" /></>,
  phone: <path d="M5 4h3l1.5 4-2 1.3a11 11 0 0 0 7.2 7.2L16 14.5l4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  arrowRight: <><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>,
  trash: <><path d="M4 7h16" /><path d="M9 7V4.5h6V7" /><path d="M6 7l1 13h10l1-13" /></>,
  filter: <><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></>,
  sparkle: <><path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" /><path d="M19 16c.2 1.4.9 2.1 2 2.3-1.1.2-1.8.9-2 2.3-.2-1.4-.9-2.1-2-2.3 1.1-.2 1.8-.9 2-2.3Z" /></>,
  bowl: <><path d="M3 11h18a9 9 0 0 1-18 0Z" /><path d="M8 7c0-1.5 1-2 1-3.5" /><path d="M12 7c0-1.5 1-2 1-3.5" /><path d="M16 7c0-1.5 1-2 1-3.5" /></>,
  pot: <><path d="M4 9h16v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" /><path d="M2 9h20" /><path d="M10 5h4" /><path d="M12 5v4" /></>,
  cup: <><path d="M6 4h12l-1.5 15.5a1.6 1.6 0 0 1-1.6 1.5H9.1a1.6 1.6 0 0 1-1.6-1.5L6 4Z" /><path d="M6.6 10h10.8" /><path d="M14 4l2-2.5" /></>,
  drop: <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" />,
  cookie: <><circle cx="12" cy="12" r="8.5" /><circle cx="9" cy="9.5" r=".6" fill="currentColor" /><circle cx="14.5" cy="8.5" r=".6" fill="currentColor" /><circle cx="15" cy="14" r=".6" fill="currentColor" /><circle cx="9.5" cy="15" r=".6" fill="currentColor" /></>,
  baby: <><circle cx="12" cy="13" r="7.5" /><path d="M12 5.5c0-2 1.5-2.5 2.5-2" /><circle cx="9.5" cy="12.5" r=".7" fill="currentColor" /><circle cx="14.5" cy="12.5" r=".7" fill="currentColor" /><path d="M10 16c1.2 1 2.8 1 4 0" /></>,
  send: <><path d="M21 3 10 14" /><path d="m21 3-7 18-4-7-7-4 18-7Z" /></>,
  quote: <><path d="M9 7H6a2 2 0 0 0-2 2v3h5V7Z" /><path d="M9 12c0 3-1.5 4.5-4 5" /><path d="M20 7h-3a2 2 0 0 0-2 2v3h5V7Z" /><path d="M20 12c0 3-1.5 4.5-4 5" /></>,
  gift: <><rect x="3.5" y="9" width="17" height="11.5" rx="2" /><path d="M2.5 9h19v-.5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 8.5V9Z" /><path d="M12 7v13.5" /><path d="M12 7C10.5 3.5 7 3.5 7 5.5S12 7 12 7Zm0 0c1.5-3.5 5-3.5 5-1.5S12 7 12 7Z" /></>,
};

export default function Icon({ name, className = "size-5", strokeWidth = 1.8, filled = false, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
