// Pure Web Audio API sound effects — no external audio files required

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  startTimeOffset: number,
  duration: number,
  type: OscillatorType = 'sine',
  peakGain = 0.14
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startTimeOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClickSound(muted: boolean): void {
  if (muted) return;
  try {
    playTone(540, 0, 0.06, 'triangle', 0.07);
  } catch {
    // Ignore audio errors on restricted devices
  }
}

export function playCorrectSound(muted: boolean): void {
  if (muted) return;
  try {
    // Bright C-major ascending chime
    playTone(523.25, 0, 0.14, 'triangle', 0.14); // C5
    playTone(659.25, 0.09, 0.14, 'triangle', 0.14); // E5
    playTone(783.99, 0.18, 0.18, 'triangle', 0.15); // G5
    playTone(1046.5, 0.27, 0.32, 'sine', 0.16); // C6
  } catch {
    // Ignore audio errors
  }
}

export function playWrongSound(muted: boolean): void {
  if (muted) return;
  try {
    // Gentle non-harsh descending double tone
    playTone(329.63, 0, 0.16, 'sine', 0.12); // E4
    playTone(261.63, 0.14, 0.28, 'sine', 0.12); // C4
  } catch {
    // Ignore audio errors
  }
}

export function playCompleteSound(muted: boolean): void {
  if (muted) return;
  try {
    // Joyful mission-complete fanfare
    playTone(523.25, 0, 0.12, 'triangle', 0.13); // C5
    playTone(659.25, 0.1, 0.12, 'triangle', 0.13); // E5
    playTone(783.99, 0.2, 0.12, 'triangle', 0.14); // G5
    playTone(1046.5, 0.32, 0.22, 'triangle', 0.16); // C6
    playTone(783.99, 0.5, 0.12, 'triangle', 0.12); // G5
    playTone(1046.5, 0.62, 0.45, 'sine', 0.18); // C6 hold
  } catch {
    // Ignore audio errors
  }
}
