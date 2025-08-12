import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Search, Download, RefreshCw, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { SheetData } from "@/hooks/useGoogleSheets";
import { TableSkeleton, LoadingOverlay } from "@/components/ui/loading-overlay";

interface SpreadsheetViewerProps {
  sheetsData: SheetData[];
  onRefresh: () => void;
  isLoading?: boolean;
}

export const SpreadsheetViewer = ({ sheetsData, onRefresh, isLoading }: SpreadsheetViewerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSheet, setSelectedSheet] = useState<string>(sheetsData[0]?.id || "");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 50;

  const currentSheet = sheetsData.find(sheet => sheet.id === selectedSheet);

  const filteredData = useMemo(() => {
    if (!currentSheet || !searchTerm) return currentSheet?.data || [];
    
    return currentSheet.data.filter(row =>
      row.some(cell => 
        cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [currentSheet, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search term changes or sheet changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSheet]);

  const exportToCSV = () => {
    if (!currentSheet) return;
    
    const headers = currentSheet.headers.join(',');
    const rows = filteredData.map(row => row.join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentSheet.name}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalRecords = sheetsData.reduce((total, sheet) => total + sheet.data.length, 0);

  // Enhanced loading state with modern animations
  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg shimmer"></div>
            <div className="h-4 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
            <div className="h-8 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
          </div>
        </div>

        {/* Sheet Selector Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
          ))}
        </div>

        {/* Search Skeleton */}
        <div className="max-w-md">
          <div className="h-10 w-full bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
        </div>

        {/* Table Skeleton */}
        <Card className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex justify-between items-center mb-2">
              <div className="h-6 w-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
              <div className="h-6 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
            </div>
            <div className="h-4 w-56 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
          </div>
          
          <div className="p-6">
            <TableSkeleton />
          </div>
          
          {/* Pagination Skeleton */}
          <div className="flex justify-between items-center p-4 border-t border-border">
            <div className="h-4 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
              <div className="h-8 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
              <div className="h-8 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded shimmer"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <LoadingOverlay isLoading={isLoading} variant="inline">
      <div className="space-y-6 animate-fade-in">
        {/* Header with stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold gradient-text">Data Spreadsheet PAUD</h2>
            <p className="text-muted-foreground">
              {sheetsData.length} spreadsheet • {totalRecords} total records
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={onRefresh} variant="outline" size="sm" disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={exportToCSV} variant="outline" size="sm" disabled={!currentSheet}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Sheet selector */}
        <div className="flex flex-wrap gap-2">
          {sheetsData.map((sheet) => (
            <Button
              key={sheet.id}
              variant={selectedSheet === sheet.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSheet(sheet.id)}
              className="gap-2 transition-all duration-200 hover-lift"
            >
              <Eye className="w-3 h-3" />
              {sheet.name}
              <Badge variant="secondary" className="ml-1">
                {sheet.data.length}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari dalam data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Table */}
        {currentSheet ? (
          <Card className="glass-card overflow-hidden animate-fade-in">
            <div className="p-4 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{currentSheet.name}</h3>
                <Badge variant="outline">
                  Halaman {currentPage} dari {totalPages} • {filteredData.length} total records
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Terakhir diperbarui: {currentSheet.lastUpdated.toLocaleString('id-ID')}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {currentSheet.headers.map((header, index) => (
                      <TableHead key={index} className="font-semibold">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageData.map((row, rowIndex) => (
                    <TableRow key={startIndex + rowIndex} className="hover:bg-muted/50 transition-colors duration-200">
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="max-w-xs truncate">
                          {cell || '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} records
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="gap-1 hover-lift transition-all duration-200"
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <span>Page</span>
                    <Input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = parseInt(e.target.value);
                        if (page >= 1 && page <= totalPages) {
                          setCurrentPage(page);
                        }
                      }}
                      className="w-16 h-8 text-center transition-all duration-200"
                    />
                    <span>of {totalPages}</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1 hover-lift transition-all duration-200"
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <Card className="glass-card p-8 text-center animate-fade-in">
            <p className="text-muted-foreground">Pilih spreadsheet untuk melihat data</p>
          </Card>
        )}
      </div>
    </LoadingOverlay>
  );
};
