import React from 'react';
import { Waves, TrendingUp, TrendingDown, CloudRain, Activity, AlertTriangle } from 'lucide-react';
import { AnalyticsTick } from '../../types/analytics';

interface KpiCardsProps {
  latest: AnalyticsTick | null;
}

const RISK_BADGE_CLASSES: Record<string, string> = {
  normal: 'bg-green-100 text-green-800 border-green-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  danger: 'bg-red-100 text-red-800 border-red-300',
};

const TREND_BADGE_CLASSES: Record<string, string> = {
  improving: 'bg-green-50 text-green-700 border-green-200',
  declining: 'bg-red-50 text-red-700 border-red-200',
  stable: 'bg-slate-50 text-slate-700 border-slate-200',
};

export const KpiCards: React.FC<KpiCardsProps> = ({ latest }) => {
  const flood = latest?.flood;
  const quality = latest?.quality;
  const counters = latest?.counters;

  const riskLabel = flood?.risk_label || 'normal';
  const riskClass = RISK_BADGE_CLASSES[riskLabel] || RISK_BADGE_CLASSES.normal;

  const trend = quality?.trend || 'stable';
  const trendClass = TREND_BADGE_CLASSES[trend] || TREND_BADGE_CLASSES.stable;

  const rateOfRise = flood?.rate_of_rise ?? 0;
  const isRising = rateOfRise > 0;
  const isFalling = rateOfRise < 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* 1. Water Level (m) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Water Level</span>
          <div className="p-2 bg-sky-50 text-[#3DA5C4] rounded-lg">
            <Waves className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {flood ? flood.water_level_m.toFixed(2) : '--'}
            </span>
            <span className="text-sm font-semibold text-slate-500">m</span>
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${riskClass}`}
            >
              {riskLabel} risk
            </span>
          </div>
        </div>
      </div>

      {/* 2. Rate of Rise (m/tick) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rate of Rise</span>
          <div className={`p-2 rounded-lg ${isRising ? 'bg-amber-50 text-amber-600' : isFalling ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
            {isRising ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">
              {flood ? (rateOfRise > 0 ? `+${rateOfRise.toFixed(2)}` : rateOfRise.toFixed(2)) : '--'}
            </span>
            <span className="text-xs font-semibold text-slate-500">m/tick</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-medium">
            {isRising ? (
              <span className="text-amber-600 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> Rising
              </span>
            ) : isFalling ? (
              <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> Receding
              </span>
            ) : (
              <span className="text-slate-500">Steady</span>
            )}
          </p>
        </div>
      </div>

      {/* 3. 7-Tick Rainfall (mm) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">7-Tick Rainfall</span>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <CloudRain className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">
              {flood ? flood.rain_total_window.toFixed(1) : '--'}
            </span>
            <span className="text-sm font-semibold text-slate-500">mm</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            Current tick: <span className="font-bold text-slate-700">{flood ? flood.rainfall_mm.toFixed(1) : '0.0'} mm</span>
          </p>
        </div>
      </div>

      {/* 4. Quality Score */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality Score</span>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {quality ? quality.score.toFixed(1) : '--'}
            </span>
            <span className="text-xs font-semibold text-slate-400">/ 100</span>
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${trendClass}`}
            >
              Trend: {trend}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Anomalies Detected */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Anomalies</span>
          <div className={`p-2 rounded-lg ${(counters?.anomalies ?? 0) > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {counters ? counters.anomalies : '--'}
            </span>
            <span className="text-xs font-medium text-slate-500">events</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            z-score limit: <span className="font-bold text-slate-700">|z| &gt; 2.0</span>
          </p>
        </div>
      </div>
    </div>
  );
};
