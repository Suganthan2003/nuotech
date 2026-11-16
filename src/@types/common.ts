export interface CommonProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavLinkItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
}
