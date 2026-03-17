import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react';
import { SafetyExitButton } from './SafetyExitButton';

export function Footer({ onApply, onDiscovery }: { onApply: () => void; onDiscovery: () => void }) {
  return (
    <footer
      id="footer"
      style={{
        background: 'linear-gradient(135deg, #363A4F 0%, #2a2d3e 100%)',
        paddingTop: '96px',
        paddingBottom: '60px',
      }}
      aria-label="Footer — contact, links, and safety resources"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(141,170,145,0.9)' }}>
            Begin When You're Ready
          </p>
          <h2 className="font-display font-bold mb-6 text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.2' }}>
            Apply for the Programme
          </h2>
          <p className="mb-10 max-w-xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8' }}>
            You deserve to feel safe in your body.<br />
            You deserve to reclaim your worth. Let's begin together.
          </p>

          <div className="flex flex-col items-center gap-6">
            <motion.button
              onClick={onApply}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-slate-dark"
              style={{
                backgroundColor: '#8DAA91',
                boxShadow: '0 6px 28px rgba(141,170,145,0.4)',
              }}
              aria-label="Apply for the programme"
            >
              Apply for the Programme
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </motion.button>

            <button
              onClick={onDiscovery}
              className="text-white/40 hover:text-white/80 transition-colors text-sm underline decoration-white/20 underline-offset-4"
            >
              Or book a free 20-min discovery call
            </button>
          </div>
        </motion.div>

        {/* Info grid */}
        <div className="border-t pt-14" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="grid md:grid-cols-3 gap-10 mb-14">

            {/* About */}
            <div>
              <h3 className="font-display text-xl font-semibold text-white mb-4">Phil Mitchell (BACP)</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.8' }}>
                Senior Specialist for Men Affected by Controlling Relationships. Based in Stanningley, Pudsey.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['BACP Registered', 'Confidential Support', 'Gender-Specific'].map(badge => (
                  <span key={badge} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{
                    backgroundColor: 'rgba(141,170,145,0.15)',
                    border: '1px solid rgba(141,170,145,0.25)',
                    color: 'rgba(141,170,145,0.9)',
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base font-semibold text-white mb-5">Get in Touch</h3>
              <div className="space-y-3.5">
                <a
                  href="tel:07780946568"
                  className="flex items-center gap-3 text-sm transition-colors duration-200 group"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  <Phone className="w-4 h-4 group-hover:text-sage transition-colors" aria-hidden="true" />
                  <span className="group-hover:text-white transition-colors">07780 946568</span>
                </a>
                <a
                  href="mailto:phil@counsellingwithphil.co.uk"
                  className="flex items-start gap-3 text-sm transition-colors duration-200 group"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:text-sage transition-colors" aria-hidden="true" />
                  <span className="group-hover:text-white transition-colors break-all">
                    phil@counsellingwithphil.co.uk
                  </span>
                </a>
              </div>

              <p className="mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: '1.7' }}>
                All communications are treated with complete confidentiality.<br />
                Reach out at a time that feels safe for you.
              </p>
            </div>

            {/* Social + Safety */}
            <div>
              <h3 className="text-base font-semibold text-white mb-5">Connect</h3>
              <div className="flex gap-3 mb-8">
                <a
                  href="#"
                  aria-label="Follow Phil on Instagram"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = 'rgba(141,170,145,0.25)';
                    el.style.color = 'rgba(141,170,145,0.9)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="Connect with Phil on LinkedIn"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = 'rgba(141,170,145,0.25)';
                    el.style.color = 'rgba(141,170,145,0.9)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.backgroundColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>

              {/* Safety Exit in footer */}
              <SafetyExitButton variant="footer" />
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="border-t pt-8"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            {/* Emergency text — static, high-contrast */}
            <div className="text-center mb-5">
              <p className="text-sm font-semibold" style={{ color: '#fca5a5' }}>
                If you are in immediate danger, please call{' '}
                <a href="tel:999" className="underline font-bold hover:text-red-300 transition-colors" aria-label="Call emergency services 999">
                  999
                </a>
              </p>
            </div>

            <div
              className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <p>© 2025 Phil Mitchell (BACP). All rights reserved.</p>
              <p className="text-center md:text-right">
                <a
                  href="https://counsellingwithphil.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sage transition-colors underline"
                >
                  counsellingwithphil.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
