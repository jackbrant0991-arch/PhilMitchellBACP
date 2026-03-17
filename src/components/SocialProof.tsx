import { motion, Variants } from 'framer-motion';
import { AlertCircle, Shield, Heart, Leaf, Waves, Sun } from 'lucide-react';

const easeOut = [0.25, 0, 0, 1] as const;

const revealUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const stagger = (delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: delay } },
});

const cardReveal: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

const cardRevealRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
};

const testimonials = [
  {
    name: 'Sarah',
    quote: "For the first time in years, I can feel my feet on the ground. The programme taught me that healing is not about forgetting — it's about returning home to my body.",
    weeks: '12 weeks',
  },
  {
    name: 'J.',
    quote: "I spent years in talk therapy circling the same stories. Ondine's existential approach helped me release what words never could. I finally feel safe in my own skin.",
    weeks: '8 weeks',
  },
  {
    name: 'Anonymous',
    quote: 'The privacy and pace gave me control when I needed it most. No pressure. No judgment. Just gentle, powerful transformation at exactly my pace.',
    weeks: '12 weeks',
  },
];

const survivalItems = [
  { Icon: AlertCircle, label: 'Hypervigilance', desc: 'Always scanning for danger, never at rest' },
  { Icon: AlertCircle, label: 'Numbness', desc: 'Disconnected from your body and feelings' },
  { Icon: AlertCircle, label: 'Chronic Tension', desc: 'Physical holding stored in muscle and tissue' },
  { Icon: AlertCircle, label: 'Shame Spiral', desc: 'Internalised blame and self-doubt' },
];

const embodiedItems = [
  { Icon: Shield, label: 'Safety', desc: 'Grounded presence in the here and now' },
  { Icon: Heart, label: 'Connection', desc: 'Warm, trusting relationship with your body' },
  { Icon: Leaf, label: 'Boundaries', desc: 'Clear, embodied sense of self and space' },
  { Icon: Sun, label: 'Self-Worth', desc: 'Returning to your innate goodness and value' },
];

export function SocialProof() {
  return (
    <section
      id="state-shift"
      className="bg-white"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
      aria-labelledby="state-shift-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <motion.div
          variants={stagger()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.p variants={revealUp} className="text-sm font-semibold tracking-widest uppercase text-sage mb-3">
            The Shift
          </motion.p>
          <motion.h2
            id="state-shift-heading"
            variants={revealUp}
            className="font-display font-bold text-slate mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.2' }}
          >
            From Survival Mode to Embodied Peace
          </motion.h2>
          <motion.p variants={revealUp} className="text-lg text-slate/60 max-w-2xl mx-auto" style={{ lineHeight: '1.8' }}>
            This is not about "getting over it." It's about your nervous system finally learning that it is safe to settle.
          </motion.p>
        </motion.div>

        {/* Bento Grid: 2-column comparison */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">

          {/* Survival Mode */}
          <motion.div
            variants={cardReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="somatic-card border border-red-100/80 group"
            style={{ backgroundColor: 'rgba(254,242,242,0.6)' }}
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: '#b91c1c' }}>
                Where you are
              </span>
              <h3 className="text-2xl font-display font-semibold text-slate">Survival Mode</h3>
            </div>
            <div className="space-y-5">
              {survivalItems.map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(220,38,38,0.1)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#ef4444' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate text-sm">{label}</p>
                    <p className="text-sm text-slate/55 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Embodied Peace */}
          <motion.div
            variants={cardRevealRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="somatic-card border border-sage/25 group"
            style={{ backgroundColor: 'rgba(141,170,145,0.06)' }}
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ backgroundColor: 'rgba(141,170,145,0.15)', color: '#6B8A6F' }}>
                Where you're going
              </span>
              <h3 className="text-2xl font-display font-semibold text-slate">Embodied Peace</h3>
            </div>
            <div className="space-y-5">
              {embodiedItems.map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(141,170,145,0.15)' }}>
                    <Icon className="w-4 h-4 text-sage" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate text-sm">{label}</p>
                    <p className="text-sm text-slate/55 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={revealUp}
              className="somatic-card bg-sand-light/60 border border-sand-dark/30 cursor-default"
            >
              {/* Quote decoration */}
              <div className="mb-4" aria-hidden="true">
                <Waves className="w-6 h-6 text-sage/40" />
              </div>
              <p className="text-slate/75 leading-relaxed italic mb-6 text-sm md:text-base" style={{ lineHeight: '1.8' }}>
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-sage/15">
                <p className="font-semibold text-slate text-sm">{t.name}</p>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(141,170,145,0.12)', color: '#6B8A6F' }}
                >
                  {t.weeks}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
