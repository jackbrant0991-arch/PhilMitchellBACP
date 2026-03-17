import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Is my privacy fully protected?',
    answer:
      'Absolutely. Your participation is completely confidential. You can use a pseudonym in group settings, and all materials are accessed through a secure, private login. Nothing is ever shared without your explicit consent. You control what you share, and when. The Safety Exit button allows you to leave this site instantly at any time.',
  },
  {
    question: 'Will this programme make me relive my past?',
    answer:
      'No. This is a somatic programme, not traditional talk therapy. We work with what your body is ready to release, at your pace. You are always in control of how far you go. We focus on building safety and capacity first. There is no pressure to share details of your past. Healing happens in the body — not in re-telling the story.',
  },
  {
    question: 'Why somatic work instead of traditional talk therapy?',
    answer:
      'Trauma lives in the body, not just in the mind. You can understand your experience intellectually and still feel trapped in your nervous system. Somatic (body-based) work helps you release what is held in tissue, breath, and sensation — the tension, hypervigilance, and disconnection. It works beautifully alongside talk therapy, reaching a deeper, more embodied level.',
  },
  {
    question: 'What if I am not ready for group sessions?',
    answer:
      'The Self-Paced option is designed exactly for this. You can work through every module completely privately, at your own rhythm, with no group contact required. If and when you feel ready for more connection, you can always upgrade. There is no pressure and no deadline. Your readiness matters most.',
  },
  {
    question: 'How much time do I need to commit each week?',
    answer:
      'The programme is designed to be gentle and sustainable. Most people spend 20–30 minutes daily on somatic practices, with one longer session (60–90 minutes) per week for deeper work. This is flexible. Some weeks you may do more, some less. Progress is not linear, and rest is part of healing.',
  },
  {
    question: 'What if I am currently in an unsafe situation?',
    answer:
      'Your physical safety comes first — always. This programme is designed for those who are out of immediate danger but still carrying the impacts in their body and nervous system. If you are currently in an unsafe situation, please contact your local domestic violence services or call 999. Phil can provide referrals to crisis support organisations.',
  },
  {
    question: 'Do you offer payment support or sliding scale pricing?',
    answer:
      'Yes. Payment plans are available for all tiers, and a sliding scale is offered for those experiencing financial hardship. Your healing should not be limited by your financial situation. Contact Phil directly and privately to discuss what would work for you — without any pressure.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        background: 'linear-gradient(160deg, rgba(245,245,220,0.4) 0%, rgba(253,253,248,1) 50%)',
      }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-sage mb-3">
            Questions
          </p>
          <h2
            id="faq-heading"
            className="font-display font-bold text-slate mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.2' }}
          >
            Your Questions, Answered
          </h2>
          <p className="text-lg text-slate/60" style={{ lineHeight: '1.8' }}>
            Everything you need to know to feel safe taking this step — at your pace.
          </p>
        </motion.div>

        {/* Accordion stack */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.06 }}
                className="bg-white border border-sage/20 rounded-2xl overflow-hidden shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                {/* Question button */}
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left transition-colors duration-200 hover:bg-sage/4 focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-inset"
                  style={{ minHeight: '64px' }}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <h3 className="text-base md:text-lg font-semibold text-slate pr-4 leading-snug">
                    {faq.question}
                  </h3>

                  {/* Plus → × rotation */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Plus className="w-5 h-5 text-sage" />
                  </motion.div>
                </button>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-sage/10">
                        <p
                          className="text-slate/70 mt-4 text-sm md:text-base"
                          style={{ lineHeight: '1.8' }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate/50" style={{ lineHeight: '1.7' }}>
            Still have a question?{' '}
            <a
              href="mailto:phil@counsellingwithphil.co.uk"
              className="text-sage hover:text-sage-dark underline underline-offset-2 transition-colors duration-200"
            >
              Email Phil directly
            </a>{' '}
            — privately and without pressure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
