import { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Compass,
  Lock,
  PlayCircle,
  RotateCcw,
  Trophy,
  Unlock,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { StudentSession } from '../types/gdcd';
import { ScenarioIcon } from './ScenarioIcon';

interface JourneyMapProps {
  session: StudentSession;
  muted: boolean;
  teacherFreeMode: boolean;
  onToggleMute: () => void;
  onToggleTeacherMode: () => void;
  onSelectScenario: (scenarioId: number) => void;
  onOpenLeaderboard: () => void;
  onResetSessionData: () => void;
  onViewSummary: () => void;
}

export function JourneyMap({
  session,
  muted,
  teacherFreeMode,
  onToggleMute,
  onToggleTeacherMode,
  onSelectScenario,
  onOpenLeaderboard,
  onResetSessionData,
  onViewSummary,
}: JourneyMapProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const completedCount = Object.keys(session.answers).length;
  const progressPercent = Math.round((completedCount / SCENARIOS.length) * 100);
  const allCompleted = completedCount === SCENARIOS.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Workspace Header & Action Toolbar */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
              <span>Học sinh:</span>
              <strong className="text-slate-900 text-base">{session.name}</strong>
              <span aria-hidden="true">·</span>
              <span>Lớp {session.grade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Bản đồ 10 cột mốc Tự Lập
            </h1>
          </div>

          {/* Real-time Score & Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-semibold text-slate-500">Điểm tích lũy</p>
                <p className="font-mono-num text-xl font-extrabold text-blue-900">
                  {session.score} / 100
                </p>
              </div>
              <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
              <div>
                <p className="text-xs font-semibold text-slate-500">Tiến độ</p>
                <p className="font-mono-num text-xl font-extrabold text-amber-600">
                  {completedCount} / 10
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 text-slate-500" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4 text-blue-800" aria-hidden="true" />
              )}
              <span>{muted ? 'Đang tắt tiếng' : 'Âm thanh: Bật'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenLeaderboard}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-bold text-blue-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              <Trophy className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <span>Bảng xếp hạng</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Cài đặt lại dữ liệu</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Teacher Mode Toggle */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Tiến trình hoàn thành hành trình</span>
              <span className="font-mono-num text-blue-900">{progressPercent}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-blue-800 via-blue-600 to-emerald-500 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onToggleTeacherMode}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                teacherFreeMode
                  ? 'bg-blue-50 border-blue-300 text-blue-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Cho phép giáo viên hoặc học sinh chọn mở trực tiếp bất kỳ tình huống nào trên máy chiếu"
            >
              {teacherFreeMode ? (
                <Unlock className="w-4 h-4 text-blue-800" aria-hidden="true" />
              ) : (
                <Compass className="w-4 h-4 text-slate-500" aria-hidden="true" />
              )}
              <span>{teacherFreeMode ? 'Trình chiếu: Mở tự do' : 'Chế độ tuần tự'}</span>
            </button>

            {allCompleted && (
              <button
                type="button"
                onClick={onViewSummary}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <Trophy className="w-4 h-4" aria-hidden="true" />
                <span>Xem tổng kết</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 10 Milestones Grid / Winding Journey */}
      <section aria-label="Danh sách 10 tình huống thử thách">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {SCENARIOS.map((scenario, idx) => {
            const answerRecord = session.answers[scenario.id];
            const isCompleted = Boolean(answerRecord);
            const isUnlocked = teacherFreeMode || scenario.id <= session.unlockedUpTo || isCompleted;
            const isCurrentTarget = !isCompleted && isUnlocked && scenario.id === session.unlockedUpTo;

            return (
              <motion.button
                key={scenario.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelectScenario(scenario.id)}
                whileHover={isUnlocked ? { y: -3 } : undefined}
                whileTap={isUnlocked ? { scale: 0.98 } : undefined}
                transition={{ duration: 0.16 }}
                className={`group relative text-left rounded-2xl p-5 border flex flex-col justify-between min-h-[195px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                  isCompleted
                    ? answerRecord.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300 hover:bg-emerald-50 cursor-pointer'
                      : 'bg-amber-50/70 border-amber-300 hover:bg-amber-50 cursor-pointer'
                    : isCurrentTarget
                      ? 'bg-white border-blue-700 ring-2 ring-blue-700/15 shadow-md hover:border-blue-800 cursor-pointer'
                      : isUnlocked
                        ? 'bg-white border-slate-200 hover:border-blue-500 shadow-sm cursor-pointer'
                        : 'bg-slate-100/80 border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono-num text-sm font-bold ${
                        isCompleted
                          ? answerRecord.isCorrect
                            ? 'text-emerald-800'
                            : 'text-amber-800'
                          : isUnlocked
                            ? 'text-blue-800'
                            : 'text-slate-400'
                      }`}
                    >
                      Cột mốc {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? answerRecord.isCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                          : isCurrentTarget
                            ? 'bg-blue-800 text-white'
                            : isUnlocked
                              ? 'bg-blue-50 text-blue-800'
                              : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      <ScenarioIcon icon={scenario.icon} className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p
                      className={`text-xs font-medium ${
                        isUnlocked ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {scenario.category}
                    </p>
                    <h2
                      className={`text-lg font-bold leading-snug ${
                        isUnlocked ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {scenario.title}
                    </h2>
                  </div>
                </div>

                {/* Explicit dual-coded status footer (icon + text, never color alone) */}
                <div className="pt-4 mt-4 border-t border-slate-200/70 flex items-center justify-between gap-2 text-sm font-semibold">
                  {isCompleted ? (
                    answerRecord.isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Đã hoàn thành · +10đ</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-amber-800">
                        <XCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                        <span>Đã hoàn thành · 0đ</span>
                      </span>
                    )
                  ) : isUnlocked ? (
                    <span className="inline-flex items-center gap-1.5 text-blue-800">
                      <PlayCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{isCurrentTarget ? 'Đang mở khóa · Chơi ngay' : 'Đang mở khóa'}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Chưa mở</span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* In-app Reset Confirmation Modal (no window.confirm) */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 sm:p-7 space-y-5">
            <div className="space-y-2">
              <h2 id="reset-dialog-title" className="text-xl font-bold text-slate-900">
                Cài đặt lại dữ liệu hành trình?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Toàn bộ câu trả lời và điểm số hiện tại của <strong>{session.name}</strong> sẽ được
                xóa để bắt đầu lại từ đầu. Bảng xếp hạng đã lưu vẫn được giữ nguyên.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetSessionData();
                }}
                className="px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
              >
                Xác nhận đặt lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
