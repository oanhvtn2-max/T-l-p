import { useState } from 'react';
import { JourneyMap } from './components/JourneyMap';
import { ScenarioQuiz } from './components/ScenarioQuiz';
import { SummaryLeaderboard } from './components/SummaryLeaderboard';
import { TopBar } from './components/TopBar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SCENARIOS } from './data/scenarios';
import { GradeLevel, LeaderboardEntry, ScreenName, StudentSession } from './types/gdcd';
import { playClickSound, playCompleteSound } from './utils/sound';
import {
  clearLeaderboard,
  createFreshSession,
  formatVietnamDate,
  loadLeaderboard,
  loadMuted,
  loadSession,
  saveLeaderboardScore,
  saveMuted,
  saveSession,
} from './utils/storage';

export default function App() {
  const [session, setSession] = useState<StudentSession | null>(() => loadSession());
  const [screen, setScreen] = useState<ScreenName>('welcome');
  const [activeScenarioId, setActiveScenarioId] = useState<number>(1);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => loadLeaderboard());
  const [latestEntryId, setLatestEntryId] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(() => loadMuted());
  const [teacherFreeMode, setTeacherFreeMode] = useState<boolean>(false);

  const handleToggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      saveMuted(next);
      return next;
    });
  };

  const handleStartNew = (name: string, grade: GradeLevel) => {
    playClickSound(muted);
    const fresh = createFreshSession(name, grade);
    setSession(fresh);
    saveSession(fresh);
    setLatestEntryId(null);
    setActiveScenarioId(1);
    setScreen('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueExisting = () => {
    if (!session) return;
    playClickSound(muted);
    setScreen('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectScenario = (scenarioId: number) => {
    playClickSound(muted);
    setActiveScenarioId(scenarioId);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAnswer = (scenarioId: number, selectedIndex: number, isCorrect: boolean) => {
    if (!session) return;
    // Prevent altering an already recorded answer
    if (session.answers[scenarioId]) return;

    const nextAnswers = {
      ...session.answers,
      [scenarioId]: {
        scenarioId,
        selectedIndex,
        isCorrect,
      },
    };

    const correctCount = Object.values(nextAnswers).filter((item) => item.isCorrect).length;
    const nextScore = correctCount * 10;
    const nextUnlocked = Math.min(
      SCENARIOS.length,
      Math.max(session.unlockedUpTo, scenarioId + 1)
    );
    const isNowComplete = Object.keys(nextAnswers).length === SCENARIOS.length;
    const completedAt =
      isNowComplete && !session.completedAt ? formatVietnamDate(new Date()) : session.completedAt;

    const updatedSession: StudentSession = {
      ...session,
      answers: nextAnswers,
      score: nextScore,
      unlockedUpTo: nextUnlocked,
      completedAt,
    };

    setSession(updatedSession);
    saveSession(updatedSession);

    // Record to leaderboard once all 10 scenarios are completed
    if (isNowComplete && !session.completedAt) {
      const updatedBoard = saveLeaderboardScore({
        name: updatedSession.name,
        grade: updatedSession.grade,
        score: nextScore,
        correctCount,
        date: completedAt ?? formatVietnamDate(new Date()),
      });
      setLeaderboard(updatedBoard);
      // Identify the newly added entry by matching latest timestamp/name/score
      const matched = updatedBoard.find(
        (entry) =>
          entry.name === updatedSession.name &&
          entry.score === nextScore &&
          entry.date === (completedAt ?? '')
      );
      setLatestEntryId(matched?.id ?? null);
    }
  };

  const handleContinueNext = (currentScenarioId: number) => {
    playClickSound(muted);

    const allDone = session && Object.keys(session.answers).length === SCENARIOS.length;

    if (currentScenarioId < SCENARIOS.length) {
      setActiveScenarioId(currentScenarioId + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (allDone) {
      playCompleteSound(muted);
      setScreen('summary');
    } else {
      setScreen('map');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    playClickSound(muted);
    if (session) {
      const fresh = createFreshSession(session.name, session.grade);
      setSession(fresh);
      saveSession(fresh);
      setLatestEntryId(null);
      setActiveScenarioId(1);
      setScreen('map');
    } else {
      setScreen('welcome');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSessionData = () => {
    if (!session) return;
    playClickSound(muted);
    const fresh = createFreshSession(session.name, session.grade);
    setSession(fresh);
    saveSession(fresh);
    setLatestEntryId(null);
    setActiveScenarioId(1);
  };

  const handleClearLeaderboard = () => {
    playClickSound(muted);
    clearLeaderboard();
    setLeaderboard([]);
    setLatestEntryId(null);
  };

  const handleTopBarPrimaryAction = () => {
    playClickSound(muted);
    if (screen === 'welcome') {
      if (session?.name.trim()) {
        setScreen('map');
      } else {
        const inputEl = document.getElementById('student-name');
        inputEl?.focus();
        inputEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (screen === 'map' && session) {
      // Find first unanswered unlocked scenario or scenario 1
      const firstUnanswered = SCENARIOS.find((s) => !session.answers[s.id]);
      setActiveScenarioId(firstUnanswered ? firstUnanswered.id : 1);
      setScreen('quiz');
      return;
    }

    if (screen === 'quiz') {
      setScreen('map');
      return;
    }

    if (screen === 'summary') {
      handleReplay();
    }
  };

  const activeScenario =
    SCENARIOS.find((item) => item.id === activeScenarioId) ?? SCENARIOS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopBar
        currentScreen={screen}
        session={session}
        onNavigate={(target) => {
          playClickSound(muted);
          setScreen(target);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartPrimaryAction={handleTopBarPrimaryAction}
      />

      <main className="flex-1">
        {screen === 'welcome' && (
          <WelcomeScreen
            existingSession={session}
            onStartNew={handleStartNew}
            onContinueExisting={handleContinueExisting}
            onOpenLeaderboard={() => {
              playClickSound(muted);
              setScreen('summary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'map' && session && (
          <JourneyMap
            session={session}
            muted={muted}
            teacherFreeMode={teacherFreeMode}
            onToggleMute={handleToggleMute}
            onToggleTeacherMode={() => {
              playClickSound(muted);
              setTeacherFreeMode((prev) => !prev);
            }}
            onSelectScenario={handleSelectScenario}
            onOpenLeaderboard={() => {
              playClickSound(muted);
              setScreen('summary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onResetSessionData={handleResetSessionData}
            onViewSummary={() => {
              playClickSound(muted);
              setScreen('summary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'quiz' && session && (
          <ScenarioQuiz
            scenario={activeScenario}
            session={session}
            muted={muted}
            onToggleMute={handleToggleMute}
            onSubmitAnswer={handleSubmitAnswer}
            onContinueNext={handleContinueNext}
            onBackToMap={() => {
              playClickSound(muted);
              setScreen('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'summary' && (
          <SummaryLeaderboard
            session={session}
            leaderboard={leaderboard}
            latestEntryId={latestEntryId}
            onReplay={handleReplay}
            onBackHome={() => {
              playClickSound(muted);
              setScreen('welcome');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToMap={() => {
              playClickSound(muted);
              setScreen('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReviewScenario={(id) => {
              playClickSound(muted);
              setActiveScenarioId(id);
              setScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearLeaderboard={handleClearLeaderboard}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <span>Tình huống GDCD · Chủ đề Tự lập (Khối 6–9 THCS)</span>
          <span>Tiến độ và bảng xếp hạng được lưu trực tiếp trên trình duyệt</span>
        </div>
      </footer>
    </div>
  );
}
