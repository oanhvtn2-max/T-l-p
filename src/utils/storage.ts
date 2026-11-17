import { GradeLevel, LeaderboardEntry, StudentSession } from '../types/gdcd';

const SESSION_KEY = 'gdcd_tu_lap_session_v1';
const LEADERBOARD_KEY = 'gdcd_tu_lap_leaderboard_v1';
const MUTE_KEY = 'gdcd_tu_lap_muted_v1';

export function createFreshSession(name: string, grade: GradeLevel): StudentSession {
  return {
    name: name.trim(),
    grade,
    answers: {},
    score: 0,
    unlockedUpTo: 1,
    completedAt: null,
  };
}

export function loadSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StudentSession;
    if (!parsed || typeof parsed.name !== 'string' || !parsed.name.trim()) {
      return null;
    }
    return {
      name: parsed.name,
      grade: (['6', '7', '8', '9'].includes(parsed.grade) ? parsed.grade : '6') as GradeLevel,
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      score: typeof parsed.score === 'number' ? parsed.score : 0,
      unlockedUpTo: typeof parsed.unlockedUpTo === 'number' ? parsed.unlockedUpTo : 1,
      completedAt: parsed.completedAt ?? null,
    };
  } catch {
    return null;
  }
}

export function saveSession(session: StudentSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is LeaderboardEntry =>
          item &&
          typeof item.name === 'string' &&
          typeof item.score === 'number' &&
          typeof item.date === 'string'
      )
      .sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}

export function saveLeaderboardScore(entry: Omit<LeaderboardEntry, 'id'>): LeaderboardEntry[] {
  const existing = loadLeaderboard();
  const nextEntry: LeaderboardEntry = {
    ...entry,
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  };
  const updated = [...existing, nextEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
  return updated;
}

export function clearLeaderboard(): void {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function loadMuted(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function saveMuted(muted: boolean): void {
  try {
    localStorage.setItem(MUTE_KEY, String(muted));
  } catch {
    // Ignore storage errors
  }
}

export function formatVietnamDate(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return date.toLocaleDateString('vi-VN');
  }
}
