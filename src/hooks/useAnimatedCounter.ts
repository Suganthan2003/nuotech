import { useState, useEffect } from 'react';

export function useAnimatedCounter(
  targetValue: number,
  shouldAnimate: boolean,
  duration = 1400
): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let rafId = 0;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * targetValue));

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [targetValue, shouldAnimate, duration]);

  return count;
}
