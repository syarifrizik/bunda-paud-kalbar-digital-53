import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Tag, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const AturanTerbaru = () => {
  const [downloading, setDownloading] = useState<number | null>(null);

  const documents = [
    {
      id: 1,
      title: "Undang-Undang Nomor 23 Tahun 2002",
      subtitle: "Tentang Perlindungan Anak",
      date: "2002-10-22",
      category: "UU",
      type: "PDF",
      size: "850 KB",
      downloadUrl: "https://jdih.bkn.go.id/common/dokumen/UU%20NOMOR%2023%20TAHUN%202002@PERLINDUNGAN%20ANAK.pdf",
      status: "verified"
    },
    {
      id: 2,
      title: "Undang-Undang Nomor 20 Tahun 2003",
      subtitle: "Tentang Sistem Pendidikan Nasional",
      date: "2003-07-08",
      category: "UU",
      type: "PDF",
      size: "1.2 MB",
      downloadUrl: "https://pep.pps.uny.ac.id/sites/pep.pps.uny.ac.id/files/UU%20Nomor%2020%20Tahun%202003-Sistem%20Pendidikan%20Nasional.pdf",
      status: "verified"
    },
    {
      id: 3,
      title: "Undang-Undang Nomor 23 Tahun 2014",
      subtitle: "Tentang Pemerintahan Daerah",
      date: "2014-10-02",
      category: "UU",
      type: "PDF",
      size: "2.8 MB",
      downloadUrl: "https://bapenda.jabarprov.go.id/JDIH/Undang-Undang/UNDANG-UNDANG_REPUBLIK_INDONESIA_NOMOR_23_TAHUN_2014.pdf",
      status: "verified"
    },
    {
      id: 5,
      title: "Peraturan Pemerintah Nomor 17 Tahun 2010",
      subtitle: "Tentang Pengelolaan dan Penyelenggaraan Pendidikan",
      date: "2010-01-28",
      category: "PP",
      type: "PDF",
      size: "2.1 MB",
      downloadUrl: "https://luk.staff.ugm.ac.id/atur/PP17-2010Lengkap.pdf",
      status: "verified"
    },
    {
      id: 6,
      title: "Peraturan Pemerintah Nomor 60 Tahun 2013",
      subtitle: "Tentang Pengembangan Anak Usia Dini Holistik-Integratif",
      date: "2013-09-26",
      category: "PP",
      type: "PDF",
      size: "1.8 MB",
      downloadUrl: "https://jdih.kemenpppa.go.id/peraturan/perpres_no.60-2013.pdf",
      status: "verified"
    },
    {
      id: 7,
      title: "Peraturan Presiden Nomor 42 Tahun 2013",
      subtitle: "Tentang Gerakan Nasional Percepatan Perbaikan Gizi",
      date: "2013-05-29",
      category: "Perpres",
      type: "PDF",
      size: "1.1 MB",
      downloadUrl: "https://peraturan.bpk.go.id/Download/67744/Perpres%2042%202013.pdf",
      status: "verified"
    },
    {
      id: 8,
      title: "Permendikbud Nomor 18 Tahun 2018",
      subtitle: "Tentang Penyediaan Layanan Pendidikan Anak Usia Dini",
      date: "2018-06-16",
      category: "Permendikbud",
      type: "PDF",
      size: "1.9 MB",
      downloadUrl: "https://disdikbud.batangkab.go.id/lamp/info/20230705155756-14-0-Permendikbud182018_ttg_Penyediaan_Layanan_PAUD.pdf",
      status: "verified"
    },
    {
      id: 9,
      title: "Permendikbud Nomor 137 Tahun 2014",
      subtitle: "Tentang Standar Nasional Pendidikan Anak Usia Dini",
      date: "2014-11-28",
      category: "Permendikbud",
      type: "PDF",
      size: "2.3 MB",
      downloadUrl: "https://repositori.kemdikbud.go.id/12860/1/Permendikbud%20No.%20137%20Tahun%202014%20-%20SN-PAUD.pdf",
      status: "verified"
    },
    {
      id: 10,
      title: "Peraturan Daerah Nomor 8 Tahun 2016",
      subtitle: "Tentang Pembentukan dan Susunan Perangkat Daerah Provinsi Kalimantan Barat",
      date: "2016-12-30",
      category: "Perda",
      type: "PDF",
      size: "1.4 MB",
      downloadUrl: "https://peraturan.bpk.go.id/Download/37826/PERDA-NO-8-TAHUN-2016-TTG-PEMBENTUKAN%20DAN%20SUSUNAN%20PERANGKAT%20DAERAH%20PROV%20KALBAR.pdf",
      status: "verified"
    },
    {
      id: 11,
      title: "Peraturan Gubernur Nomor 110 Tahun 2021",
      subtitle: "Tentang Kedudukan, Susunan Organisasi, Tugas Dan Fungsi, Serta Tata Kerja Sekretariat Daerah Provinsi Kalimantan Barat",
      date: "2021-12-31",
      category: "Pergub",
      type: "PDF",
      size: "2.5 MB",
      downloadUrl: "https://peraturan.bpk.go.id/Download/202200/Pergub%20No%20110%20Tahun%202021.pdf",
      status: "verified"
    },
    {
      id: 12,
      title: "Pedoman Peran Bunda PAUD",
      subtitle: "Direktorat Jenderal PAUD, Pendidikan Dasar dan Pendidikan Menengah",
      date: "2025-01-01",
      category: "Pedoman",
      type: "PDF",
      size: "1.8 MB",
      downloadUrl: "https://bundapaud.makassarkota.go.id/uploads/regulasi/686bc8ac20b36-Pedoman%20Peran%20Bunda%20PAUD%202025.pdf",
      status: "verified"
    }
  ];

  const handleDownload = (doc: typeof documents[0]) => {
    setDownloading(doc.id);
    
    if (doc.status === "manual") {
      // For manual navigation documents, open in new tab
      window.open(doc.downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      // For direct download links
      const link = document.createElement('a');
      link.href = doc.downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = `${doc.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    // Reset downloading state after a short delay
    setTimeout(() => setDownloading(null), 1000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "UU": "bg-primary text-primary-foreground",
      "PP": "bg-accent text-accent-foreground",
      "Perpres": "bg-secondary text-secondary-foreground",
      "Permendikbud": "bg-destructive text-destructive-foreground",
      "Perda": "bg-muted text-muted-foreground",
      "Pergub": "bg-primary/80 text-primary-foreground",
      "Pedoman": "bg-accent/80 text-accent-foreground"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-primary opacity-10"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 text-lg px-4 py-2 animate-float">
              Dasar Hukum
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Dasar Hukum
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Peraturan Perundang-undangan dan Kebijakan Kelompok Kerja Bunda PAUD
            </p>
            <Badge variant="secondary" className="mb-4">
              Program Kerja 2025
            </Badge>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b border-border bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-card-foreground">
                    {documents.length} Dokumen Dasar Hukum
                  </span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Semua Kategori</Badge>
                  <Badge variant="outline">Lengkap</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {documents.map((doc) => (
              <Card key={doc.id} className="glass-card hover-lift p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Document Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 mb-3">
                      <Badge className={getCategoryColor(doc.category)}>
                        {doc.category}
                      </Badge>
                      <Badge variant="outline">{doc.type}</Badge>
                      {doc.status === "verified" && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terverifikasi
                        </Badge>
                      )}
                      {doc.status === "manual" && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Manual
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-card-foreground mb-2 leading-tight">
                      {doc.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {doc.subtitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(doc.date).toLocaleDateString('id-ID')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{doc.size}</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {"notes" in doc && (doc as any).notes && (
                      <div className="mt-3 p-2 rounded-md bg-muted/50">
                        <p className="text-xs text-muted-foreground italic">
                          {(doc as any).notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button 
                      variant="outline" 
                      className="group"
                      onClick={() => handleDownload(doc)}
                      disabled={downloading === doc.id}
                      title={doc.status === "manual" ? "Buka halaman detail untuk download" : "Download langsung"}
                    >
                      <Download className={`w-4 h-4 mr-2 group-hover:translate-y-[-2px] transition-transform ${downloading === doc.id ? 'animate-pulse' : ''}`} />
                      {downloading === doc.id ? 'Downloading...' : 
                       doc.status === "manual" ? 'Buka Link' : 'Unduh'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center mt-12">
            <Card className="glass-card p-8 max-w-md mx-auto">
              <p className="text-muted-foreground mb-4">
                Menampilkan {documents.length} dari {documents.length} dokumen
              </p>
              <Button variant="outline" disabled>
                Semua Dokumen Telah Dimuat
              </Button>
            </Card>
          </div>

          {/* Information Notice */}
          <div className="mt-12">
            <Card className="glass-card p-6 border-l-4 border-l-primary bg-primary/5">
              <h3 className="font-semibold text-card-foreground mb-2">
                Informasi Penting
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Semua dokumen yang tersedia di halaman ini merupakan dasar hukum yang digunakan 
                dalam penyusunan dan pelaksanaan program kerja Kelompok Kerja Bunda PAUD Provinsi 
                Kalimantan Barat. Untuk pertanyaan lebih lanjut mengenai implementasi peraturan, 
                silakan hubungi sekretariat melalui email: <strong>bundapaudkb@gmail.com</strong>
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AturanTerbaru;