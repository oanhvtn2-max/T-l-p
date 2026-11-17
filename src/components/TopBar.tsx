import { Compass } from 'lucide-react';
import { ScreenName, StudentSession } from '../types/gdcd';

interface TopBarProps {
  currentScreen: ScreenName;
  session: StudentSession | null;
  onNavigate: (screen: ScreenName) => void;
  onStartPrimaryAction: () => void;
}

export function TopBar({
  currentScreen,
  session,
  onNavigate,
  onStartPrimaryAction,
}: TopBarProps) {
  const hasActiveStudent = Boolean(session?.name.trim());

  const primaryLabel =
    currentScreen === 'welcome'
      ? hasActiveStudent
        ? 'Tiếp tục hành trình'
        : 'Bắt đầu học'
      : currentScreen === 'map'
        ? 'Vào tình huống'
        : currentScreen === 'quiz'
          ? 'Xem bản đồ'
          : 'Chơi lại từ đầu';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2.5 text-left text-lg sm:text-xl font-bold tracking-tight text-blue-950 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg px-1 py-0.5"
        >
          <Compass className="w-6 h-6 text-amber-500 shrink-0" aria-hidden="true" />
          <span>Tình huống GDCD</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => onNavigate('welcome')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
              currentScreen === 'welcome'
                ? 'border-blue-800 text-blue-900 font-semibold'
                : 'border-transparent hover:text-blue-900 hover:border-slate-300'
            }`}
          >
            Trang chủ
          </button>
          <button
            type="button"
            onClick={() => {
              if (hasActiveStudent) {
                onNavigate('map');
              } else {
                onNavigate('welcome');
              }
            }}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
              currentScreen === 'map' || currentScreen === 'quiz'
                ? 'border-blue-800 text-blue-900 font-semibold'
                : 'border-transparent hover:text-blue-900 hover:border-slate-300'
            }`}
          >
            Bản đồ hành trình
          </button>
          <button
            type="button"
            onClick={() => onNavigate('summary')}
            className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
              currentScreen === 'summary'
                ? 'border-blue-800 text-blue-900 font-semibold'
                : 'border-transparent hover:text-blue-900 hover:border-slate-300'
            }`}
          >
            Bảng xếp hạng
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onStartPrimaryAction}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm"
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
