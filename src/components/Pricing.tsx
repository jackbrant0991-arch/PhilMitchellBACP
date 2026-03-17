import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';

interface PricingTier {
  name: string;
  price: string;
  tagline: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Self-Paced',
    price: '£149',
    tagline: 'Begin at your own rhythm',
    description: 'Complete the programme entirely in private, with lifetime access.',
    features: [
      'Lifetime access to all 12 modules',
      'Video lessons and guided somatic practices',
      'Downloadable workbooks and resource library',
      'Private online community access',
      'Email support',
    ],
    cta: 'Apply — Self-Paced',
  },
  {
    name: 'Guided Recovery',
    price: '£499',
    tagline: 'Held support throughout',
    description: 'Personalised guidance and community, at a sustainable pace.',
    features: [
      'Everything in Self-Paced, plus:',
      '6 live group sessions with Phil',
      'Weekly accountability check-ins',
      'Private Telegram support group',
      'Monthly live Q&A calls',
      'Personalised practice recommendations',
    ],
    featured: true,
    cta: 'Apply — Guided',
  },
  {
    name: '1:1 Intensive',
    price: '£1,200',
    tagline: 'Deep, individualised support',
    description: 'The most personalised path — tailored to your exact nervous system.',
    features: [
      'Everything in Guided Recovery, plus:',
      '12 private 1:1 sessions with Phil',
      'Customised somatic protocols',
      'Between-session messaging support',
      'Trauma-informed pace adjustments',
      'Ongoing integration support',
    ],
    cta: 'Apply — Intensive',
  },
];

export function Pricing({ onApply }: { onApply: (programme: string) => void }) {
  return (
    <section
      id="pricing"
      className="bg-white"
      style={{ paddingTop: '96px', paddingBottom: '96px' }}
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-sage mb-3">
            Investment
          </p>
          <h2
            id="pricing-heading"
            className="font-display font-bold text-slate mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1.2' }}
          >
            Choose Your Path
          </h2>
          <p className="text-lg text-slate/60 max-w-2xl mx-auto mb-8" style={{ lineHeight: '1.8' }}>
            Every journey is unique. Select the level of support that feels right for you,
            when you're ready.
          </p>

          {/* Body-Back Guarantee */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold" style={{
            backgroundColor: 'rgba(141,170,145,0.12)',
            border: '1px solid rgba(141,170,145,0.25)',
            color: '#6B8A6F',
          }}>
            <Check className="w-4 h-4" aria-hidden="true" />
            Body-Back Guarantee — Try the first 2 modules risk-free
          </div>
        </motion.div>

        {/* Pricing cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              style={{ willChange: 'transform' }}
              className={`relative flex flex-col rounded-3xl ${tier.featured
                ? 'border-2 border-sage shadow-featured ring-4 ring-sage/10 scale-[1.03] z-10'
                : 'border border-sage/20 shadow-card'
                } bg-white overflow-hidden transition-shadow duration-300 hover:shadow-card-hover`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute top-0 left-0 right-0 flex items-center justify-center py-2.5" style={{ backgroundColor: '#8DAA91' }}>
                  <Star className="w-4 h-4 text-white fill-white mr-1.5" aria-hidden="true" />
                  <span className="text-white text-sm font-semibold">Most Popular</span>
                </div>
              )}

              <div className={`flex flex-col flex-1 p-8 ${tier.featured ? 'pt-16' : ''}`}>
                {/* Plan info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold text-slate mb-1">{tier.name}</h3>
                  <p className="text-sm font-medium text-sage mb-2">{tier.tagline}</p>
                  <p className="text-sm text-slate/55 mb-5" style={{ lineHeight: '1.6' }}>{tier.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-slate" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                      {tier.price}
                    </span>
                    <span className="text-slate/45 text-sm">one-time</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1" role="list">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: '#8DAA91' }}
                        aria-hidden="true"
                      />
                      <span className="text-slate/75 text-sm" style={{ lineHeight: '1.6' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={() => onApply(tier.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 ${tier.featured
                    ? 'text-white'
                    : 'border border-sage/40 text-sage hover:bg-sage hover:text-white hover:border-sage'
                    }`}
                  style={tier.featured ? {
                    backgroundColor: '#8DAA91',
                    boxShadow: '0 4px 16px rgba(141,170,145,0.35)',
                  } : {}}
                  aria-label={`${tier.cta} — apply for the ${tier.name} programme`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-slate/50 max-w-xl mx-auto"
          style={{ lineHeight: '1.7' }}
        >
          Payment plans available. Sliding scale options for those in financial hardship.
          Your healing should never be limited by finances — contact Phil directly to discuss.
        </motion.p>
      </div>
    </section>
  );
}
