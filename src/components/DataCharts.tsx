import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SheetData } from "@/hooks/useGoogleSheets";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Camera, TrendingUp, BarChart3, PieChart as PieChartIcon, Download, Users, MapPin, Building } from "lucide-react";
import html2canvas from 'html2canvas';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { ChartTooltip, getTooltipStyle } from "@/components/ui/chart-tooltip";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ChartSkeleton, StatCardSkeleton, LoadingOverlay } from "@/components/ui/loading-overlay";

interface DataChartsProps {
  sheetsData: SheetData[];
  isLoading?: boolean;
}

export const DataCharts = ({ sheetsData, isLoading }: DataChartsProps) => {
  const { toast } = useToast();
  const [animateCharts, setAnimateCharts] = useState(false);
  
  // Find REKAPAN PAUD PERBATASAN sheet
  const rekapanSheet = sheetsData.find(sheet => sheet.name === 'REKAPAN PAUD PERBATASAN');
  
  // Extract kabupaten data for pie chart
  const kabupatenCounts: { [key: string]: number } = {};
  const kecamatanCounts: { [key: string]: number } = {};
  
  if (rekapanSheet && rekapanSheet.data.length > 0) {
    // Find column indices for NAMA KABUPATEN and NAMA KECAMATAN
    const headers = rekapanSheet.data[0];
    const kabupatenIndex = headers.findIndex(header => 
      header && header.toString().toLowerCase().includes('kabupaten')
    );
    const kecamatanIndex = headers.findIndex(header => 
      header && header.toString().toLowerCase().includes('kecamatan')
    );
    
    // Count occurrences for both kabupaten and kecamatan
    rekapanSheet.data.slice(1).forEach(row => {
      if (kabupatenIndex !== -1 && row[kabupatenIndex]) {
        const kabupaten = row[kabupatenIndex].toString().trim();
        kabupatenCounts[kabupaten] = (kabupatenCounts[kabupaten] || 0) + 1;
      }
      
      if (kecamatanIndex !== -1 && row[kecamatanIndex]) {
        const kecamatan = row[kecamatanIndex].toString().trim();
        kecamatanCounts[kecamatan] = (kecamatanCounts[kecamatan] || 0) + 1;
      }
    });
  }

  // Process pie chart data (kabupaten)
  const pieData = Object.entries(kabupatenCounts).map(([name, count]) => ({
    name,
    value: count,
    percentage: Math.round((count / Object.values(kabupatenCounts).reduce((sum, val) => sum + val, 0)) * 100)
  }));

  // Process bar chart data (kecamatan) - sorted by count for better visualization
  const barData = Object.entries(kecamatanCounts)
    .map(([name, count]) => ({
      name: name.length > 15 ? name.substring(0, 12) + '...' : name,
      fullName: name,
      records: count
    }))
    .sort((a, b) => b.records - a.records);

  const totalRecords = Object.values(kabupatenCounts).reduce((sum, count) => sum + count, 0);

  // Enhanced color palette with more vibrant, accessible colors
  const CHART_COLORS = [
    'hsl(var(--chart-1))', 
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-3))', 
    'hsl(var(--chart-4))', 
    'hsl(var(--chart-5))'
  ];

  // Animate charts on mount
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setAnimateCharts(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const takeScreenshot = async (elementId: string, fileName: string) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        toast({
          title: "Error",
          description: "Element tidak ditemukan untuk screenshot",
          variant: "destructive"
        });
        return;
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL();
      link.click();

      toast({
        title: "Berhasil",
        description: `Screenshot ${fileName} berhasil diunduh`,
      });
    } catch (error) {
      console.error('Screenshot error:', error);
      toast({
        title: "Error",
        description: "Gagal mengambil screenshot",
        variant: "destructive"
      });
    }
  };

  // Enhanced loading skeleton with modern animations
  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-3">
            <div className="h-8 w-64 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer"></div>
            <div className="h-4 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
          </div>
          <div className="h-10 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer"></div>
        </div>
        
        {/* Charts Skeletons */}
        <div className="space-y-6">
          {/* Pie Chart Skeleton */}
          <Card className="glass-card p-6">
            <ChartSkeleton />
          </Card>
          
          {/* Bar and Line Charts Skeletons */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="glass-card p-6">
              <ChartSkeleton />
            </Card>
            <Card className="glass-card p-6">
              <ChartSkeleton />
            </Card>
          </div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-card p-4">
                <StatCardSkeleton />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LoadingOverlay isLoading={isLoading} variant="inline">
      <div id="visualization-container" className={`space-y-8 ${animateCharts ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              Visualisasi Data PAUD
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Analisis komprehensif data PAUD Kalimantan Barat
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => takeScreenshot('visualization-container', 'visualisasi-data-paud')}
            className="gap-2 hover-lift"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Screenshot</span>
            <span className="sm:hidden">Screenshot</span>
          </Button>
        </div>

        {/* Enhanced Pie Chart with loading animation */}
        <Card 
          id="pie-chart-container" 
          className={`glass-card p-4 md:p-6 chart-hover transition-all duration-500 ${animateCharts ? 'chart-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                </div>
                Distribusi Data PAUD Wilayah Perbatasan
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Persentase distribusi PAUD
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => takeScreenshot('pie-chart-container', 'paud-kabupaten-perbatasan')}
              className="gap-2 hover-lift"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => window.innerWidth > 640 ? `${name} (${percentage}%)` : `${percentage}%`}
                outerRadius={window.innerWidth > 640 ? 90 : 70}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CHART_COLORS[index % CHART_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                content={<ChartTooltip 
                  formatter={(value, name) => [`${value} lembaga`, 'Jumlah PAUD']}
                  labelFormatter={(label) => `Kabupaten: ${label}`}
                />}
                contentStyle={getTooltipStyle()}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Resizable Charts Section - Desktop Only */}
        <div className="hidden lg:block">
          <ResizablePanelGroup direction="horizontal" className="min-h-[480px] rounded-lg border">
            {/* Enhanced Bar Chart - Resizable Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card 
                id="bar-chart-resizable" 
                className={`glass-card h-full p-4 md:p-6 chart-hover border-0 rounded-r-none transition-all duration-500 ${animateCharts ? 'chart-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10">
                        <BarChart3 className="w-5 h-5 text-secondary" />
                      </div>
                      PAUD per Kecamatan di Wilayah Perbatasan
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Jumlah lembaga per kecamatan di wilayah perbatasan
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => takeScreenshot('bar-chart-resizable', 'paud-kecamatan-perbatasan')}
                    className="gap-2 hover-lift"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={barData} margin={{ bottom: 90, left: 15, right: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                      tick={{ 
                        fill: 'hsl(var(--muted-foreground))', 
                        fontSize: 12,
                        fontWeight: 400
                      }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      width={65}
                      tick={{ 
                        fill: 'hsl(var(--muted-foreground))', 
                        fontSize: 12,
                        fontWeight: 400
                      }}
                    />
                    <Tooltip 
                      content={<ChartTooltip 
                        formatter={(value, name, props) => [`${value} lembaga`, 'Jumlah PAUD']}
                        labelFormatter={(label, payload) => {
                          const item = barData.find(d => d.name === label);
                          return `Kecamatan: ${item?.fullName || label}`;
                        }}
                      />}
                      contentStyle={getTooltipStyle()}
                    />
                    <Bar 
                      dataKey="records" 
                      fill="hsl(var(--secondary))"
                      radius={[6, 6, 0, 0]}
                      animationBegin={200}
                      animationDuration={800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Enhanced Line Chart - Resizable Panel */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card 
                id="line-chart-resizable" 
                className={`glass-card h-full p-4 md:p-6 chart-hover border-0 rounded-l-none transition-all duration-500 ${animateCharts ? 'chart-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="space-y-2">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10">
                          <TrendingUp className="w-5 h-5 text-accent" />
                        </div>
                        Tren Distribusi per Kecamatan di Wilayah Perbatasan
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Pola distribusi PAUD per kecamatan di wilayah perbatasan
                      </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => takeScreenshot('line-chart-resizable', 'tren-data-kecamatan')}
                    className="gap-2 hover-lift"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <ResponsiveContainer width="100%" height={360}>
                  <LineChart data={barData} margin={{ bottom: 90, left: 15, right: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                      tick={{ 
                        fill: 'hsl(var(--muted-foreground))', 
                        fontSize: 12,
                        fontWeight: 400
                      }}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      width={65}
                      tick={{ 
                        fill: 'hsl(var(--muted-foreground))', 
                        fontSize: 12,
                        fontWeight: 400
                      }}
                    />
                    <Tooltip 
                      content={<ChartTooltip 
                        formatter={(value, name, props) => [`${value} lembaga`, 'Jumlah PAUD']}
                        labelFormatter={(label, payload) => {
                          const item = barData.find(d => d.name === label);
                          return `Kecamatan: ${item?.fullName || label}`;
                        }}
                      />}
                      contentStyle={getTooltipStyle()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="records" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: 'hsl(var(--accent))' }}
                      animationBegin={400}
                      animationDuration={1000}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout - Original Grid */}
        <div className="grid lg:hidden gap-6">
          {/* Enhanced Bar Chart - Mobile Only */}
          <Card 
            id="bar-chart-container" 
            className={`glass-card p-4 md:p-6 chart-hover transition-all duration-500 ${animateCharts ? 'chart-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                  </div>
                  PAUD per Kecamatan di Wilayah Perbatasan
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Jumlah lembaga per kecamatan
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => takeScreenshot('bar-chart-container', 'paud-kecamatan-perbatasan')}
                className="gap-2 hover-lift"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData} margin={{ bottom: 100, left: 15, right: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  angle={-35}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={{ 
                    fill: 'hsl(var(--muted-foreground))', 
                    fontSize: 11,
                    fontWeight: 400
                  }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  width={65}
                  tick={{ 
                    fill: 'hsl(var(--muted-foreground))', 
                    fontSize: 11,
                    fontWeight: 400
                  }}
                />
                <Tooltip 
                  content={<ChartTooltip 
                    formatter={(value, name, props) => [`${value} lembaga`, 'Jumlah PAUD']}
                    labelFormatter={(label, payload) => {
                      const item = barData.find(d => d.name === label);
                      return `Kecamatan: ${item?.fullName || label}`;
                    }}
                  />}
                  contentStyle={getTooltipStyle()}
                />
              <Bar 
                dataKey="records" 
                fill="hsl(var(--secondary))"
                radius={[6, 6, 0, 0]}
                animationBegin={200}
                animationDuration={800}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Enhanced Line Chart - Mobile Only */}
        <Card 
          id="line-chart-container" 
          className={`glass-card p-4 md:p-6 chart-hover transition-all duration-500 ${animateCharts ? 'chart-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div className="space-y-2">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  Tren Distribusi per Kecamatan di Wilayah Perbatasan
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Pola distribusi PAUD per kecamatan
                </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => takeScreenshot('line-chart-container', 'tren-data-kecamatan')}
              className="gap-2 hover-lift"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={barData} margin={{ bottom: 100, left: 15, right: 15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                angle={-35}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  fontSize: 11,
                  fontWeight: 400
                }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={11}
                width={65}
                tick={{ 
                  fill: 'hsl(var(--muted-foreground))', 
                  fontSize: 11,
                  fontWeight: 400
                }}
              />
              <Tooltip 
                content={<ChartTooltip 
                  formatter={(value, name, props) => [`${value} lembaga`, 'Jumlah PAUD']}
                  labelFormatter={(label, payload) => {
                    const item = barData.find(d => d.name === label);
                    return `Kecamatan: ${item?.fullName || label}`;
                  }}
                />}
                contentStyle={getTooltipStyle()}
              />
              <Line 
                type="monotone" 
                dataKey="records" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--accent))' }}
                animationBegin={400}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        </div>

        {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {[
          { 
            label: 'Total Lembaga PAUD', 
            value: totalRecords.toLocaleString('id-ID'), 
            trend: 'Perbatasan',
            icon: Building,
            color: 'text-primary',
            bgColor: 'from-primary/20 to-primary/10'
          },
          { 
            label: 'Jumlah Kabupaten', 
            value: Object.keys(kabupatenCounts).length, 
            trend: 'Kabupaten',
            icon: MapPin,
            color: 'text-secondary',
            bgColor: 'from-secondary/20 to-secondary/10'
          },
          { 
            label: 'Jumlah Kecamatan', 
            value: Object.keys(kecamatanCounts).length, 
            trend: 'Kecamatan',
            icon: Users,
            color: 'text-accent',
            bgColor: 'from-accent/20 to-accent/10'
          },
          { 
            label: 'Rata-rata per Kecamatan', 
            value: Math.round(Object.values(kecamatanCounts).reduce((sum, count) => sum + count, 0) / Object.keys(kecamatanCounts).length) || 0, 
            trend: 'Lembaga',
            icon: TrendingUp,
            color: 'text-chart-1',
            bgColor: 'from-orange-500/20 to-orange-500/10'
          }
        ].map((stat, index) => (
          <Card 
            key={index} 
            className={`glass-card p-3 md:p-4 text-center hover-lift transition-all duration-500 ${animateCharts ? 'chart-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.bgColor} mb-2`}>
              <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
            </div>
            <div className="text-xl md:text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm font-medium mb-2 text-foreground/80">
              {stat.label}
            </div>
            <Badge variant="secondary" className="text-xs">
              {stat.trend}
            </Badge>
          </Card>
        ))}
      </div>
      </div>
    </LoadingOverlay>
  );
};
