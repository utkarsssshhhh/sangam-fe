import React from 'react';
import { AnalyticsEvent } from '../../types/analytics';
import { Bell, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface EventFeedProps {
  events: AnalyticsEvent[];
}

const SEVERITY_BADGE_CLASSES: Record<string, string> = {
  normal: 'bg-green-100 text-green-800 border-green-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  danger: 'bg-red-100 text-red-800 border-red-300',
};

const SEVERITY_BORDER_CLASSES: Record<string, string> = {
  normal: 'border-l-4 border-l-green-500',
  warning: 'border-l-4 border-l-yellow-500',
  danger: 'border-l-4 border-l-red-500',
};

export const EventFeed: React.FC<EventFeedProps> = ({ events }) => {
  const displayEvents = events.slice(0, 15);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-800">Alert & Event Feed</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
            Latest {displayEvents.length} Events
          </span>
        </div>

        {/* List of Events */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {displayEvents.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-center">
              <CheckCircle2 className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-sm font-medium">No alerts or anomalies detected yet</p>
              <p className="text-xs text-slate-400 mt-1">Events trigger on risk state changes or z-score spikes</p>
            </div>
          ) : (
            displayEvents.map((evt, idx) => {
              const severity = evt.severity || 'normal';
              const badgeClass = SEVERITY_BADGE_CLASSES[severity] || SEVERITY_BADGE_CLASSES.normal;
              const borderClass = SEVERITY_BORDER_CLASSES[severity] || SEVERITY_BORDER_CLASSES.normal;

              return (
                <div
                  key={`${evt.tick}-${idx}`}
                  className={`p-3 bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-xs transition-all ${borderClass}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {severity === 'danger' ? (
                        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      ) : severity === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      )}
                      <span className="text-xs font-extrabold text-slate-800">
                        Tick #{evt.tick}
                      </span>
                    </div>

                    <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                      {severity}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium pl-6">
                    {evt.message}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Auto-appends on threshold or quality anomaly changes</span>
        <span>Max buffer: 15 events</span>
      </div>
    </div>
  );
};
