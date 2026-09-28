import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { AnalyticsTick } from '../../types/analytics';
import { Waves, AlertTriangle } from 'lucide-react';

interface LevelChartProps {
  history: AnalyticsTick[];
  latest: AnalyticsTick | null;
}

export const LevelChart: React.FC<LevelChartProps> = ({ history, latest }) => {
  const chartData = history.map((t) => ({
    tick: t.tick,
    date: t.flood.date,
    level: t.flood.water_level_m,
    rollingMean: t.flood.rolling_mean_level,
    rainfall: t.flood.rainfall_mm,
  }));

  const flood = latest?.flood;
  const proj3 = flood?.projected_level_3;
  const ticksToWarn = flood?.ticks_to_warning;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-[#3DA5C4]" />
            <h3 className="text-lg font-bold text-slate-800">Flood Risk & Water Level</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            CWC Haridwar station monitoring &bull; Record date: <span className="font-semibold text-slate-700">{flood?.date || 'N/A'}</span>
          </p>
        </div>

        {/* Projections & Warnings */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700">
            Projected (+3 ticks):{' '}
            <span className="font-bold text-[#3DA5C4]">
              {proj3 !== null && proj3 !== undefined ? `${proj3.toFixed(2)} m` : 'N/A'}
            </span>
          </div>
          {ticksToWarn !== null && ticksToWarn !== undefined && (
            <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-800 flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>~{ticksToWarn} ticks to warning</span>
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-72 w-full">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm italic border border-dashed border-slate-200 rounded-lg">
            Waiting for stream data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="tick"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `t:${val}`}
              />
              <YAxis
                yAxisId="level"
                domain={[291, 295]}
                stroke="#0284c7"
                tick={{ fontSize: 11 }}
                unit="m"
                width={50}
              />
              <YAxis
                yAxisId="rain"
                orientation="right"
                domain={[0, 60]}
                stroke="#94a3b8"
                tick={{ fontSize: 11 }}
                unit="mm"
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  color: '#f8fafc',
                  fontSize: '0.75rem',
                  padding: '8px 12px',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelFormatter={(label) => `Tick ${label}`}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />

              {/* Reference Lines for Warning & Danger */}
              <ReferenceLine
                yAxisId="level"
                y={293.0}
                stroke="#eab308"
                strokeDasharray="4 4"
                label={{ value: 'Warning (293m)', fill: '#ca8a04', fontSize: 11, position: 'insideTopLeft' }}
              />
              <ReferenceLine
                yAxisId="level"
                y={294.0}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{ value: 'Danger (294m)', fill: '#dc2626', fontSize: 11, position: 'insideTopLeft' }}
              />

              {/* Rainfall Bars */}
              <Bar
                yAxisId="rain"
                dataKey="rainfall"
                name="Rainfall (mm)"
                fill="#cbd5e1"
                opacity={0.6}
                barSize={12}
                isAnimationActive={false}
              />

              {/* Rolling Mean */}
              <Line
                yAxisId="level"
                type="monotone"
                dataKey="rollingMean"
                name="7-Tick Mean Level"
                stroke="#64748b"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />

              {/* Water Level Line */}
              <Line
                yAxisId="level"
                type="monotone"
                dataKey="level"
                name="Water Level (m)"
                stroke="#0284c7"
                strokeWidth={2.5}
                dot={{ r: 2, fill: '#0284c7' }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
