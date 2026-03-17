import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lock } from 'lucide-react';

interface DiscoveryCallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DiscoveryCallModal({ isOpen, onClose }: DiscoveryCallModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [prompt, setPrompt] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => firstInputRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { e.stopPropagation(); onClose(); }
        };
        document.addEventListener('keydown', handler, true);
        return () => document.removeEventListener('keydown', handler, true);
    }, [isOpen, onClose]);

    const handleTabKey = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !panelRef.current) return;
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
            'button, input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }, []);

    const handleSubmit = async () => {
        try {
            await fetch('https://formspree.io/f/placeholder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, prompt, type: 'discovery-call' }),
            });
        } catch { /* fail silently */ }
        setSubmitted(true);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setName(''); setEmail(''); setPrompt(''); setSubmitted(false);
        }, 400);
    };

    const formValid = name.trim().length > 0 && email.includes('@');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="discovery-modal-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-[100] px-4"
                    style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(54,58,79,0.65)' }}
                    onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
                    onKeyDown={handleTabKey}
                >
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md rounded-3xl overflow-hidden"
                        style={{ backgroundColor: '#FDFDF8', maxHeight: '90vh', overflowY: 'auto' }}
                    >
                        <button
                            onClick={handleClose}
                            aria-label="Close discovery call form"
                            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
                            style={{ backgroundColor: 'rgba(74,78,105,0.08)', color: '#4A4E69' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(74,78,105,0.14)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(74,78,105,0.08)')}
                        >
                            <X className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <div className="px-8 py-8">
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#8DAA91' }}>
                                            Free Discovery Call
                                        </p>
                                        <h2
                                            id="discovery-modal-title"
                                            className="font-display font-bold text-slate mb-2"
                                            style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', lineHeight: '1.2' }}
                                        >
                                            No obligation, no sales pitch — just a conversation
                                        </h2>
                                        <p className="text-sm text-slate/55 mb-8 flex items-center gap-1.5">
                                            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                                            Phil will confirm your time within 24 hours
                                        </p>

                                        <div className="space-y-5 mb-8">
                                            <div>
                                                <label htmlFor="discovery-name" className="block text-sm font-medium text-slate mb-1.5">
                                                    Your name
                                                </label>
                                                <input
                                                    ref={firstInputRef}
                                                    id="discovery-name"
                                                    type="text"
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="First name or pseudonym"
                                                    className="w-full px-4 py-3 rounded-xl border text-slate text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                                                    style={{ borderColor: 'rgba(141,170,145,0.35)', backgroundColor: 'white' }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="discovery-email" className="block text-sm font-medium text-slate mb-1.5">
                                                    Email address
                                                </label>
                                                <input
                                                    id="discovery-email"
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    className="w-full px-4 py-3 rounded-xl border text-slate text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                                                    style={{ borderColor: 'rgba(141,170,145,0.35)', backgroundColor: 'white' }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="discovery-prompt" className="block text-sm font-medium text-slate mb-1.5">
                                                    What prompted you to reach out?{' '}
                                                    <span className="text-slate/40 font-normal">(optional)</span>
                                                </label>
                                                <textarea
                                                    id="discovery-prompt"
                                                    rows={3}
                                                    value={prompt}
                                                    onChange={e => setPrompt(e.target.value)}
                                                    placeholder="Share whatever feels right..."
                                                    className="w-full px-4 py-3 rounded-xl border text-slate text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                                                    style={{ borderColor: 'rgba(141,170,145,0.35)', backgroundColor: 'white' }}
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            onClick={handleSubmit}
                                            disabled={!formValid}
                                            whileHover={formValid ? { scale: 1.02 } : {}}
                                            whileTap={formValid ? { scale: 0.98 } : {}}
                                            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                            style={{
                                                backgroundColor: formValid ? '#8DAA91' : 'rgba(141,170,145,0.4)',
                                                boxShadow: formValid ? '0 4px 20px rgba(141,170,145,0.35)' : 'none',
                                                cursor: formValid ? 'pointer' : 'not-allowed',
                                            }}
                                        >
                                            Request a discovery call
                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-6"
                                    >
                                        <div className="text-4xl mb-5">🌿</div>
                                        <h2 className="font-display font-bold text-slate mb-3" style={{ fontSize: '1.6rem' }}>
                                            You're on Phil's radar
                                        </h2>
                                        <p className="text-slate/60 mb-8" style={{ lineHeight: '1.8' }}>
                                            Phil will confirm your time within 24 hours — privately and with no pressure.
                                        </p>
                                        <button
                                            onClick={handleClose}
                                            className="w-full py-3 rounded-full font-semibold text-white"
                                            style={{ backgroundColor: '#8DAA91' }}
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
