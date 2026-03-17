import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SafetyExitButton } from './SafetyExitButton';

const NAV_LINKS = [
  { label: 'About', href: '#state-shift' },
  { label: 'Programme', href: '#syllabus' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#footer' },
];

// Section IDs that map to nav items (for active highlighting)
const SECTION_IDS = ['state-shift', 'syllabus', 'pricing', 'faq', 'footer'];

export function Header({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // ── Scroll progress bar ──
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // ── Sticky state + active section tracker ──
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find which section is currently in view
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = `#${id}`;
        }
      }
      setActiveHref(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close mobile menu on outside click ──
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.25, 0, 0, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
    >
      {/* ── Scroll progress line (sage green) ── */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] origin-left"
        style={{
          width: progressWidth,
          backgroundColor: '#8DAA91',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.4s ease',
          zIndex: 10,
        }}
      />

      {/* ── Header background: transparent → frosted glass ── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(253,253,248,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(141,170,145,0.15)' : 'none',
          boxShadow: scrolled ? '0 4px 24px rgba(74,78,105,0.06)' : 'none',
        }}
      />

      {/* ── Main bar ── */}
      <div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500"
        style={{ paddingTop: scrolled ? '14px' : '20px', paddingBottom: scrolled ? '14px' : '20px' }}
      >
        <div className="flex items-center justify-between" ref={menuRef}>

          {/* ── Brand / Logo ── */}
          <a
            href="#"
            className="flex-shrink-0 group focus-visible:ring-2 focus-visible:ring-sage rounded-lg outline-none"
            aria-label="Ondine Smulders Existential Psychotherapy — return to top"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-display font-semibold leading-none transition-colors duration-300"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  color: scrolled ? '#4A4E69' : '#FDFDF8',
                }}
              >
                Ondine Smulders
              </span>
              {/* Separator dot */}
              <span
                className="hidden sm:inline-block w-1 h-1 rounded-full transition-colors duration-300"
                style={{ backgroundColor: scrolled ? '#8DAA91' : 'rgba(197,217,199,0.7)' }}
                aria-hidden="true"
              />
              <span
                className="hidden sm:inline text-xs font-medium tracking-widest uppercase transition-colors duration-300"
                style={{ color: scrolled ? 'rgba(74,78,105,0.5)' : 'rgba(253,253,248,0.55)' }}
              >
                Existential Psychotherapy
              </span>
            </div>
          </a>

          {/* ── Desktop pill nav ── */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center"
          >
            {/* Frosted pill container */}
            <div
              className="flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: scrolled
                  ? 'rgba(141,170,145,0.08)'
                  : 'rgba(141,170,145,0.15)',
                border: scrolled
                  ? '1px solid rgba(141,170,145,0.18)'
                  : '1px solid rgba(141,170,145,0.3)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {NAV_LINKS.map(link => {
                const isActive = activeHref === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-250 focus-visible:ring-2 focus-visible:ring-sage outline-none"
                    style={{
                      color: isActive
                        ? (scrolled ? '#4A4E69' : '#FDFDF8')
                        : (scrolled ? 'rgba(74,78,105,0.65)' : 'rgba(253,253,248,0.65)'),
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: scrolled ? 'rgba(141,170,145,0.18)' : 'rgba(141,170,145,0.28)' }}
                        transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
              <button
                onClick={onApply}
                className="ml-2 px-5 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage outline-none"
                style={{
                  backgroundColor: '#8DAA91',
                  boxShadow: '0 4px 12px rgba(141,170,145,0.3)',
                }}
              >
                Apply
              </button>
            </div>
          </nav>

          {/* ── Right: Safety Exit + Hamburger ── */}
          <div className="flex items-center gap-2 md:gap-3">
            <SafetyExitButton variant="header" videoMode={!scrolled} />

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage outline-none"
              style={{
                backgroundColor: scrolled
                  ? 'rgba(74,78,105,0.08)'
                  : 'rgba(253,253,248,0.12)',
                color: scrolled ? '#4A4E69' : '#FDFDF8',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile menu dropdown ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.25, 0, 0, 1] }}
              className="md:hidden overflow-hidden"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div
                className="mt-3 pb-4 rounded-2xl"
                style={{
                  backgroundColor: scrolled
                    ? 'rgba(253,253,248,0.95)'
                    : 'rgba(54,58,79,0.92)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(141,170,145,0.2)',
                }}
              >
                <ul className="flex flex-col gap-1 p-2">
                  {NAV_LINKS.map(link => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="w-full text-left px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage outline-none"
                        style={{
                          minHeight: '48px',
                          color: scrolled ? 'rgba(74,78,105,0.85)' : 'rgba(253,253,248,0.85)',
                          backgroundColor: activeHref === link.href
                            ? 'rgba(141,170,145,0.15)'
                            : 'transparent',
                        }}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
