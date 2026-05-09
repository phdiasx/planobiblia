const s = (d, extra = "") => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
    className={`icon ${extra}`} aria-hidden="true">
    {d}
  </svg>
);

export const IconBook = ({ className = "" }) => s(<>
  <path d="M2 6c0-1.1.9-2 2-2h7a2 2 0 0 1 2 2v13H4a2 2 0 0 1-2-2V6Z" />
  <path d="M13 6c0-1.1.9-2 2-2h5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7V6Z" />
  <path d="M13 19v-6" />
</>, className);

export const IconCross = ({ className = "" }) => s(<>
  <line x1="12" y1="3" x2="12" y2="21" />
  <line x1="5" y1="9" x2="19" y2="9" />
</>, className);

export const IconScroll = ({ className = "" }) => s(<>
  <path d="M5 3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Z" />
  <path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
  <line x1="8" y1="13" x2="16" y2="13" />
  <line x1="8" y1="17" x2="13" y2="17" />
</>, className);

export const IconNote = ({ className = "" }) => s(<>
  <circle cx="7" cy="17" r="2" />
  <circle cx="17" cy="15" r="2" />
  <polyline points="9,17 9,5 19,3 19,15" />
  <line x1="9" y1="9" x2="19" y2="7" />
</>, className);

export const IconFish = ({ className = "" }) => s(<>
  <path d="M6.5 12c0-3.5 3-7 7.5-7 2.8 0 5.5 1.5 7 4-1.5 2.5-4.2 4-7 4-4.5 0-7.5-3.5-7.5-1Z" />
  <path d="M3 9l2 3-2 3" />
  <circle cx="17" cy="12" r="1" fill="currentColor" stroke="none" />
</>, className);

export const IconCandle = ({ className = "" }) => s(<>
  <line x1="12" y1="2" x2="12" y2="4" />
  <path d="M9 4h6l1 12H8L9 4Z" />
  <line x1="8" y1="20" x2="16" y2="20" />
  <path d="M12 4c0-1.5 1.5-2 1.5-3" strokeWidth="1.2" />
</>, className);

export const IconLibrary = ({ className = "" }) => s(<>
  <rect x="3" y="4" width="4" height="16" rx="1" />
  <rect x="10" y="7" width="4" height="13" rx="1" />
  <rect x="17" y="3" width="4" height="17" rx="1" />
</>, className);

export const IconSliders = ({ className = "" }) => s(<>
  <line x1="4" y1="6" x2="20" y2="6" />
  <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
  <line x1="4" y1="12" x2="20" y2="12" />
  <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
  <line x1="4" y1="18" x2="20" y2="18" />
  <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
</>, className);

export const IconSpeech = ({ className = "" }) => s(<>
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</>, className);

export const IconFilePdf = ({ className = "" }) => s(<>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
  <polyline points="14,2 14,8 20,8" />
  <line x1="9" y1="13" x2="9" y2="17" />
  <path d="M9 13h2a1.5 1.5 0 0 1 0 3H9" />
  <line x1="13" y1="13" x2="13" y2="17" />
  <path d="M13 13h1.5a1.5 1.5 0 0 1 0 3H13" />
  <path d="M17 13v4m0-2h1.5" />
</>, className);
