import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { AnalyticsTick } from '../../types/analytics';
import { Activity, AlertCircle } from 'lucide-react';

interface QualityChartProps {
  history: AnalyticsTick[];
  latest: AnalyticsTick | null;
}

export const QualityChart: React.FC<QualityChartProps> = ({ history, latest }) => {
  const chartData = history.map((t) => ({
    tick: t.tick,
    date: t.quality.date,
    score: t.quality.score,
    rollingMean: t.quality.rolling_mean,
    zScore: t.quality.z_score,
    anomaly: t.quality.anomaly,
  }));

  const quality = latest?.quality;
  const readings = quality?.readings || {};

  const renderQualityDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || !payload) return null;
    if (payload.anomaly) {
      return (
        <circle
          key={`dot-anomaly-${payload.tick}`}
          cx={cx}
          cy={cy}
          r={6}
          fill="#ef4444"
          stroke="#ffffff"
          strokeWidth={2}
          className="animate-pulse"
        />
      );
    }
    return (
      <circle
        key={`dot-normal-${payload.tick}`}
        cx={cx}
        cy={cy}
        r={2.5}
        fill="#10b981"
      />
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-800">Water Quality Score & Anomaly Tracking</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            CPCB Ganga monitoring &bull; Station record date: <span className="font-semibold text-slate-700">{quality?.date || 'N/A'}</span>
          </p>
        </div>

        {/* Latest Readings Summary */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 p-2 rounded-lg">
          <span>Temp: <strong className="text-slate-800">{readings.temperature_c ?? '--'}°C</strong></span>
          <span>&bull;</span>
          <span>EC: <strong className="text-slate-800">{readings.electric_conductivity_s_cm ?? '--'} µS/cm</strong></span>
          <span>&bull;</span>
          <span>TS: <strong className="text-slate-800">{readings.total_solids_mg_l ?? '--'} mg/L</strong></span>
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
            <LineChart data={chartData} margin={{ top: 15, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="tick"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                tickFormatter={(val) => `t:${val}`}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#059669"
                tick={{ fontSize: 11 }}
                width={40}
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
                formatter={(value: any, name: any, item: any) => {
                  if (name === 'Quality Score') {
                    const anomalyText = item.payload.anomaly ? ' (ANOMALY DETECTED)' : '';
                    return [`${value}${anomalyText}`, name];
                  }
                  return [value, name];
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />

              {/* Rolling Mean Line */}
              <Line
                type="monotone"
                dataKey="rollingMean"
                name="30-Tick Rolling Mean"
                stroke="#94a3b8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={false}
              />

              {/* Quality Score Line with Custom Anomaly Dots */}
              <Line
                type="monotone"
                dataKey="score"
                name="Quality Score"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={renderQualityDot}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend footnote */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          <span>Red dot indicates quality score anomaly (|z| &gt; 2.0 against 30-tick rolling baseline)</span>
        </div>
        <div>
          <span>z-score: <strong className="text-slate-700">{quality ? quality.z_score.toFixed(2) : '0.00'}</strong></span>
        </div>
      </div>
    </div>
  );
};
