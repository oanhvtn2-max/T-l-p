import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  CheckCircle2,
  Compass,
  Home,
  RotateCcw,
  Trash2,
  Trophy,
  XCircle,
} from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';
import { LeaderboardEntry, StudentSession } from '../types/gdcd';
import { IllustratedImage } from './ScenarioIcon';

interface SummaryLeaderboardProps {
  session: StudentSession | null;
  leaderboard: LeaderboardEntry[];
  latestEntryId: string | null;
  onReplay: () => void;
  onBackHome: () => void;
  onBackToMap: () => void;
  onReviewScenario: (scenarioId: number) => void;
  onClearLeaderboard: () => void;
}

function getCompetencyTier(score: number): {
  label: string;
  description: string;
  accentClass: string;
} {
  if (score >= 80) {
    return {
      label: 'Xuất sắc',
      description:
        'Bạn có ý thức tự lập rất vững vàng! Bạn chủ động trong học tập, việc nhà, chi tiêu và ứng xử tích cực với mọi người.',
      accentClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    };
  }
  if (score >= 50) {
    return {
      label: 'Khá',
      description:
        'Bạn đã có nền tảng tính tự lập tốt! Hãy tiếp tục rèn luyện sự chủ động và kỷ luật bản thân trong những tình huống khó hơn nhé.',
      accentClass: 'text-blue-800 bg-blue-50 border-blue-200',
    };
  }
  return {
    label: 'Cần cố gắng',
    description:
      'Đừng nản lòng nhé! Hãy xem lại phần giải thích của từng tình huống và tập thói quen tự làm những việc vừa sức mỗi ngày.',
    accentClass: 'text-amber-800 bg-amber-50 border-amber-200',
  };
}

export function SummaryLeaderboard({
  session,
  leaderboard,
  latestEntryId,
  onReplay,
  onBackHome,
  onBackToMap,
  onReviewScenario,
  onClearLeaderboard,
}: SummaryLeaderboardProps) {
  const [confirmClearBoard, setConfirmClearBoard] = useState(false);

  const answersList = session ? Object.values(session.answers) : [];
  const isCompletedRun = Boolean(session && answersList.length === SCENARIOS.length);
  const correctCount = answersList.filter((a) => a.isCorrect).length;
  const wrongCount = answersList.length - correctCount;
  const score = session?.score ?? 0;
  const tier = getCompetencyTier(score);
  const topFive = leaderboard.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Result Summary Card (shown when student has completed or has progress) */}
      {session && isCompletedRun ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Trophy Image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-slate-200 bg-sky-50 shadow-xs">
                <IllustratedImage
                  src="/src/assets/images/trophy_tu_lap_1794881350671.jpg"
                  alt="Cúp vàng vinh danh hoàn thành hành trình Tự Lập"
                  className="w-full h-full object-cover"
                  fallbackLabel="Hoàn thành hành trình Tự Lập"
                  fallbackIcon={<Trophy className="w-16 h-16 text-amber-500" />}
                />
              </div>
            </div>

            {/* Score & Competency Breakdown */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
                  <span>Tổng kết hành trình</span>
                  <span aria-hidden="true">·</span>
                  <span>{session.name}</span>
                  <span aria-hidden="true">·</span>
                  <span>Lớp {session.grade}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
                  Chúc mừng bạn đã hoàn thành 10 tình huống!
                </h1>
              </div>

              {/* 3 Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">Tổng điểm đạt được</p>
                  <p className="font-mono-num text-3xl font-extrabold text-blue-900 mt-1">
                    {score} <span className="text-lg font-bold text-slate-500">/ 100</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">Kết quả chi tiết</p>
                  <div className="flex items-center gap-4 mt-1.5 font-mono-num text-lg font-bold">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <span>{correctCount} đúng</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-red-600">
                      <XCircle className="w-5 h-5" aria-hidden="true" />
                      <span>{wrongCount} sai</span>
                    </span>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${tier.accentClass}`}>
                  <p className="text-sm font-semibold opacity-85">Xếp loại năng lực tự lập</p>
                  <p className="font-display text-2xl font-extrabold mt-1 flex items-center gap-2">
                    <Award className="w-6 h-6 shrink-0" aria-hidden="true" />
                    <span>{tier.label}</span>
                  </p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {tier.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onReplay}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  <span>Chơi lại từ đầu</span>
                </button>
                <button
                  type="button"
                  onClick={onBackHome}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <Home className="w-5 h-5" aria-hidden="true" />
                  <span>Về trang chủ</span>
                </button>
              </div>
            </div>
          </div>

          {/* 10-Scenario Quick Review Grid */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              Xem lại từng tình huống (bấm vào ô để ôn tập)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
              {SCENARIOS.map((item, idx) => {
                const ans = session.answers[item.id];
                const ok = ans?.isCorrect;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onReviewScenario(item.id)}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      ok
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                        : 'bg-red-50 border-red-200 text-red-900 hover:bg-red-100'
                    }`}
                  >
                    <div className="font-mono-num text-sm font-bold">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex justify-center mt-1">
                      {ok ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.section>
      ) : (
        /* Header when viewing Leaderboard without having finished all 10 scenarios yet */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              Bảng xếp hạng thành tích Tự Lập
            </h1>
            <p className="text-base text-slate-600">
              Vinh danh 5 học sinh đạt điểm cao nhất được lưu trữ trên thiết bị này.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {session && (
              <button
                type="button"
                onClick={onBackToMap}
                className="inline-flex items-center gap-2 px-5 py-3 text-base font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Compass className="w-5 h-5" aria-hidden="true" />
                <span>Quay lại bản đồ</span>
              </button>
            )}
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 px-5 py-3 text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              <span>Về trang chủ</span>
            </button>
          </div>
        </div>
      )}

      {/* Top 5 Leaderboard Table Card */}
      <section
        aria-label="Bảng xếp hạng Top 5 học sinh"
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Top 5 học sinh điểm cao nhất
              </h2>
              <p className="text-sm text-slate-600">
                Dữ liệu lưu bền vững trên trình duyệt của máy tính / điện thoại này
              </p>
            </div>
          </div>

          {topFive.length > 0 && (
            <button
              type="button"
              onClick={() => setConfirmClearBoard(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-red-700 bg-slate-100 hover:bg-red-50 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span>Xóa bảng xếp hạng</span>
            </button>
          )}
        </div>

        {topFive.length === 0 ? (
          <div className="p-10 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
            <p className="text-lg font-bold text-slate-800">Chưa có kết quả nào được ghi nhận</p>
            <p className="text-base text-slate-600">
              Hãy hoàn thành trọn vẹn 10 tình huống để ghi tên mình vào bảng vàng Top 5 nhé!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-sm font-semibold text-slate-500">
                  <th className="py-3 px-4">Hạng</th>
                  <th className="py-3 px-4">Học sinh</th>
                  <th className="py-3 px-4">Khối lớp</th>
                  <th className="py-3 px-4">Thời gian hoàn thành</th>
                  <th className="py-3 px-4 text-right">Điểm số</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-base">
                {topFive.map((entry, idx) => {
                  const isLatest = latestEntryId === entry.id;
                  const rankColors =
                    idx === 0
                      ? 'bg-amber-400 text-amber-950'
                      : idx === 1
                        ? 'bg-slate-200 text-slate-900'
                        : idx === 2
                          ? 'bg-orange-200 text-orange-950'
                          : 'bg-slate-100 text-slate-700';

                  return (
                    <tr
                      key={entry.id}
                      className={isLatest ? 'bg-blue-50/70' : 'hover:bg-slate-50/80'}
                    >
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-mono-num text-sm font-extrabold ${rankColors}`}
                        >
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900">
                        {entry.name}
                        {isLatest && (
                          <span className="ml-2 text-xs font-semibold text-blue-800">
                            (Lượt vừa xong)
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-slate-700">Lớp {entry.grade}</td>
                      <td className="py-4 px-4 font-mono-num text-sm text-slate-600">
                        {entry.date}
                      </td>
                      <td className="py-4 px-4 text-right font-mono-num text-lg font-extrabold text-blue-900">
                        {entry.score} / 100
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Clear Leaderboard Confirmation Dialog */}
      {confirmClearBoard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-board-title"
        >
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 sm:p-7 space-y-5">
            <div className="space-y-2">
              <h2 id="clear-board-title" className="text-xl font-bold text-slate-900">
                Xóa toàn bộ bảng xếp hạng?
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Hành động này sẽ xóa danh sách Top 5 học sinh đã lưu trên trình duyệt. Bạn có chắc
                chắn muốn thực hiện không?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmClearBoard(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmClearBoard(false);
                  onClearLeaderboard();
                }}
                className="px-4 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
              >
                Xóa bảng xếp hạng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
