import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import DebugInfo from "./components/DebugInfo";
import Index from "./pages/Index";
import SekapurSirih from "./pages/SekapurSirih";
import PengantarBundaPaud from "./pages/PengantarBundaPaud";
import VisiMisi from "./pages/VisiMisi";
import AturanTerbaru from "./pages/AturanTerbaru";
import StrukturOrganisasi from "./pages/StrukturOrganisasi";
import LokasiSekretariat from "./pages/LokasiSekretariat";
import DataPaud from "./pages/DataPaud";
import GaleriDokumentasi from "./pages/GaleriDokumentasi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

// Enhanced basename detection for Plesk deployments
const getBasename = () => {
  // For local development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔍 Development mode - using root basename');
    return '/';
  }
  
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  
  // Enhanced Plesk detection
  if (path.includes('/public_html/')) {
    const baseName = path.split('/public_html/')[1].split('/')[0] || '';
    console.log('🔍 Plesk public_html detected, basename:', baseName);
    return baseName ? `/${baseName}` : '/';
  }
  
  // Check for subdirectory deployment (common in shared hosting)
  if (segments.length > 0 && !['index.html', 'app', 'health.html', 'verify.html'].includes(segments[0])) {
    console.log('🔍 Subdirectory deployment detected:', segments[0]);
    return `/${segments[0]}`;
  }
  
  console.log('🔍 Using root basename for:', window.location.href);
  return '/';
};

const App = () => {
  // Enhanced debugging
  console.log('🚀 BUNDA PAUD App Starting...', {
    timestamp: new Date().toISOString(),
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    href: window.location.href,
    basename: getBasename(),
    userAgent: navigator.userAgent,
    nodeEnv: process.env.NODE_ENV
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={getBasename()}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sekapur-sirih" element={<SekapurSirih />} />
              <Route path="/pengantar" element={<PengantarBundaPaud />} />
              <Route path="/visi-misi" element={<VisiMisi />} />
              <Route path="/aturan" element={<AturanTerbaru />} />
              <Route path="/struktur" element={<StrukturOrganisasi />} />
              <Route path="/lokasi" element={<LokasiSekretariat />} />
              <Route path="/data" element={<DataPaud />} />
              <Route path="/galeri" element={<GaleriDokumentasi />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <DebugInfo visible={window.location.search.includes('debug')} />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
