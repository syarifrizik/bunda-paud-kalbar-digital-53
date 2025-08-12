import React from 'react';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string, props: any) => [string, string];
  labelFormatter?: (label: string, payload?: any[]) => string;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  const formattedValue = formatter ? formatter(data.value, data.name || data.dataKey, data) : [`${data.value}`, data.name || data.dataKey];
  const formattedLabel = labelFormatter ? labelFormatter(label || '', payload) : label;

  return (
    <div className="bg-card border-2 border-border rounded-xl shadow-lg backdrop-blur-sm p-3 min-w-[150px]">
      <div className="space-y-1">
        {formattedLabel && (
          <p className="text-sm font-medium text-foreground border-b border-border/50 pb-1">
            {formattedLabel}
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">
            {formattedValue[1]}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {formattedValue[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

// Style object for recharts Tooltip component
export const getTooltipStyle = () => ({
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0',
  boxShadow: 'none',
  padding: '0'
});