import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
    value: number;
    suffix: string;
    label: string;
    ariaLabel: string;
}

const stats: Stat[] = [
    { value: 84, suffix: '+', label: 'Women supported through the programme', ariaLabel: '84 plus women supported through the programme' },
    { value: 12, suffix: '', label: 'Weeks to embodied change', ariaLabel: '12 weeks to embodied change' },
    { value: 100, suffix: '%', label: 'Confidential, private practice', ariaLabel: '100 percent confidential, private practice' },
];

function AnimatedCounter({ value, suffix, reducedMotion }: { value: number; suffix: string; reducedMotion: boolean }) {
    const [count, setCount] = useState(reducedMotion ? value : 0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
        if (!inView || reducedMotion) {
            setCount(value);
            return;
        }
        let start: number | null = null;
        const duration = 1500;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
        };
        const frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [inView, value, reducedMotion]);

    return (
        <span ref={ref} aria-hidden="true">
            {count}{suffix}
        </span>
    );
}

export function ProofBar() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            aria-label="Practice statistics"
            style={{
                backgroundColor: 'rgba(141,170,145,0.08)',
                borderTop: '1px solid rgba(141,170,145,0.15)',
                borderBottom: '1px solid rgba(141,170,145,0.15)',
                paddingTop: '40px',
                paddingBottom: '40px',
            }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-3 gap-6 md:gap-10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center text-center">
                            {/* Accessible hidden label with full value */}
                            <span className="sr-only" aria-label={stat.ariaLabel} />
                            <p
                                className="font-display font-bold text-slate"
                                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1 }}
                                aria-hidden="true"
                            >
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} reducedMotion={prefersReduced} />
                            </p>
                            <p className="mt-2 text-xs sm:text-sm text-slate/60 font-medium leading-snug max-w-[120px] sm:max-w-[160px]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
