import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';

type Programme = 'Self-Paced' | 'Guided Recovery' | '1:1 Intensive';

interface QuizOption {
    text: string;
    routes: Programme;
}

interface Question {
    text: string;
    options: QuizOption[];
}

const questions: Question[] = [
    {
        text: 'Which of these feels most like your experience right now?',
        options: [
            { text: 'I feel constantly braced for the next thing', routes: 'Self-Paced' },
            { text: 'I feel numb or disconnected from my body', routes: 'Guided Recovery' },
            { text: 'I know I need support but I can\'t face groups yet', routes: 'Self-Paced' },
            { text: 'I\'m ready for deeper, held support', routes: '1:1 Intensive' },
        ],
    },
    {
        text: 'What feels most important to you right now?',
        options: [
            { text: 'Privacy and moving at my own pace', routes: 'Self-Paced' },
            { text: 'Gentle community and accountability', routes: 'Guided Recovery' },
            { text: 'Intensive personalised support', routes: '1:1 Intensive' },
            { text: 'I\'m not sure yet — I just want to learn more', routes: 'Self-Paced' },
        ],
    },
];

const programmeDetails: Record<Programme, { tagline: string; description: string }> = {
    'Self-Paced': {
        tagline: 'Begin at your own rhythm',
        description: 'Complete the programme entirely in private, with lifetime access. Start whenever you feel ready.',
    },
    'Guided Recovery': {
        tagline: 'Held support throughout',
        description: 'Personalised guidance and community, at a sustainable pace with Ondine and others who understand.',
    },
    '1:1 Intensive': {
        tagline: 'Deep, individualised support',
        description: 'The most personalised path — tailored to your exact nervous system with weekly 1:1 sessions.',
    },
};

interface SomaticQuizProps {
    onApply: (programme: string) => void;
}

export function SomaticQuiz({ onApply }: SomaticQuizProps) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Programme[]>([]);
    const [selected, setSelected] = useState<Programme | null>(null);
    const [result, setResult] = useState<Programme | null>(null);
    const [direction, setDirection] = useState(1);

    const tally = (collected: Programme[]): Programme => {
        const counts: Record<Programme, number> = { 'Self-Paced': 0, 'Guided Recovery': 0, '1:1 Intensive': 0 };
        collected.forEach(r => counts[r]++);
        return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]) as Programme;
    };

    const handleSelect = (option: QuizOption) => {
        setSelected(option.routes);
    };

    const handleNext = () => {
        if (!selected) return;
        const next = [...answers, selected];
        setAnswers(next);
        setSelected(null);

        if (questionIndex < questions.length - 1) {
            setDirection(1);
            setQuestionIndex(i => i + 1);
        } else {
            setResult(tally(next));
        }
    };

    const handleReset = () => {
        setQuestionIndex(0);
        setAnswers([]);
        setSelected(null);
        setResult(null);
        setDirection(1);
    };

    const prefersReduced = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const slideVariants = {
        enter: (d: number) => ({ x: prefersReduced ? 0 : d > 0 ? 40 : -40, opacity: 0 }),
        centre: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: prefersReduced ? 0 : d > 0 ? -40 : 40, opacity: 0 }),
    };

    return (
        <section
            id="quiz"
            aria-labelledby="quiz-heading"
            style={{
                paddingTop: '96px',
                paddingBottom: '96px',
                background: 'linear-gradient(160deg, rgba(141,170,145,0.10) 0%, rgba(253,253,248,1) 70%)',
            }}
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
                        Find Your Path
                    </p>
                    <h2
                        id="quiz-heading"
                        className="font-display font-bold text-slate mb-5"
                        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.2' }}
                    >
                        Which of these feels most like your experience right now?
                    </h2>
                    <p className="text-lg text-slate/55 max-w-xl mx-auto" style={{ lineHeight: '1.8' }}>
                        This takes 30 seconds and helps us understand where you are in your journey.
                    </p>
                </motion.div>

                {/* Quiz card */}
                <div
                    className="bg-white rounded-3xl shadow-card overflow-hidden"
                    style={{ border: '1px solid rgba(141,170,145,0.2)', minHeight: '420px' }}
                >
                    <AnimatePresence mode="wait" custom={direction}>
                        {!result ? (
                            /* ── Question ── */
                            <motion.div
                                key={`q-${questionIndex}`}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="centre"
                                exit="exit"
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="p-8 md:p-10"
                            >
                                {/* Progress */}
                                <div className="flex gap-2 mb-8" aria-label={`Question ${questionIndex + 1} of ${questions.length}`}>
                                    {questions.map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-1 flex-1 rounded-full transition-all duration-400"
                                            style={{ backgroundColor: i <= questionIndex ? '#8DAA91' : 'rgba(141,170,145,0.15)' }}
                                        />
                                    ))}
                                </div>

                                <h3 className="font-display font-semibold text-slate mb-6 text-xl md:text-2xl" style={{ lineHeight: '1.3' }}>
                                    {questions[questionIndex].text}
                                </h3>

                                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                    {questions[questionIndex].options.map((option) => (
                                        <button
                                            key={option.text}
                                            onClick={() => handleSelect(option)}
                                            className="text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-sm font-medium leading-snug focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                            style={{
                                                borderColor: selected === option.routes && option.text === questions[questionIndex].options.find(o => o.routes === selected)?.text
                                                    ? '#8DAA91' : 'rgba(141,170,145,0.25)',
                                                backgroundColor: selected === option.routes && option.text === questions[questionIndex].options.find(o => o.routes === selected)?.text
                                                    ? 'rgba(141,170,145,0.12)' : 'white',
                                                color: '#4A4E69',
                                                minHeight: '80px',
                                            }}
                                            aria-pressed={selected === option.routes}
                                        >
                                            {option.text}
                                        </button>
                                    ))}
                                </div>

                                <motion.button
                                    onClick={handleNext}
                                    disabled={!selected}
                                    whileHover={selected ? { scale: 1.02 } : {}}
                                    whileTap={selected ? { scale: 0.98 } : {}}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                    style={{
                                        backgroundColor: selected ? '#8DAA91' : 'rgba(141,170,145,0.35)',
                                        boxShadow: selected ? '0 4px 20px rgba(141,170,145,0.35)' : 'none',
                                        cursor: selected ? 'pointer' : 'not-allowed',
                                    }}
                                >
                                    {questionIndex < questions.length - 1 ? 'Next question' : 'See my result'}
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                </motion.button>
                            </motion.div>
                        ) : (
                            /* ── Result ── */
                            <motion.div
                                key="result"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="centre"
                                exit="exit"
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="p-8 md:p-10 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                                    style={{ backgroundColor: 'rgba(141,170,145,0.15)' }}
                                >
                                    <span className="text-2xl">🌿</span>
                                </motion.div>

                                <p className="text-sm font-semibold tracking-widest uppercase text-sage mb-3">
                                    Your suggestion
                                </p>
                                <h3
                                    className="font-display font-bold text-slate mb-2"
                                    style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', lineHeight: '1.2' }}
                                >
                                    {result}
                                </h3>
                                <p className="text-sage font-medium mb-4">
                                    {programmeDetails[result].tagline}
                                </p>
                                <p className="text-slate/60 mb-3 max-w-md mx-auto" style={{ lineHeight: '1.8' }}>
                                    Based on what you've shared, <strong>{result}</strong> may be a natural starting point.
                                </p>
                                <p className="text-sm text-slate/40 italic mb-8">
                                    This is just a suggestion — trust what feels right for you.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => onApply(result)}
                                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                                        style={{ backgroundColor: '#8DAA91', boxShadow: '0 4px 20px rgba(141,170,145,0.35)' }}
                                    >
                                        Apply for {result}
                                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                    </motion.button>
                                    <button
                                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border font-semibold text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage"
                                        style={{ borderColor: 'rgba(141,170,145,0.4)', color: '#6B8A6F' }}
                                    >
                                        View all options
                                    </button>
                                </div>

                                <button
                                    onClick={handleReset}
                                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate/40 hover:text-slate/60 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sage rounded-full px-2"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                                    Start again
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
