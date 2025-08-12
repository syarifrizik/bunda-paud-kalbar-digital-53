import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Global script cache to avoid reloading
let tableauScriptLoaded = false;
let tableauLoadPromise: Promise<void> | null = null;

interface TableauDashboardProps {
  onLoadingChange: (loading: boolean) => void;
}

export const TableauDashboard = ({ onLoadingChange }: TableauDashboardProps) => {
  const vizRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  // Optimized Tableau API loading
  const loadTableauAPI = async (): Promise<void> => {
    if (tableauScriptLoaded) {
      return Promise.resolve();
    }

    if (tableauLoadPromise) {
      return tableauLoadPromise;
    }

    tableauLoadPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      script.async = true;
      script.onload = () => {
        tableauScriptLoaded = true;
        resolve();
      };
      script.onerror = () => {
        tableauLoadPromise = null;
        reject(new Error('Failed to load Tableau API'));
      };
      document.head.appendChild(script);
    });

    return tableauLoadPromise;
  };

  // Fast Tableau initialization with intersection observer
  const initializeTableau = async () => {
    if (!vizRef.current || !isVisible) return;

    setIsInitializing(true);
    onLoadingChange(true);
    setError(null);

    try {
      await loadTableauAPI();
      
      const vizId = 'viz1754860612734';
      
      // Use exact embed code from user
      vizRef.current.innerHTML = `
        <div class='tableauPlaceholder' id='${vizId}' style='position: relative'>
          <noscript>
            <a href='#'>
              <img alt='Home' src='https://public.tableau.com/static/images/Pr/ProfilingPAUDdiIndonesia/Home/1_rss.png' style='border: none' />
            </a>
          </noscript>
          <object class='tableauViz' style='display:none;'>
            <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
            <param name='embed_code_version' value='3' />
            <param name='site_root' value='' />
            <param name='name' value='ProfilingPAUDdiIndonesia/Home' />
            <param name='tabs' value='no' />
            <param name='toolbar' value='yes' />
            <param name='static_image' value='https://public.tableau.com/static/images/Pr/ProfilingPAUDdiIndonesia/Home/1.png' />
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='yes' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
            <param name='language' value='en-US' />
          </object>
        </div>
      `;

      // Exact responsive sizing from user's embed code
      const script = document.createElement('script');
      script.innerHTML = `
        var divElement = document.getElementById('${vizId}');
        var vizElement = divElement.getElementsByTagName('object')[0];
        if (divElement.offsetWidth > 800) { 
          vizElement.style.width='1500px';
          vizElement.style.height='1177px';
        } else if (divElement.offsetWidth > 500) { 
          vizElement.style.width='1500px';
          vizElement.style.height='1177px';
        } else { 
          vizElement.style.width='100%';
          vizElement.style.height='3727px';
        }
        var scriptElement = document.createElement('script');
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
      `;
      
      vizRef.current.appendChild(script);
      
      // Faster loading detection
      setTimeout(() => {
        setIsInitializing(false);
        onLoadingChange(false);
        toast({
          title: "Dashboard siap",
          description: "Data PAUD berhasil dimuat.",
        });
      }, 1500);
      
    } catch (err) {
      setError('Gagal memuat dashboard Tableau');
      setIsInitializing(false);
      onLoadingChange(false);
      toast({
        title: "Error",
        description: "Gagal memuat dashboard. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

  const refreshDashboard = () => {
    if (vizRef.current) {
      vizRef.current.innerHTML = '';
    }
    setTimeout(() => {
      initializeTableau();
    }, 100);
  };

  // Intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (vizRef.current) {
      observer.observe(vizRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize when visible
  useEffect(() => {
    if (isVisible) {
      initializeTableau();
    }
  }, [isVisible]);

  if (error) {
    return (
      <Alert className="border-destructive/20 bg-destructive/5">
        <AlertDescription className="text-destructive-foreground">
          {error}
          <Button 
            onClick={refreshDashboard} 
            variant="outline" 
            size="sm" 
            className="ml-4"
          >
            Coba Lagi
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button 
          onClick={refreshDashboard} 
          variant="outline" 
          className="gap-2 hover-lift transition-all duration-200"
          disabled={isInitializing}
        >
          <RefreshCw className={`w-4 h-4 ${isInitializing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <Card className="glass-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold gradient-text">
            Dashboard PAUD Kalimantan Barat
          </h2>
          <p className="text-muted-foreground mt-2">
            Klik dan drag untuk berinteraksi dengan visualisasi data
          </p>
        </div>
        
        <div className="relative w-full">
          <div 
            ref={vizRef}
            className="w-full min-h-[400px] md:min-h-[600px] relative transition-all duration-300"
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background-secondary)) 100%)'
            }}
          >
            {/* Loading state */}
            {!isVisible && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground">Mempersiapkan dashboard...</p>
                </div>
              </div>
            )}
            
            {isInitializing && isVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-muted-foreground">Memuat dashboard Tableau...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Mobile Optimization Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:hidden">
            <Alert className="bg-primary/10 border-primary/20">
              <AlertDescription className="text-xs">
                💡 Putar perangkat ke landscape untuk pengalaman optimal
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </Card>
    </div>
  );
};