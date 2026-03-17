import { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

interface SafetyExitButtonProps {
  variant?: 'header' | 'footer';
  videoMode?: boolean;   // true when header is over the video (dark bg)
  className?: string;
}

/**
 * Safety Exit Button
 * ─────────────────
 * • window.location.replace — no back-button return
 * • Global Escape key listener registered once
 * • 56×56px minimum touch target on footer variant
 * • Adapts colour for dark (video) vs light (scrolled) header backgrounds
 */
export function SafetyExitButton({
  variant = 'header',
  videoMode = false,
  className = '',
}: SafetyExitButtonProps) {
  const handleSafetyExit = () => {
    window.location.replace('https://google.com');
  };

  // Global Escape key shortcut — registered once per mount
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSafetyExit();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /* ── Footer variant ── */
  if (variant === 'footer') {
    return (
      <button
        id="safety-exit-footer"
        type="button"
        onClick={handleSafetyExit}
        className={`inline-flex items-center justify-center gap-2.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-dark outline-none ${className}`}
        style={{
          minHeight: '56px',
          backgroundColor: 'rgba(220, 38, 38, 0.15)',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          color: '#fca5a5',
        }}
        aria-label="Safety Exit — quickly leave this page. Keyboard shortcut: Escape"
      >
        <ShieldAlert className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
        <span>Safety Exit</span>
      </button>
    );
  }

  /* ── Header variant — adapts to videoMode ── */
  const bgColor = videoMode
    ? 'rgba(220, 38, 38, 0.18)'
    : 'rgba(220, 38, 38, 0.10)';
  const borderColor = videoMode
    ? 'rgba(220, 38, 38, 0.35)'
    : 'rgba(220, 38, 38, 0.22)';
  const textColor = videoMode ? '#fca5a5' : '#dc2626';

  return (
    <button
      id="safety-exit-header"
      type="button"
      onClick={handleSafetyExit}
      className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 outline-none ${className}`}
      style={{
        minHeight: '44px',
        minWidth: '44px',
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        backdropFilter: 'blur(6px)',
      }}
      aria-label="Safety Exit — quickly leave this page. Keyboard shortcut: Escape"
      title="Press Escape at any time to leave quickly"
    >
      <ShieldAlert className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">Safety Exit</span>
    </button>
  );
}
