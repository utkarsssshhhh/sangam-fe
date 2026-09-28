import React from 'react';
import { Info, Database, ShieldCheck, AlertCircle } from 'lucide-react';

export const ProvenanceNote: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-200 rounded-xl p-6 shadow-lg border border-slate-800">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-[#3DA5C4]" />
        <h4 className="text-base font-bold text-white">Data Provenance & Model Audit</h4>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        Stream is a replay of historical CPCB water quality and rainfall records. Water level is simulated from rainfall and calibrated to official CWC Haridwar thresholds. Quality score is a model estimate (R² 0.33 on a small test set).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {/* Item 1 */}
        <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-200">Water Quality Readings</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Real Historical
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            CPCB manual monitoring, Ganga at Haridwar D/S and Rishikesh U/S (1961–2025). Replayed row-by-row.
          </p>
        </div>

        {/* Item 2 */}
        <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-200">Rainfall Telemetry</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              Real Historical
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Uttarakhand telemetry, Bahadarabad station; hourly daily aggregates.
          </p>
        </div>

        {/* Item 3 */}
        <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-200">Flood Thresholds</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
              Official CWC
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            CWC Haridwar: Warning 293.0 m, Danger 294.0 m, HFL 296.3 m.
          </p>
        </div>

        {/* Item 4 */}
        <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-200">River Water Level</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Simulated Signal
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Generated from real rainfall with decay model calibrated to CWC warning/danger marks.
          </p>
        </div>

        {/* Item 5 */}
        <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-200">Water Quality Score</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              Model Inference
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            RandomForest model predicting score from 5 physical sensor readings (Test MAE 3.49, R² 0.33).
          </p>
        </div>

        {/* Item 6 */}
        <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-200">Stream Timing</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              Simulated Feed
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Cyclic replay interval (configurable 1s / 3s / 5s) simulating real-time sensor stream.
          </p>
        </div>
      </div>
    </div>
  );
};
