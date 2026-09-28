import React, { useState } from 'react';
import { useAnalyticsStream } from '../hooks/useAnalyticsStream';
import { KpiCards } from '../components/analytics/KpiCard';
import { LevelChart } from '../components/analytics/LevelChart';
import { QualityChart } from '../components/analytics/QualityChart';
import { PipelinePanel } from '../components/analytics/PipelinePanel';
import { EventFeed } from '../components/analytics/EventFeed';
import { ProvenanceNote } from '../components/analytics/ProvenanceNote';
import {
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  RefreshCw,
  Clock,
  Activity,
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [paused, setPaused] = useState<boolean>(false);
  const [intervalMs, setIntervalMs] = useState<number>(3000);

  const { latest, history, roundTripMs, error, reset, refetch } = useAnalyticsStream(
    intervalMs,
    paused
  );

  return (
    <div className="min-h-screen bg-slate-50/60 pt-28 md:pt-32 pb-20 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header Row */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                River Analytics & Digital Twin
              </h1>

              {/* Status Pill */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  paused
                    ? 'bg-slate-100 text-slate-600 border-slate-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}
              >
                {paused ? (
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                ) : (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                )}
                <span>Simulated live stream{paused ? ' (Paused)' : ''}</span>
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              Real-time streaming analysis of Ganga river flood risk & water quality at Haridwar / Rishikesh
            </p>
          </div>

          {/* Controls & Speed Select */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tick Counter */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <Activity className="w-3.5 h-3.5 text-[#3DA5C4]" />
              <span>Tick #{latest ? latest.tick : 0}</span>
            </div>

            {/* Pause / Resume Button */}
            <button
              onClick={() => setPaused(!paused)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                paused
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {paused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Resume
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" /> Pause
                </>
              )}
            </button>

            {/* Speed Select */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-slate-400 ml-2" />
              <select
                value={intervalMs}
                onChange={(e) => setIntervalMs(Number(e.target.value))}
                className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none pr-2 py-1 cursor-pointer"
              >
                <option value={1000}>1s speed</option>
                <option value={3000}>3s speed</option>
                <option value={5000}>5s speed</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" /> Reset
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4 text-red-800 text-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <strong className="font-bold">Stream connection error:</strong> {error}. Ensure Flask backend is running on port 5001.
              </div>
            </div>
            <button
              onClick={refetch}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* KPI Cards Row (5 Cards) */}
        <KpiCards latest={latest} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LevelChart history={history} latest={latest} />
          <QualityChart history={history} latest={latest} />
        </div>

        {/* Bottom Row: Pipeline & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <PipelinePanel latest={latest} roundTripMs={roundTripMs} />
          <EventFeed events={latest?.events || []} />
        </div>

        {/* Footer: Provenance Note */}
        <ProvenanceNote />

      </div>
    </div>
  );
};

export default Analytics;
