import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SheetData {
  id: string;
  name: string;
  data: any[][];
  headers: string[];
  lastUpdated: Date;
  includeInVisualization?: boolean;
}

// Using CSV export method - no API key required
export const useGoogleSheets = (spreadsheetIds: string[]) => {
  const [sheetsData, setSheetsData] = useState<SheetData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSheetDataCSV = async (spreadsheetId: string, sheetName: string, gid: string) => {
    try {
      // Using CSV export URL - works without API key if spreadsheet is public
      const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${gid}`;
      
      const response = await fetch(csvUrl, {
        mode: 'cors',
        headers: {
          'Accept': 'text/csv'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      
      if (!csvText.trim()) {
        throw new Error('Empty CSV data');
      }
      
      // Parse CSV data
      const lines = csvText.split('\n').filter(line => line.trim());
      if (lines.length === 0) {
        throw new Error('No data in CSV');
      }
      
      // Parse headers and data
      const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
      const data = lines.slice(1).map(line => {
        // Simple CSV parsing - handles quoted fields
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        
        return result;
      }).filter(row => row.some(cell => cell && cell.trim()));
      
      return {
        id: `${spreadsheetId}-${gid}`,
        name: sheetName,
        data,
        headers,
        lastUpdated: new Date()
      };
    } catch (err) {
      console.error(`Error fetching CSV for sheet ${sheetName}:`, err);
      throw err;
    }
  };

  const fetchAllSheets = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Your actual spreadsheet configuration
      const actualSpreadsheetId = '13MvYdJSXjqkD4GB18oBxtnWprhWkwKsGUrXOCkaHujs';
      const sheetTabs = [
        { id: actualSpreadsheetId, name: 'REKAPAN PAUD PERBATASAN', gid: '1556157324' },
        { id: actualSpreadsheetId, name: 'STATISTIK', gid: '506986287' },
        { id: actualSpreadsheetId, name: 'SAMBAS', gid: '1173762075' },
        { id: actualSpreadsheetId, name: 'SINGKAWANG', gid: '313437610' },
        { id: actualSpreadsheetId, name: 'KAPUASHULU', gid: '1140511672' },
        { id: actualSpreadsheetId, name: 'SINTANG', gid: '273679071' },
        { id: actualSpreadsheetId, name: 'SANGGAU', gid: '1942206212' },
        { id: actualSpreadsheetId, name: 'BENGKAYANG', gid: '2094371282' }
      ];
      
      const promises = sheetTabs.map(sheet => 
        fetchSheetDataCSV(sheet.id, sheet.name, sheet.gid).catch(() => null)
      );
      
      const results = await Promise.all(promises);
      const validSheets = results.filter(sheet => sheet !== null) as SheetData[];
      
      // Mark visualization-ready sheets (exclude REKAPAN and STATISTIK from charts)
      const sheetsWithVisualizationFlag = validSheets.map(sheet => ({
        ...sheet,
        includeInVisualization: !['REKAPAN PAUD PERBATASAN', 'STATISTIK'].includes(sheet.name)
      }));
      
      setSheetsData(sheetsWithVisualizationFlag);
      
      if (validSheets.length > 0) {
        toast({
          title: "Data berhasil dimuat",
          description: `${validSheets.length} spreadsheet berhasil disinkronisasi`,
        });
      }
      
    } catch (err) {
      const errorMsg = 'Gagal mengambil data dari Google Sheets. Menggunakan data demo.';
      setError(errorMsg);
      
      // Enhanced fallback with your sheet structure
      setSheetsData([
        {
          id: 'demo-rekapan',
          name: 'REKAPAN PAUD PERBATASAN',
          headers: ['Kabupaten/Kota', 'Jumlah Lembaga', 'Jumlah Peserta Didik', 'Jumlah Pendidik', 'Status'],
          data: [
            ['Sambas', '45', '1,250', '180', 'Aktif'],
            ['Singkawang', '32', '890', '125', 'Aktif'],
            ['Kapuas Hulu', '28', '675', '98', 'Aktif'],
            ['Sintang', '41', '1,180', '165', 'Aktif']
          ],
          lastUpdated: new Date(),
          includeInVisualization: false
        },
        {
          id: 'demo-statistik',
          name: 'STATISTIK',
          headers: ['Indikator', 'Total', 'Persentase', 'Target', 'Capaian'],
          data: [
            ['APK PAUD', '85.2%', '85.2', '90%', 'Belum Tercapai'],
            ['Rasio Guru:Siswa', '1:12', '12', '1:10', 'Mendekati Target'],
            ['Lembaga Terakreditasi', '75%', '75', '80%', 'Belum Tercapai']
          ],
          lastUpdated: new Date(),
          includeInVisualization: false
        },
        {
          id: 'demo-sambas',
          name: 'SAMBAS', 
          headers: ['Nama Lembaga', 'NPSN', 'Alamat', 'Kecamatan', 'Jumlah Siswa', 'Status'],
          data: [
            ['TK Islam Al-Hidayah', '12345678', 'Jl. Pendidikan No. 1', 'Sambas', '45', 'Aktif'],
            ['PAUD Tunas Bangsa', '12345679', 'Jl. Kartini No. 5', 'Tebas', '38', 'Aktif'],
            ['TK Pembina', '12345680', 'Jl. Diponegoro No. 10', 'Sambas', '52', 'Aktif'],
            // Adding more demo data to show 33 total (matching your screenshot)
            ...Array.from({length: 30}, (_, i) => [`PAUD Demo ${i+1}`, `1234567${i+1}`, `Jl. Demo ${i+1}`, 'Sambas', '25', 'Aktif'])
          ],
          lastUpdated: new Date(),
          includeInVisualization: true
        }
      ]);
      
      toast({
        title: "Menggunakan data demo",
        description: "Pastikan spreadsheet sudah dipublikasi. Buka spreadsheet → File → Bagikan → Ubah ke 'Siapa saja dengan link dapat melihat'",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSheets();
  }, []);

  return {
    sheetsData,
    isLoading,
    error,
    refreshData: fetchAllSheets
  };
};