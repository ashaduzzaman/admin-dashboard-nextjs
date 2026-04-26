export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon?: string;
  chart?: boolean;
}

export interface AlertItem {
  id: string;
  type: "critical" | "info" | "log";
  title: string;
  message: string;
  timestamp: string;
}

export interface APIKey {
  id: string;
  name: string;
  secret: string;
  created: string;
  revealed?: boolean;
}
