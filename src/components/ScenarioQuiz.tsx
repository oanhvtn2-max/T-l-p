import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { Scenario, StudentSession } from '../types/gdcd';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/sound';
import { FeedbackModal } from './FeedbackModal';
import { IllustratedImage, ScenarioIcon } from './ScenarioIcon';

interface ScenarioQuizProps {
  scenario: Scenario;
  session: StudentSession;
  muted: boolean;
  onToggleMute: () => void;
  onSubmitAnswer: (scenarioId: number, selectedIndex: number, isCorrect: boolean) => void;
  onContinueNext: (currentScenarioId: number) => void;
  onBackToMap: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

export function ScenarioQuiz({
  scenario,
  session,
  muted,
  onToggleMute,
  onSubmitAnswer,
  onContinueNext,
  onBackToMap,
}: ScenarioQuizProps) {
  const existingAnswer = session.answers[scenario.id];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    existingAnswer ? existingAnswer.selectedIndex : null
  );
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(Boolean(existingAnswer));
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [shakeTrigger, setShakeTrigger] = useState<number>(0);

  // Reset local state whenever scenario changes
  useEffect(() => {
    const prev = session.answers[scenario.id];
    setSelectedIndex(prev ? prev.selectedIndex : null);
    setHasSubmitted(Boolean(prev));
    setShowFeedbackModal(false);
    setShakeTrigger(0);
  }, [scenario.id, session.answers]);

  const scenarioPosition = SCENARIOS.findIndex((item) => item.id === scenario.id) + 1;
  const isLastScenario = scenarioPosition === SCENARIOS.length;
  const progressPercent = Math.round((scenarioPosition / SCENARIOS.length) * 100);

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    playClickSound(muted);
    setSelectedIndex(idx);
  };

  const handleConfirm = () => {
    if (selectedIndex === null || hasSubmitted) return;
    const isCorrect = selectedIndex === scenario.correctIndex;
    setHasSubmitted(true);

    if (isCorrect) {
      playCorrectSound(muted);
    } else {
      playWrongSound(muted);
      setShakeTrigger((prev) => prev + 1);
    }

    onSubmitAnswer(scenario.id, selectedIndex, isCorrect);
    setShowFeedbackModal(true);
  };

  const chosenIsCorrect =
    hasSubmitted && selectedIndex !== null && selectedIndex === scenario.correctIndex;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Quiz Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3 sm:px-6 shadow-sm">
        <button
          type="button"
          onClick={onBackToMap}
          className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-700 hover:text-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          <span>Quay lại bản đồ</span>
        </button>

        {/* Progress counter & bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-sm">
          <span className="font-mono-num text-sm sm:text-base font-bold text-blue-950 whitespace-nowrap shrink-0">
            Câu {scenarioPosition}/10
          </span>
          <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-blue-800 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 font-mono-num text-sm sm:text-base font-extrabold text-amber-900 whitespace-nowrap shrink-0">
            {session.score} điểm
          </div>
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            {muted ? (
              <VolumeX className="w-5 h-5 text-slate-500" aria-hidden="true" />
            ) : (
              <Volume2 className="w-5 h-5 text-blue-800" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Main Story & Question Card */}
      <motion.div
        key={scenario.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
      >
        {/* Storyteller & Context Section */}
        <div className="p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-blue-50/70 via-white to-amber-50/40 border-b border-slate-200 space-y-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-blue-200 bg-sky-100 shrink-0 shadow-xs">
              <IllustratedImage
                src="/src/assets/images/avatar_minh_an_1794881350528.jpg"
                alt="Nhân vật Minh An"
                className="w-full h-full object-cover"
                fallbackLabel="Minh An"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
                <span>Tình huống {String(scenarioPosition).padStart(2, '0')}</span>
                <span aria-hidden="true">·</span>
                <span>{scenario.category}</span>
                <span aria-hidden="true">·</span>
                <span>Kể bởi {scenario.characterName}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ScenarioIcon
                  icon={scenario.icon}
                  className="w-6 h-6 text-amber-600 shrink-0"
                />
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-950 tracking-tight">
                  {scenario.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 space-y-3">
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed">
              {scenario.storyContext}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-950 leading-snug pt-1">
              {scenario.question}
            </p>
          </div>
        </div>

        {/* 4 Multiple Choice Options (A, B, C, D) */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="grid grid-cols-1 gap-3.5" role="radiogroup" aria-label={scenario.question}>
            {scenario.options.map((optionText, idx) => {
              const isSelected = selectedIndex === idx;
              const isCorrectOption = idx === scenario.correctIndex;
              const showWrongSelected = hasSubmitted && isSelected && !isCorrectOption;
              const showCorrectHighlight = hasSubmitted && isCorrectOption;

              let cardClasses =
                'bg-slate-50 border-slate-200 text-slate-800 hover:bg-blue-50/60 hover:border-blue-400';
              let badgeClasses = 'bg-white border-slate-300 text-slate-700';

              if (!hasSubmitted && isSelected) {
                cardClasses =
                  'bg-blue-50 border-blue-800 ring-2 ring-blue-800/15 text-blue-950';
                badgeClasses = 'bg-blue-800 border-blue-800 text-white';
              } else if (showCorrectHighlight) {
                cardClasses =
                  'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950';
                badgeClasses = 'bg-emerald-600 border-emerald-600 text-white';
              } else if (showWrongSelected) {
                cardClasses =
                  'bg-red-50 border-red-500 ring-2 ring-red-500/15 text-red-950';
                badgeClasses = 'bg-red-600 border-red-600 text-white';
              } else if (hasSubmitted) {
                cardClasses = 'bg-slate-50/70 border-slate-200 text-slate-500';
                badgeClasses = 'bg-slate-100 border-slate-200 text-slate-400';
              }

              return (
                <motion.button
                  key={`${scenario.id}-${idx}`}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={hasSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  animate={
                    showWrongSelected && shakeTrigger > 0
                      ? { x: [0, -10, 10, -7, 7, -3, 3, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-colors flex items-start sm:items-center justify-between gap-4 min-h-[64px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    hasSubmitted ? 'cursor-default' : 'cursor-pointer'
                  } ${cardClasses}`}
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <span
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border font-display font-bold text-base sm:text-lg flex items-center justify-center shrink-0 transition-colors ${badgeClasses}`}
                    >
                      {LETTERS[idx]}
                    </span>
                    <span className="text-base sm:text-lg lg:text-xl font-medium leading-snug pt-0.5 sm:pt-0">
                      {optionText}
                    </span>
                  </div>

                  {showCorrectHighlight && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 whitespace-nowrap shrink-0">
                      <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span className="hidden sm:inline">Đáp án đúng</span>
                    </span>
                  )}

                  {showWrongSelected && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-700 whitespace-nowrap shrink-0">
                      <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span className="hidden sm:inline">Chưa đúng</span>
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-slate-600">
              {!hasSubmitted
                ? 'Hãy chọn một phương án xử lý phù hợp nhất rồi bấm Xác nhận.'
                : chosenIsCorrect
                  ? 'Bạn đã xử lý chính xác tình huống này (+10 điểm).'
                  : 'Bạn đã hoàn thành tình huống này. Hãy xem lại giải thích để ghi nhớ nhé.'}
            </p>

            {!hasSubmitted ? (
              <button
                type="button"
                disabled={selectedIndex === null}
                onClick={handleConfirm}
                className={`inline-flex items-center justify-center gap-2 px-7 py-4 text-base sm:text-lg font-bold rounded-2xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  selectedIndex === null
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-800 hover:bg-blue-900 text-white cursor-pointer shadow-sm'
                }`}
              >
                <span>Xác nhận</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <BookOpen className="w-5 h-5" aria-hidden="true" />
                  <span>Xem giải thích</span>
                </button>
                <button
                  type="button"
                  onClick={() => onContinueNext(scenario.id)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm"
                >
                  <span>{isLastScenario ? 'Xem tổng kết' : 'Câu tiếp theo'}</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Instant Feedback Modal (Screen 4) */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        isCorrect={chosenIsCorrect}
        scenario={scenario}
        isLastScenario={isLastScenario}
        onContinue={() => {
          setShowFeedbackModal(false);
          onContinueNext(scenario.id);
        }}
      />
    </div>
  );
}
