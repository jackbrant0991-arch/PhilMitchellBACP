import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyMobileCTAProps {
    onApply: () => void;
}

export function StickyMobileCTA({ onApply }: StickyMobileCTAProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const footer = document.getElementById('footer');
            const footerTop = footer?.getBoundingClientRect().top ?? Infinity;

            const pastHero = window.scrollY > heroHeight;
            const footerVisible = footerTop < window.innerHeight + 80;

            setVisible(pastHero && !footerVisible);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    role="complementary"
                    aria-label="Apply for the programme"
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    exit={{ y: 80 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 md:hidden z-40"
                    style={{
                        height: '72px',
                        backgroundColor: 'rgba(253,253,248,0.95)',
                        backdropFilter: 'blur(16px)',
                        borderTop: '1px solid rgba(141,170,145,0.2)',
                        paddingBottom: 'env(safe-area-inset-bottom)',
                    }}
                >
                    <div className="flex items-center justify-between h-full px-5">
                        <span
                            className="font-display font-semibold text-sm"
                            style={{ color: '#4A4E69' }}
                        >
                            Phil Mitchell
                        </span>
                        <button
                            id="sticky-apply-btn"
                            onClick={onApply}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                            style={{
                                backgroundColor: '#8DAA91',
                                boxShadow: '0 4px 16px rgba(141,170,145,0.4)',
                                minHeight: '48px',
                            }}
                            aria-label="Apply for the programme"
                        >
                            Apply Now
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
