import './MetricCallout.css';

export interface MetricCalloutProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricCallout({ value, label, className = '' }: MetricCalloutProps) {
  return (
    <div className={`metric-callout glow-active ${className}`}>
      <div className="metric-callout__value">{value}</div>
      <div className="metric-callout__label">{label}</div>
    </div>
  );
}
