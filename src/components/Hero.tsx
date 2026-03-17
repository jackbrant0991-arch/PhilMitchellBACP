import { motion, Variants } from 'framer-motion';
import { ArrowRight, Shield, Heart, Wind } from 'lucide-react';
import heroVideo from '../assests/hero-vid.mp4';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0, 0, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
};

const trustBadges = [
  { Icon: Shield, label: 'Trauma-Informed' },
  { Icon: Heart, label: 'Nervous System Safe' },
  { Icon: Wind, label: 'Body-Based' },
];

export function Hero({ onApply, onDiscovery }: { onApply: () => void; onDiscovery: () => void }) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100dvh',
        minHeight: '100vh',   /* fallback for browsers without dvh support */
        paddingTop: '100px',
        paddingBottom: '60px',
      }}
      aria-labelledby="hero-headline"
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* ── Multi-layer overlay: dark vignette + sage tint + warm bottom fade ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: [
            /* top-to-bottom dark sweep for text readability */
            'linear-gradient(180deg, rgba(54,58,79,0.72) 0%, rgba(54,58,79,0.55) 50%, rgba(54,58,79,0.68) 100%)',
            /* sage green atmospheric tint */
            'radial-gradient(ellipse at 60% 30%, rgba(141,170,145,0.18) 0%, transparent 65%)',
            /* warm bottom glow so content breathes into the page */
            'radial-gradient(ellipse at 30% 90%, rgba(245,245,220,0.12) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      {/* ── Content ── */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 2 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Location badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                backgroundColor: 'rgba(141,170,145,0.2)',
                border: '1px solid rgba(141,170,145,0.45)',
                color: '#c5d9c7',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sage-light animate-pulse" />
              Harley Street London W1G
            </span>
          </motion.div>

          {/* Headline — two staggered lines */}
          <motion.h1
            id="hero-headline"
            className="font-display font-bold text-balance"
            style={{
              fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#FDFDF8',
            }}
          >
            <motion.span variants={fadeUp} className="block">
              Return to your body.
            </motion.span>
            <motion.span
              variants={fadeUp}
              className="block mt-1"
              style={{ color: '#b8d1bb' }}
            >
              Reclaim your worth.
            </motion.span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            style={{ lineHeight: '1.85', color: 'rgba(253,253,248,0.75)' }}
          >
            A 12-week somatic journey moving you from survival mode to embodied sovereignty.
            At your pace. In your body. On your terms.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                onClick={onApply}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-white focus-visible:ring-2 focus-visible:ring-sage-light focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{
                  backgroundColor: '#8DAA91',
                  boxShadow: '0 6px 28px rgba(141,170,145,0.55)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 10px 38px rgba(141,170,145,0.7)' }}
                whileTap={{ scale: 0.97 }}
                aria-label="Apply for Recovery Programme"
              >
                Apply for Recovery Programme
                <ArrowRight
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.button>

              <motion.button
                onClick={onDiscovery}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg text-white border-2 border-white/40 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Free Discovery Call
              </motion.button>
            </div>

            <p
              className="text-sm"
              style={{ color: 'rgba(253,253,248,0.45)' }}
            >
              When you're ready — no pressure, no timeline.
            </p>
          </motion.div>

          {/* Trust badges — appear last, gentle pulse */}
          <motion.div
            variants={fadeUp}
            transition={{ delay: 1.1 }}
            className="mt-14 flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {trustBadges.map(({ Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold pulse-gentle"
                style={{
                  backgroundColor: 'rgba(141,170,145,0.18)',
                  border: '1px solid rgba(141,170,145,0.35)',
                  color: '#c5d9c7',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Subtle bottom gradient fade into next section ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'linear-gradient(to bottom, transparent, rgba(253,253,248,0.95))',
        }}
      />
    </section>
  );
}
