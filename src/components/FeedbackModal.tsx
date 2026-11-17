import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpenCheck, CheckCircle2, Sparkles, XCircle } from 'lucide-react';
import { Scenario } from '../types/gdcd';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  scenario: Scenario;
  isLastScenario: boolean;
  onContinue: () => void;
}

const CONFETTI_PIECES = [
  { id: 1, x: -160, y: -120, rotate: 45, color: 'bg-amber-400', size: 'w-3 h-3' },
  { id: 2, x: -110, y: -155, rotate: -65, color: 'bg-emerald-500', size: 'w-2.5 h-4' },
  { id: 3, x: -55, y: -140, rotate: 30, color: 'bg-blue-600', size: 'w-3 h-3' },
  { id: 4, x: 0, y: -165, rotate: 90, color: 'bg-amber-500', size: 'w-2.5 h-2.5' },
  { id: 5, x: 60, y: -145, rotate: -40, color: 'bg-sky-500', size: 'w-3 h-3' },
  { id: 6, x: 115, y: -150, rotate: 70, color: 'bg-emerald-400', size: 'w-2.5 h-4' },
  { id: 7, x: 165, y: -115, rotate: -25, color: 'bg-orange-500', size: 'w-3 h-3' },
  { id: 8, x: -140, y: 60, rotate: 55, color: 'bg-blue-500', size: 'w-2.5 h-2.5' },
  { id: 9, x: 145, y: 70, rotate: -50, color: 'bg-amber-400', size: 'w-3 h-3' },
  { id: 10, x: -90, y: 110, rotate: 35, color: 'bg-emerald-500', size: 'w-2.5 h-2.5' },
  { id: 11, x: 95, y: 115, rotate: -75, color: 'bg-sky-400', size: 'w-3 h-3' },
  { id: 12, x: 25, y: -120, rotate: 15, color: 'bg-amber-300', size: 'w-2.5 h-3.5' },
];

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function FeedbackModal({
  isOpen,
  isCorrect,
  scenario,
  isLastScenario,
  onContinue,
}: FeedbackModalProps) {
  const correctLetter = OPTION_LETTERS[scenario.correctIndex];
  const correctOptionText = scenario.options[scenario.correctIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
        >
          <div className="relative w-full max-w-2xl">
            {/* Confetti burst for correct answers */}
            {isCorrect && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
                aria-hidden="true"
              >
                {CONFETTI_PIECES.map((piece) => (
                  <motion.span
                    key={piece.id}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                    animate={{
                      x: piece.x,
                      y: piece.y,
                      scale: [0, 1.2, 1],
                      opacity: [1, 1, 0],
                      rotate: piece.rotate * 3,
                    }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute rounded-sm ${piece.size} ${piece.color}`}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={isCorrect ? { scale: 0.92, opacity: 0, y: 12 } : { x: 0, opacity: 0, scale: 0.97 }}
              animate={
                isCorrect
                  ? { scale: 1, opacity: 1, y: 0 }
                  : { x: [0, -10, 10, -7, 7, -3, 3, 0], opacity: 1, scale: 1 }
              }
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: isCorrect ? 0.24 : 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Top status banner */}
              <div
                className={`px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 ${
                  isCorrect
                    ? 'bg-emerald-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="w-7 h-7 text-white" aria-hidden="true" />
                    ) : (
                      <XCircle className="w-7 h-7 text-white" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h2
                      id="feedback-modal-title"
                      className="text-xl sm:text-2xl font-bold tracking-tight"
                    >
                      {isCorrect ? 'Chính xác!' : 'Chưa chính xác!'}
                    </h2>
                    <p className="text-sm sm:text-base text-white/90 font-medium">
                      {isCorrect
                        ? 'Tuyệt vời, bạn được cộng +10 điểm tự lập.'
                        : 'Không sao cả, hãy xem lời giải thích để ghi nhớ bài học nhé.'}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                    Điểm câu này
                  </span>
                  <span className="font-mono-num text-2xl font-bold">
                    {isCorrect ? '+10' : '+0'}
                  </span>
                </div>
              </div>

              {/* Educational explanation body */}
              <div className="p-6 sm:p-8 space-y-5">
                {!isCorrect && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <p className="text-sm font-semibold text-emerald-800 mb-1">
                      Đáp án đúng là phương án {correctLetter}:
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-emerald-950 leading-snug">
                      {correctOptionText}
                    </p>
                  </div>
                )}

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-blue-900">
                    <BookOpenCheck className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                    <h3 className="text-base sm:text-lg font-bold">
                      Giải thích chi tiết ý nghĩa giáo dục
                    </h3>
                  </div>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    {scenario.explanation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                    <span>
                      Bài học: <strong className="text-slate-900">{scenario.lessonCore}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onContinue}
                    autoFocus
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-2xl transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm"
                  >
                    <span>{isLastScenario ? 'Xem tổng kết hành trình' : 'Tiếp tục'}</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
