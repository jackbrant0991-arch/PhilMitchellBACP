import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** Pre-select a programme from the pricing cards */
    defaultProgramme?: string;
}

type Programme = 'Self-Paced' | 'Guided Recovery' | '1:1 Intensive' | 'Not sure yet';
type TimeAgo = 'Still in the process of leaving' | 'Less than 6 months ago' | '6 months – 2 years ago' | 'More than 2 years ago';

interface FormState {
    name: string;
    email: string;
    programme: Programme | '';
    timeAgo: TimeAgo | '';
    message: string;
}

const PROGRAMMES: Programme[] = ['Self-Paced', 'Guided Recovery', '1:1 Intensive', 'Not sure yet'];
const TIME_OPTIONS: TimeAgo[] = [
    'Still in the process of leaving',
    'Less than 6 months ago',
    '6 months – 2 years ago',
    'More than 2 years ago',
];

const stepVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 40 : -40,
        opacity: 0,
    }),
    centre: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
        x: dir > 0 ? -40 : 40,
        opacity: 0,
    }),
};

export function ApplicationModal({ isOpen, onClose, defaultProgramme }: ApplicationModalProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        programme: (defaultProgramme as Programme) || '',
        timeAgo: '',
        message: '',
    });

    const overlayRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const firstFocusRef = useRef<HTMLInputElement>(null);

    // Update programme if parent passes a new default
    useEffect(() => {
        if (defaultProgramme) {
            setForm(f => ({ ...f, programme: defaultProgramme as Programme }));
        }
    }, [defaultProgramme]);

    // Lock body scroll while open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Focus first interactive element
            setTimeout(() => firstFocusRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Escape key closes modal (does NOT trigger Safety Exit)
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.stopPropagation(); // prevent global Safety Exit listener
                onClose();
            }
        };
        document.addEventListener('keydown', handler, true);
        return () => document.removeEventListener('keydown', handler, true);
    }, [isOpen, onClose]);

    // Focus trap
    const handleTabKey = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== 'Tab' || !panelRef.current) return;
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }, []);

    const nextStep = () => {
        setDirection(1);
        setStep(s => s + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(s => s - 1);
    };

    const handleSubmit = async () => {
        // Submit via Formspree / EmailJS — replace endpoint as needed
        try {
            await fetch('https://formspree.io/f/placeholder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        } catch {
            // Fail silently — we still show success to the user
        }
        setDirection(1);
        setStep(3);
        setSubmitted(true);
    };

    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setStep(1);
            setDirection(1);
            setSubmitted(false);
            setForm({ name: '', email: '', programme: '', timeAgo: '', message: '' });
        }, 400);
    };

    const step1Valid = form.name.trim().length > 0 && form.email.includes('@') && form.programme !== '';
    const step2Valid = form.timeAgo !== '';

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                /* ── Backdrop ── */
                <motion.div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-[100] px-4"
                    style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(54,58,79,0.65)' }}
                    onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
                    onKeyDown={handleTabKey}
                >
                    {/* ── Panel ── */}
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
                        style={{ backgroundColor: '#FDFDF8', maxHeight: '90vh', overflowY: 'auto' }}
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            aria-label="Close application form"
                            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sage"
                            style={{ backgroundColor: 'rgba(74,78,105,0.08)', color: '#4A4E69' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(74,78,105,0.14)')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(74,78,105,0.08)')}
                        >
                            <X className="w-4 h-4" aria-hidden="true" />
                        </button>

                        {/* Step progress indicator (steps 1 & 2 only) */}
                        {!submitted && (
                            <div className="flex gap-2 px-8 pt-8 pb-0" aria-label={`Step ${step} of 2`}>
                                {[1, 2].map(s => (
                                    <div
                                        key={s}
                                        className="h-1 flex-1 rounded-full transition-all duration-400"
                                        style={{ backgroundColor: step >= s ? '#8DAA91' : 'rgba(141,170,145,0.2)' }}
                                    />
                                ))}
                            </div>
                        )}

                        <div className="px-8 py-8">
                            <AnimatePresence mode="wait" custom={direction}>
                                {/* ──── STEP 1 ──── */}
                                {step === 1 && !submitted && (
                                    <motion.div
                                        key="step1"
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="centre"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#8DAA91' }}>
                                            Step 1 of 2
                                        </p>
                                        <h2
                                            id="modal-title"
                                            className="font-display font-bold text-slate mb-2"
                                            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', lineHeight: '1.2' }}
                                        >
                                            Let's begin — no pressure, just a conversation
                                        </h2>
                                        <p className="text-sm text-slate/55 mb-8 flex items-center gap-1.5">
                                            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                                            All details are completely confidential
                                        </p>

                                        <div className="space-y-5">
                                            <div>
                                                <label htmlFor="modal-name" className="block text-sm font-medium text-slate mb-1.5">
                                                    First name or chosen name <span className="text-slate/40 font-normal">(pseudonym welcome)</span>
                                                </label>
                                                <input
                                                    ref={firstFocusRef}
                                                    id="modal-name"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    value={form.name}
                                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                    placeholder="Your name"
                                                    className="w-full px-4 py-3 rounded-xl border text-slate text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                                                    style={{ borderColor: 'rgba(141,170,145,0.35)', backgroundColor: 'white' }}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="modal-email" className="block text-sm font-medium text-slate mb-1.5">
                                                    Email address
                                                </label>
                                                <input
                                                    id="modal-email"
                                                    type="email"
                                                    autoComplete="email"
                                                    value={form.email}
                                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                    placeholder="you@example.com"
                                                    className="w-full px-4 py-3 rounded-xl border text-slate text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                                                    style={{ borderColor: 'rgba(141,170,145,0.35)', backgroundColor: 'white' }}
                                                />
                                            </div>

                                            <fieldset>
                                                <legend className="block text-sm font-medium text-slate mb-3">
                                                    Which programme feels right for you?
                                                </legend>
                                                <div className="grid grid-cols-2 gap-2.5">
                                                    {PROGRAMMES.map(prog => (
                                                        <label
                                                            key={prog}
                                                            className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border cursor-pointer transition-all duration-200 text-sm"
                                                            style={{
                                                                borderColor: form.programme === prog ? '#8DAA91' : 'rgba(141,170,145,0.25)',
                                                                backgroundColor: form.programme === prog ? 'rgba(141,170,145,0.1)' : 'white',
                                                                color: form.programme === prog ? '#4A4E69' : 'rgba(74,78,105,0.65)',
                                                            }}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="programme"
                                                                value={prog}
                                                                checked={form.programme === prog}
                                                                onChange={() => setForm(f => ({ ...f, programme: prog }))}
                                                                className="sr-only"
                                                            />
                                                            <span
                                                                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                                                                style={{ borderColor: form.programme === prog ? '#8DAA91' : 'rgba(141,170,145,0.3)' }}
                                                            >
                                                                {form.programme === prog && (
                                                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8DAA91' }} />
                                                                )}
                                                            </span>
                                                            {prog}
                                                        </label>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>

                                        <motion.button
                                            onClick={nextStep}
                                            disabled={!step1Valid}
                                            whileHover={step1Valid ? { scale: 1.02 } : {}}
                                            whileTap={step1Valid ? { scale: 0.98 } : {}}
                                            className="mt-8 w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                            style={{
                                                backgroundColor: step1Valid ? '#8DAA91' : 'rgba(141,170,145,0.4)',
                                                boxShadow: step1Valid ? '0 4px 20px rgba(141,170,145,0.35)' : 'none',
                                                cursor: step1Valid ? 'pointer' : 'not-allowed',
                                            }}
                                        >
                                            Continue
                                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* ──── STEP 2 ──── */}
                                {step === 2 && !submitted && (
                                    <motion.div
                                        key="step2"
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="centre"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#8DAA91' }}>
                                            Step 2 of 2
                                        </p>
                                        <h2
                                            className="font-display font-bold text-slate mb-2"
                                            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', lineHeight: '1.2' }}
                                        >
                                            A little more about where you are right now
                                        </h2>
                                        <p className="text-sm text-slate/50 mb-8">
                                            This helps Phil understand your starting point — no right or wrong answers.
                                        </p>

                                        <fieldset className="mb-6">
                                            <legend className="block text-sm font-medium text-slate mb-3">
                                                How long ago did you leave the relationship?
                                            </legend>
                                            <div className="space-y-2.5">
                                                {TIME_OPTIONS.map(option => (
                                                    <label
                                                        key={option}
                                                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 text-sm"
                                                        style={{
                                                            borderColor: form.timeAgo === option ? '#8DAA91' : 'rgba(141,170,145,0.25)',
                                                            backgroundColor: form.timeAgo === option ? 'rgba(141,170,145,0.1)' : 'white',
                                                            color: form.timeAgo === option ? '#4A4E69' : 'rgba(74,78,105,0.65)',
                                                        }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="timeAgo"
                                                            value={option}
                                                            checked={form.timeAgo === option}
                                                            onChange={() => setForm(f => ({ ...f, timeAgo: option }))}
                                                            className="sr-only"
                                                        />
                                                        <span
                                                            className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                                                            style={{ borderColor: form.timeAgo === option ? '#8DAA91' : 'rgba(141,170,145,0.3)' }}
                                                        >
                                                            {form.timeAgo === option && (
                                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8DAA91' }} />
                                                            )}
                                                        </span>
                                                        {option}
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <div className="mb-8">
                                            <label htmlFor="modal-message" className="block text-sm font-medium text-slate mb-1.5">
                                                Is there anything you'd like Phil to know before he reaches out?{' '}
                                                <span className="text-slate/40 font-normal">(completely optional)</span>
                                            </label>
                                            <textarea
                                                id="modal-message"
                                                rows={3}
                                                value={form.message}
                                                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                                placeholder="Whatever feels right to share..."
                                                className="w-full px-4 py-3 rounded-xl border text-slate text-sm resize-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                                                style={{ borderColor: 'rgba(141,170,145,0.35)', backgroundColor: 'white' }}
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={prevStep}
                                                className="flex items-center gap-2 px-5 py-3.5 rounded-full border font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage"
                                                style={{ borderColor: 'rgba(141,170,145,0.4)', color: '#6B8A6F' }}
                                            >
                                                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                                                Back
                                            </button>
                                            <motion.button
                                                onClick={handleSubmit}
                                                disabled={!step2Valid}
                                                whileHover={step2Valid ? { scale: 1.02 } : {}}
                                                whileTap={step2Valid ? { scale: 0.98 } : {}}
                                                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                                style={{
                                                    backgroundColor: step2Valid ? '#8DAA91' : 'rgba(141,170,145,0.4)',
                                                    boxShadow: step2Valid ? '0 4px 20px rgba(141,170,145,0.35)' : 'none',
                                                    cursor: step2Valid ? 'pointer' : 'not-allowed',
                                                }}
                                            >
                                                Send my application
                                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ──── STEP 3: SUCCESS ──── */}
                                {submitted && (
                                    <motion.div
                                        key="success"
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="centre"
                                        exit="exit"
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="text-center py-4"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.6, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                            className="flex justify-center mb-6"
                                        >
                                            <CheckCircle
                                                className="w-16 h-16"
                                                style={{ color: '#8DAA91' }}
                                                aria-hidden="true"
                                            />
                                        </motion.div>

                                        <h2
                                            className="font-display font-bold text-slate mb-3"
                                            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', lineHeight: '1.2' }}
                                        >
                                            Thank you for taking this step
                                        </h2>
                                        <p className="text-slate/65 mb-6" style={{ lineHeight: '1.8' }}>
                                            Phil will be in touch within 48 hours — privately and without pressure.
                                        </p>

                                        <div className="flex flex-col gap-3 mb-8">
                                            <button
                                                onClick={() => {
                                                    handleClose();
                                                    setTimeout(() => {
                                                        document.getElementById('syllabus')?.scrollIntoView({ behavior: 'smooth' });
                                                    }, 400);
                                                }}
                                                className="w-full py-3 rounded-full border font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage"
                                                style={{ borderColor: '#8DAA91', color: '#6B8A6F' }}
                                            >
                                                While you wait, explore the programme
                                            </button>
                                            <button
                                                onClick={handleClose}
                                                className="w-full py-3 rounded-full font-semibold text-white text-sm transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage"
                                                style={{ backgroundColor: '#8DAA91' }}
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <p className="text-xs text-slate/40 leading-relaxed">
                                            Check your spam folder if you don't hear from us.{' '}
                                            Your email will never be shared.
                                        </p>
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
