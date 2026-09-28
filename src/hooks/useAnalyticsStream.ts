import { useState, useEffect, useCallback } from 'react';
import { API_BASE } from '../config';
import { AnalyticsTick } from '../types/analytics';

export function useAnalyticsStream(intervalMs: number, paused: boolean) {
  const [history, setHistory] = useState<AnalyticsTick[]>([]);
  const [latest, setLatest] = useState<AnalyticsTick | null>(null);
  const [roundTripMs, setRoundTripMs] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchTick = useCallback(async () => {
    const t0 = performance.now();
    try {
      const res = await fetch(`${API_BASE}/api/analytics/tick`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const tick = (await res.json()) as AnalyticsTick;
      setRoundTripMs(Math.round(performance.now() - t0));
      setLatest(tick);
      setHistory(h => [...h, tick].slice(-60));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error connecting to analytics backend');
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    let cancelled = false;

    const run = async () => {
      const t0 = performance.now();
      try {
        const res = await fetch(`${API_BASE}/api/analytics/tick`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const tick = (await res.json()) as AnalyticsTick;
        if (cancelled) return;
        setRoundTripMs(Math.round(performance.now() - t0));
        setLatest(tick);
        setHistory(h => [...h, tick].slice(-60));
        setError(null);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Error connecting to analytics backend');
        }
      }
    };

    run();
    const id = setInterval(run, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs, paused]);

  const reset = async () => {
    try {
      await fetch(`${API_BASE}/api/analytics/reset`, { method: 'POST' });
    } catch (e) {
      console.error('Failed to reset backend stream', e);
    }
    setHistory([]);
    setLatest(null);
    setError(null);
  };

  return { latest, history, roundTripMs, error, reset, refetch: fetchTick };
}
