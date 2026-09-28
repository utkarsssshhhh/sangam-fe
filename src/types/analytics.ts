export interface FloodStats {
  date: string;
  water_level_m: number;
  rainfall_mm: number;
  risk_label: 'normal' | 'warning' | 'danger' | string;
  rate_of_rise: number;
  rolling_mean_level: number;
  rolling_max_level: number;
  rain_total_window: number;
  projected_level_3: number | null;
  ticks_to_warning: number | null;
}

export interface QualityStats {
  date: string;
  score: number;
  rolling_mean: number;
  z_score: number;
  anomaly: boolean;
  trend: 'improving' | 'declining' | 'stable' | string;
  readings: Record<string, number>;
}

export interface AnalyticsCounters {
  normal: number;
  warning: number;
  danger: number;
  anomalies: number;
}

export interface AnalyticsEvent {
  tick: number;
  type: 'risk_change' | 'quality_anomaly' | string;
  severity: 'normal' | 'warning' | 'danger' | string;
  message: string;
}

export interface AnalyticsTick {
  tick: number;
  processing_ms: number;
  flood: FloodStats;
  quality: QualityStats;
  counters: AnalyticsCounters;
  events: AnalyticsEvent[];
}
