import React, { useState, useEffect } from 'react';
import { AnalyticsTick } from '../../types/analytics';
import { CheckCircle2, Cpu, Server, Clock, Database } from 'lucide-react';

interface PipelinePanelProps {
  latest: AnalyticsTick | null;
  roundTripMs: number;
}

interface PipelineStage {
  id: number;
  name: string;
  description: string;
}

const STAGES: PipelineStage[] = [
  { id: 1, name: '1. Ingest', description: 'Read next record from water quality & synthetic level datasets (cyclic cursor).' },
  { id: 2, name: '2. Clean', description: 'Impute missing values with training medians & cast to standard numeric floats.' },
  { id: 3, name: '3. Feature computation', description: 'Compute rate of rise, 7-tick rolling stats, 3-tick trend projection & warnings.' },
  { id: 4, name: '4. Inference', description: 'Predict RandomForest quality score & evaluate CWC flood threshold labels.' },
  { id: 5, name: '5. Anomaly detection', description: 'Calculate z-score baseline (30-tick window) & flag deviation if |z| > 2.0.' },
  { id: 6, name: '6. Alerting', description: 'Log severity change/anomaly events & update live statistical counters.' },
];

export const PipelinePanel: React.FC<PipelinePanelProps> = ({ latest, roundTripMs }) => {
  const [activeStage, setActiveStage] = useState<number>(-1);

  useEffect(() => {
    if (!latest) {
      setActiveStage(-1);
      return;
    }

    // Light up stages sequentially ~120ms apart on each new tick
    let current = 0;
    setActiveStage(0);

    const interval = setInterval(() => {
      current += 1;
      if (current < STAGES.length) {
        setActiveStage(current);
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [latest?.tick]);

  const recordCount = latest !== null ? latest.tick + 1 : 0;
  const serverMs = latest?.processing_ms ?? 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#3DA5C4]" />
            <h3 className="text-lg font-bold text-slate-800">Streaming Pipeline Stages</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-[#3DA5C4] rounded-full border border-sky-200">
            Backend Execution Engine
          </span>
        </div>

        {/* 6 Vertical Stages */}
        <div className="space-y-2.5">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= activeStage;
            const isCurrent = idx === activeStage;

            return (
              <div
                key={stage.id}
                className={`p-3 rounded-lg border transition-all duration-200 flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-sky-50/80 border-[#3DA5C4] shadow-sm'
                    : isCompleted
                    ? 'bg-slate-50/60 border-slate-200'
                    : 'bg-white border-slate-100 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <CheckCircle2
                    className={`w-4 h-4 transition-colors ${
                      isCompleted ? 'text-[#3DA5C4]' : 'text-slate-300'
                    }`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCompleted ? 'text-slate-800' : 'text-slate-500'
                      }`}
                    >
                      {stage.name}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-extrabold text-[#3DA5C4] bg-white px-1.5 py-0.5 rounded border border-sky-200 animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Database className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">Processed</span>
          </div>
          <span className="text-sm font-extrabold text-slate-800">{recordCount}</span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Server className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">Server Latency</span>
          </div>
          <span className="text-sm font-extrabold text-slate-800">{serverMs} ms</span>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">Round Trip</span>
          </div>
          <span className="text-sm font-extrabold text-slate-800">{roundTripMs} ms</span>
        </div>
      </div>
    </div>
  );
};
