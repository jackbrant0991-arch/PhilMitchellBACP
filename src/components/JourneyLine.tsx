import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Section {
    id: string;
    label: string;
}

const SECTIONS: Section[] = [
    { id: 'hero', label: 'Welcome' },
    { id: 'proof', label: 'Our Impact' },
    { id: 'syllabus', label: 'Programme' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'Questions' },
];

export function JourneyLine() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tooltip, setTooltip] = useState<number | null>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();
    const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Track active section via IntersectionObserver
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SECTIONS.forEach((section, index) => {
            const el = document.getElementById(section.id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveIndex(index);
                },
                { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        /* Desktop only — hidden below lg */
        <div
            ref={lineRef}
            aria-hidden="true"
            className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-30"
            style={{ height: '280px' }}
        >
            {/* Track line */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 rounded-full"
                style={{ height: '100%', backgroundColor: 'rgba(141,170,145,0.2)' }}
            />

            {/* Animated fill line */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 origin-top rounded-full"
                style={{
                    height: fillHeight,
                    backgroundColor: '#8DAA91',
                    maxHeight: '100%',
                }}
            />

            {/* Nodes */}
            <div className="relative flex flex-col" style={{ height: '100%', justifyContent: 'space-between' }}>
                {SECTIONS.map((section, index) => {
                    const isPast = index < activeIndex;
                    const isActive = index === activeIndex;

                    return (
                        <div key={section.id} className="relative flex items-center">
                            {/* Tooltip */}
                            {tooltip === index && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute left-6 whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-full pointer-events-none"
                                    style={{
                                        backgroundColor: '#8DAA91',
                                        color: 'white',
                                        boxShadow: '0 2px 10px rgba(141,170,145,0.4)',
                                    }}
                                >
                                    {section.label}
                                </motion.div>
                            )}

                            {/* Node dot */}
                            <motion.button
                                onClick={() => scrollToSection(section.id)}
                                onMouseEnter={() => setTooltip(index)}
                                onMouseLeave={() => setTooltip(null)}
                                onFocus={() => setTooltip(index)}
                                onBlur={() => setTooltip(null)}
                                aria-label={`Scroll to ${section.label}`}
                                animate={{
                                    scale: isActive ? 1.5 : 1,
                                    backgroundColor: isActive || isPast ? '#8DAA91' : 'transparent',
                                    borderColor: isActive || isPast ? '#8DAA91' : 'rgba(141,170,145,0.5)',
                                }}
                                transition={{ duration: 0.25 }}
                                className="w-3 h-3 rounded-full border-2 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                style={{
                                    minWidth: '12px',
                                    minHeight: '12px',
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
