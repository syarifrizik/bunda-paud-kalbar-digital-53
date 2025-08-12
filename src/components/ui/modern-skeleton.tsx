
import { cn } from "@/lib/utils"

interface ModernSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'chart' | 'table';
  shimmer?: boolean;
}

function ModernSkeleton({ 
  className, 
  variant = 'default',
  shimmer = true,
  ...props 
}: ModernSkeletonProps) {
  const baseClasses = "animate-pulse rounded-md bg-muted";
  const shimmerClasses = shimmer ? "shimmer" : "";
  
  const variantClasses = {
    default: "",
    card: "h-32 w-full",
    chart: "h-64 w-full",
    table: "h-6 w-full"
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        shimmerClasses,
        className
      )}
      {...props}
    />
  )
}

// Specific skeleton components for different use cases
function ChartSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <ModernSkeleton className="h-6 w-48" />
        <ModernSkeleton className="h-8 w-20" />
      </div>
      <ModernSkeleton variant="chart" />
      <div className="grid grid-cols-3 gap-4">
        <ModernSkeleton className="h-8" />
        <ModernSkeleton className="h-8" />
        <ModernSkeleton className="h-8" />
      </div>
    </div>
  )
}

function TableSkeleton({ rows = 5, columns = 4, ...props }: { rows?: number; columns?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-3" {...props}>
      {/* Table header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <ModernSkeleton key={i} className="h-8" />
        ))}
      </div>
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <ModernSkeleton key={colIndex} variant="table" />
          ))}
        </div>
      ))}
    </div>
  )
}

function StatCardSkeleton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="space-y-3" {...props}>
      <div className="flex items-center gap-3">
        <ModernSkeleton className="w-12 h-12 rounded-2xl" />
        <ModernSkeleton className="h-4 w-16" />
      </div>
      <ModernSkeleton className="h-8 w-20" />
      <ModernSkeleton className="h-4 w-32" />
      <ModernSkeleton className="h-3 w-24" />
    </div>
  )
}

export { ModernSkeleton, ChartSkeleton, TableSkeleton, StatCardSkeleton }
