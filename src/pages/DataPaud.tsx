import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Database, AlertTriangle, Table, PieChart, FileSpreadsheet } from "lucide-react";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { SpreadsheetViewer } from "@/components/SpreadsheetViewer";
import { DataCharts } from "@/components/DataCharts";
import { LoadingOverlay, ChartSkeleton } from "@/components/ui/loading-overlay";
import { TableauDashboard } from "@/components/TableauDashboard";

const DataPaud = () => {
  const [isTableauLoading, setIsTableauLoading] = useState(true);
  
  // Google Sheets integration
  const { sheetsData, isLoading: sheetsLoading, error: sheetsError, refreshData } = useGoogleSheets([]);
  const [activeTab, setActiveTab] = useState("charts");

  return (
    <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="outline" className="text-sm px-4 py-2 glass border-primary/20">
                Dashboard Interaktif
              </Badge>
              {/* Compact Status Indicator */}
              <Badge variant="outline" className="text-sm px-3 py-1 bg-primary/10 border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></div>
                Sinkronisasi Aktif
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
              Profiling PAUD Indonesia
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Eksplorasi data komprehensif PAUD di Kalimantan Barat dengan visualisasi interaktif dan analisis mendalam.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {sheetsError && (
              <Alert className="mb-8 border-destructive/20 bg-destructive/5 animate-fade-in">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-destructive-foreground">
                  {sheetsError}
                </AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
                <TabsTrigger value="charts" className="gap-2 transition-all duration-200">
                  <PieChart className="w-4 h-4" />
                  Grafik
                </TabsTrigger>
                <TabsTrigger value="dashboard" className="gap-2 transition-all duration-200">
                  <BarChart3 className="w-4 h-4" />
                  Tableau
                </TabsTrigger>
                <TabsTrigger value="spreadsheets" className="gap-2 transition-all duration-200">
                  <FileSpreadsheet className="w-4 h-4" />
                  Spreadsheet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="charts" className="animate-fade-in">
                <DataCharts sheetsData={sheetsData} isLoading={sheetsLoading} />
              </TabsContent>

              <TabsContent value="dashboard" className="animate-fade-in">
                <LoadingOverlay isLoading={isTableauLoading} variant="inline" message="Memuat dashboard Tableau">
                  <TableauDashboard onLoadingChange={setIsTableauLoading} />
                </LoadingOverlay>
              </TabsContent>

              <TabsContent value="spreadsheets" className="animate-fade-in">
                <SpreadsheetViewer 
                  sheetsData={sheetsData} 
                  onRefresh={refreshData}
                  isLoading={sheetsLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataPaud;
