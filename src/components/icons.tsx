type P = { size?: number; className?: string };
const base = (size = 20) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });

export const BagIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
export const ArrowIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const PlusIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14" />
  </svg>
);
export const CloseIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const CheckIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const PhoneIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const PinIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const TruckIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);
export const LeafIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Z" />
    <path d="M5 19 13 11" />
  </svg>
);
export const ClockIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const TrashIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" />
  </svg>
);
export const MailIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const FacebookIcon = ({ size = 20, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M13.5 21v-7.5H16l.4-3H13.5V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
  </svg>
);
export const InstagramIcon = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
  </svg>
);

/** A small lit candle: the brand mark used in headings and empty states. */
export function Flame({ size = 28, className, still }: P & { still?: boolean }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" aria-hidden className={className}>
      <ellipse cx="20" cy="24" rx="18" ry="20" className={still ? "" : "breathe"} fill="url(#halo)" />
      <defs>
        <radialGradient id="halo">
          <stop offset="0" stopColor="#f2c27b" stopOpacity=".6" />
          <stop offset="1" stopColor="#f2c27b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={still ? "" : "flicker"}>
        <path d="M20 6c4 7 9 11 9 18a9 9 0 0 1-18 0c0-5 3-7 4.5-11 .8 3 2.2 4.5 3.8 4.5C17.8 13.5 18.5 9.5 20 6Z" fill="#f0ad55" />
        <path d="M20 18c2.3 3 4.4 5.3 4.4 8.2a4.4 4.4 0 0 1-8.8 0c0-2.9 2-4.6 4.4-8.2Z" fill="#fff4dc" />
      </g>
      <rect x="19.2" y="32" width="1.6" height="7" rx=".8" fill="#2b211c" />
    </svg>
  );
}
