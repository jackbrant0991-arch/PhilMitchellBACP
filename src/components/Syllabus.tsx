import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, BookOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Module {
  weeks: string;
  title: string;
  focus: string;
  description: string;
  topics: string[];
  preview: string; // Short excerpt shown in pop-over
}

const modules: Module[] = [
  {
    weeks: 'Weeks 1–2',
    title: 'The Safe Anchor',
    focus: 'Safety',
    description: 'Establishing safety in your body and environment.',
    topics: [
      'Understanding trauma responses in the nervous system',
      'Creating your personal safety toolkit',
      'Grounding techniques for daily regulation',
      "Recognising your body's signals without judgment",
    ],
    preview: '"Safety is not a destination — it is a practice of returning, again and again, to the felt sense of the present moment. In this module, we build the foundation: a body that begins to believe it is allowed to rest."',
  },
  {
    weeks: 'Weeks 3–4',
    title: 'The Breath Bridge',
    focus: 'Regulation',
    description: 'Reconnecting with breath as a pathway to presence.',
    topics: [
      'Somatic breathwork for nervous system regulation',
      'Moving through freeze responses gently',
      'Building capacity for sensation at your pace',
      'Creating sustainable breathing rituals',
    ],
    preview: '"Your breath is the only function in your body that is both automatic and under conscious control. We use this bridge — slowly, gently — to begin to restore communication between your thinking mind and your feeling body."',
  },
  {
    weeks: 'Weeks 5–6',
    title: 'The Body Story',
    focus: 'Awareness',
    description: 'Listening to what your body holds.',
    topics: [
      'Body scanning and awareness practices',
      'Understanding where trauma lives in tissue',
      'Gentle movement practices for gradual release',
      "Honouring your body's own timeline",
    ],
    preview: '"Trauma is not what happened to you — it is what happened inside your body in response. This module is an invitation to listen, not to relive. To notice, not to analyse. Your body has been carrying a story — and it is finally safe to hear it."',
  },
  {
    weeks: 'Weeks 7–8',
    title: 'The Boundary Line',
    focus: 'Boundaries',
    description: 'Reclaiming your energetic and physical space.',
    topics: [
      'Identifying boundary violations through body signals',
      'Somatic practices for comfortable saying "no"',
      'Creating safe containers in relationships',
      'Physical practices for embodied, felt boundaries',
    ],
    preview: '"Boundaries are not walls — they are membranes. They allow connection and they allow protection. In this module, we explore what a boundary feels like in the body, before we practise expressing one with words."',
  },
  {
    weeks: 'Weeks 9–10',
    title: 'The Worth Return',
    focus: 'Self-Worth',
    description: 'Rebuilding self-worth from the inside out.',
    topics: [
      'Releasing shame from the body, not just the mind',
      'Self-compassion practices that actually land',
      'Reclaiming pleasure, joy, and rest',
      'Building self-trust through small, consistent wins',
    ],
    preview: '"Shame lives in the body as contraction, collapse, and hiding. You cannot think your way out of it — but you can move through it. This module is designed to help you reclaim the felt sense of your own inherent worth."',
  },
  {
    weeks: 'Weeks 11–12',
    title: 'The Future Self',
    focus: 'Integration',
    description: 'Integrating your learning and stepping into sovereignty.',
    topics: [
      'Creating your sustainable somatic practice',
      'Navigating setbacks with self-compassion',
      'Building your long-term support ecosystem',
      'Celebrating who you are becoming',
    ],
    preview: '"Integration is not a destination — it is a way of travelling. In our final two weeks, we weave together everything your body has learned and build a practice that is truly yours to keep, for life."',
  },
];

export function Syllabus() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  // Close pop-over when clicking outside
  useEffect(() => {
    if (previewIndex === null) return;
    const handler = (e: MouseEvent) => {
      const ref = previewRefs.current[previewIndex];
      if (ref && !ref.contains(e.target as Node)) {
        setPreviewIndex(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [previewIndex]);

  // Escape closes pop-over
  useEffect(() => {
    if (previewIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewIndex(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [previewIndex]);

  const prefersReduced = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="syllabus"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        background: 'linear-gradient(160deg, rgba(141,170,145,0.06) 0%, rgba(253,253,248,1) 60%)',
      }}
      aria-labelledby="syllabus-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-sage mb-3">
            The Programme
          </p>
          <h2
            id="syllabus-heading"
            className="font-display font-bold text-slate mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.2' }}
          >
            Your 12-Week Journey
          </h2>
          <p className="text-lg text-slate/60 max-w-xl mx-auto" style={{ lineHeight: '1.8' }}>
            A carefully designed progression from safety to sovereignty —
            at a pace that respects your nervous system.
          </p>
        </motion.div>

        {/* Accordion stack */}
        <div className="space-y-3">
          {modules.map((module, index) => {
            const isOpen = openIndex === index;
            const isPreviewOpen = previewIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.07 }}
                className="relative bg-white border border-sage/20 rounded-3xl overflow-visible shadow-card"
              >
                {/* Accordion header button */}
                <button
                  id={`module-btn-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 md:py-6 flex justify-between items-center text-left transition-colors duration-200 hover:bg-sage/4 focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-inset rounded-3xl"
                  style={{ minHeight: '64px' }}
                  aria-expanded={isOpen}
                  aria-controls={`module-panel-${index}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      {/* Week badge */}
                      <span
                        className="text-xs font-semibold px-3 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'rgba(141,170,145,0.15)', color: '#6B8A6F' }}
                      >
                        {module.weeks}
                      </span>
                      {/* Focus tag */}
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'rgba(74,78,105,0.08)', color: '#6B6F8A' }}
                      >
                        {module.focus}
                      </span>

                      {/* Preview chip — Feature 6 */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setPreviewIndex(prev => prev === index ? null : index);
                        }}
                        className="text-xs font-medium px-2.5 py-0.5 rounded-lg border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-1"
                        style={{
                          borderColor: 'rgba(141,170,145,0.4)',
                          color: isPreviewOpen ? '#FDFDF8' : '#6B8A6F',
                          backgroundColor: isPreviewOpen ? '#8DAA91' : 'transparent',
                        }}
                        aria-expanded={isPreviewOpen}
                        aria-controls={`preview-${index}`}
                        title="Preview this module"
                      >
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" aria-hidden="true" />
                          Preview
                        </span>
                      </button>
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-semibold text-slate leading-snug">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate/55 mt-0.5">{module.description}</p>
                  </div>

                  {/* Chevron — rotates 180° on open */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="ml-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5 text-sage" />
                  </motion.div>
                </button>

                {/* ── Module Preview Pop-over (Feature 6) ── */}
                <AnimatePresence>
                  {isPreviewOpen && (
                    <motion.div
                      id={`preview-${index}`}
                      ref={el => { previewRefs.current[index] = el; }}
                      role="region"
                      aria-label={`Preview of ${module.title}`}
                      initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute left-0 right-0 md:left-auto md:right-auto md:w-[400px] z-20"
                      style={{
                        top: 'calc(100% + 8px)',
                        right: 0,
                        backgroundColor: 'rgba(253,253,248,0.96)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(141,170,145,0.3)',
                        borderRadius: '20px',
                        boxShadow: '0 20px 60px rgba(74,78,105,0.18)',
                        padding: '24px',
                      }}
                    >
                      {/* Pop-over close */}
                      <button
                        onClick={() => setPreviewIndex(null)}
                        aria-label="Close module preview"
                        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sage"
                        style={{ backgroundColor: 'rgba(74,78,105,0.08)', color: '#4A4E69' }}
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      {/* Pop-over header */}
                      <div className="flex items-center gap-2 mb-4 pr-8">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(141,170,145,0.15)', color: '#6B8A6F' }}>
                          {module.weeks}
                        </span>
                        <span className="font-display font-semibold text-slate text-sm">{module.title}</span>
                      </div>

                      {/* Excerpt */}
                      <p
                        className="font-display italic text-slate/70"
                        style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
                      >
                        {module.preview}
                      </p>

                      <p className="mt-4 text-xs text-slate/40 italic">
                        This gives you a sense of the tone — the full module goes much deeper.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Accordion panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`module-panel-${index}`}
                      role="region"
                      aria-labelledby={`module-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-sage/10">
                        <ul className="space-y-3 mt-4" role="list">
                          {module.topics.map((topic, ti) => (
                            <li
                              key={ti}
                              className="flex items-start gap-3 text-slate/70 text-sm md:text-base"
                              style={{ lineHeight: '1.7' }}
                            >
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ backgroundColor: 'rgba(141,170,145,0.18)' }}
                                aria-hidden="true"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                              </span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
