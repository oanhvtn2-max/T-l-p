import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Play, Trophy, User } from 'lucide-react';
import { GradeLevel, StudentSession } from '../types/gdcd';
import { IllustratedImage } from './ScenarioIcon';

interface WelcomeScreenProps {
  existingSession: StudentSession | null;
  onStartNew: (name: string, grade: GradeLevel) => void;
  onContinueExisting: () => void;
  onOpenLeaderboard: () => void;
}

const GRADES: { value: GradeLevel; label: string }[] = [
  { value: '6', label: 'Lớp 6' },
  { value: '7', label: 'Lớp 7' },
  { value: '8', label: 'Lớp 8' },
  { value: '9', label: 'Lớp 9' },
];

export function WelcomeScreen({
  existingSession,
  onStartNew,
  onContinueExisting,
  onOpenLeaderboard,
}: WelcomeScreenProps) {
  const [name, setName] = useState(existingSession?.name ?? '');
  const [grade, setGrade] = useState<GradeLevel>(existingSession?.grade ?? '6');
  const [error, setError] = useState('');

  const answeredCount = existingSession ? Object.keys(existingSession.answers).length : 0;
  const hasUnfinishedSession = Boolean(
    existingSession && existingSession.name.trim() && answeredCount > 0 && answeredCount < 10
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Vui lòng nhập họ và tên học sinh trước khi bắt đầu.');
      return;
    }
    if (trimmed.length < 2) {
      setError('Tên học sinh cần có ít nhất 2 ký tự.');
      return;
    }
    setError('');
    onStartNew(trimmed, grade);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Two-column balanced hero split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left column: Intro + Student Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm"
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
              <span>Giáo dục công dân THCS</span>
              <span aria-hidden="true">·</span>
              <span>Chủ đề Tự lập</span>
              <span aria-hidden="true">·</span>
              <span>Lớp 6 – 9</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-blue-950 tracking-tight leading-tight text-balance">
                Hành trình rèn luyện tính Tự Lập qua câu chuyện tương tác
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Đồng hành cùng bạn Minh An vượt qua 10 tình huống thực tế ở gia đình, lớp học và
                cuộc sống hằng ngày để hiểu sâu sắc giá trị của tính tự lập.
              </p>
            </div>

            {/* Continue existing session prompt if applicable */}
            {hasUnfinishedSession && existingSession && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-amber-950">
                    Đang có hành trình chưa hoàn thành
                  </p>
                  <p className="text-sm text-amber-800">
                    {existingSession.name} · Lớp {existingSession.grade} · Đã làm{' '}
                    <span className="font-mono-num font-semibold">{answeredCount}/10</span> câu (
                    <span className="font-mono-num font-semibold">{existingSession.score}</span>{' '}
                    điểm)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onContinueExisting}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Tiếp tục ngay</span>
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-2" noValidate>
              <div className="space-y-2">
                <label
                  htmlFor="student-name"
                  className="block text-base font-bold text-slate-800"
                >
                  Họ và tên học sinh
                </label>
                <div className="relative">
                  <User
                    className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="student-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Nhập tên của bạn (ví dụ: Nguyễn Minh An)"
                    maxLength={50}
                    className={`w-full pl-12 pr-4 py-3.5 text-base sm:text-lg rounded-2xl border bg-slate-50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                      error ? 'border-red-500' : 'border-slate-300'
                    }`}
                  />
                </div>
                {error && (
                  <p role="alert" className="text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <span className="block text-base font-bold text-slate-800">Chọn khối lớp</span>
                <div
                  role="radiogroup"
                  aria-label="Khối lớp"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {GRADES.map((item) => {
                    const isSelected = grade === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setGrade(item.value)}
                        className={`py-3 px-4 rounded-2xl text-base font-bold border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-blue-800 text-white border-blue-800 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-lg font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm"
                >
                  <span>Bắt đầu hành trình</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenLeaderboard}
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 text-base font-semibold text-blue-900 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <Trophy className="w-5 h-5 text-amber-600" aria-hidden="true" />
                  <span>Xem bảng xếp hạng</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Right column: Full-height Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] rounded-3xl overflow-hidden border border-slate-200 bg-blue-950 shadow-sm"
        >
          <IllustratedImage
            src="/src/assets/images/hero_student_journey_1794881350051.jpg"
            alt="Minh họa các bạn học sinh THCS Việt Nam tự giác sắp xếp bàn học và chăm sóc góc học tập"
            className="w-full h-full lg:h-full object-cover"
            fallbackLabel="Học sinh THCS rèn luyện tính Tự Lập"
            fallbackIcon={<BookOpen className="w-12 h-12 text-blue-800" />}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-slate-950/85 via-slate-900/45 to-transparent text-white">
            <p className="text-sm font-semibold text-amber-300 mb-1">
              Thông điệp bài học
            </p>
            <p className="text-base sm:text-lg font-bold leading-snug">
              “Tự lập là tự làm lấy, tự giải quyết công việc của mình, tự lo liệu tạo dựng cho cuộc
              sống của mình; không trông chờ, dựa dẫm, phụ thuộc vào người khác.”
            </p>
          </div>
        </motion.div>
      </div>

      {/* 4-Column Quick Overview Strip */}
      <section
        aria-label="Thông tin tổng quan hành trình"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="font-mono-num text-2xl sm:text-3xl font-extrabold text-blue-900">10</div>
          <p className="text-base font-bold text-slate-900">Tình huống thực tế</p>
          <p className="text-sm text-slate-600">Từ việc nhà, học tập đến định hướng bản thân</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="font-mono-num text-2xl sm:text-3xl font-extrabold text-amber-600">
            100
          </div>
          <p className="text-base font-bold text-slate-900">Điểm tối đa</p>
          <p className="text-sm text-slate-600">Mỗi câu trả lời đúng được cộng +10 điểm</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="flex items-center gap-2 font-display text-2xl sm:text-3xl font-extrabold text-emerald-700">
            <CheckCircle2 className="w-7 h-7 shrink-0" aria-hidden="true" />
            <span>Tức thì</span>
          </div>
          <p className="text-base font-bold text-slate-900">Giải thích & Âm thanh</p>
          <p className="text-sm text-slate-600">Phản hồi trực quan kèm ý nghĩa giáo dục</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1">
          <div className="font-mono-num text-2xl sm:text-3xl font-extrabold text-blue-900">
            Top 5
          </div>
          <p className="text-base font-bold text-slate-900">Bảng xếp hạng</p>
          <p className="text-sm text-slate-600">Lưu tự động trên máy, dùng tốt trên lớp học</p>
        </div>
      </section>
    </div>
  );
}
