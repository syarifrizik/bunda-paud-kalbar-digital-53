import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

// Get base path for routing in different environments
const getBasename = () => {
  // For Plesk or subdirectory deployments
  const path = window.location.pathname;
  if (path.includes('/public_html/')) {
    return path.split('/public_html/')[1].split('/')[0] || '';
  }
  return '';
};

const App = () => (
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
