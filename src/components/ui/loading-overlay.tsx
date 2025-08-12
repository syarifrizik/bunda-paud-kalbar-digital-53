
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
  variant?: 'overlay' | 'inline';
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = "Memuat data...",
  className,
  variant = 'overlay'
}: LoadingOverlayProps) {
  if (variant === 'inline') {
    return (
      <div className={cn("space-y-6", className)}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
              <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-primary/40"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="font-medium text-foreground">{message}</h3>
              <p className="text-sm text-muted-foreground">Harap tunggu sebentar...</p>
            </div>
          </div>
        ) : children}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-transparent rounded-full animate-ping border-t-primary/40"></div>
            </div>
            <div className="text-center space-y-1">
              <p className="font-medium text-foreground">{message}</p>
              <p className="text-xs text-muted-foreground">Sedang memproses...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Skeleton components for charts and stats
export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
      <div className="h-64 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer"></div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer mx-auto"></div>
      <div className="h-6 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer mx-auto"></div>
      <div className="h-4 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer mx-auto"></div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
        ))}
      </div>
    </div>
  );
}
