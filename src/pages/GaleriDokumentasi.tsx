import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Users, Download, Share2, Search, Filter } from "lucide-react";
import MediaCard, { MediaItem } from "@/components/MediaCard";
import MediaViewer from "@/components/MediaViewer";

const GaleriDokumentasi = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("resmi");

  // Data dokumentasi dengan kategori baru
  const mediaData: MediaItem[] = [
    // Kategori "Resmi" - untuk pelantikan dan acara formal
    {
      id: "resmi-1",
      title: "Pelantikan Pokja Bunda PAUD Provinsi Kalimantan Barat Periode 2025-2030",
      description: "Dokumentasi resmi pelantikan pada 16 Juni 2025 di Pontianak",
      date: "16 Juni 2025",
      location: "Pontianak",
      type: "instagram_post",
      url: "https://www.instagram.com/p/DK_aCdiSrmf/?igsh=bmxtMGpwbGt1amkx",
      embedId: "DK_aCdiSrmf",
      category: "resmi"
    },
    
    // Kategori "Aktivitas" - untuk kegiatan harian/program
    {
      id: "aktivitas-1",
      title: "Panggung Bercerita Hari Anak Nasional 2025",
      description: "Acara Panggung Bercerita di Landak pada 23 Juli 2025",
      date: "23 Juli 2025",
      location: "Landak",
      type: "instagram_post",
      url: "https://www.instagram.com/p/DMun_26SWpQ/?igsh=MW45MnZ3ZWI5NHZ2Mg==",
      embedId: "DMun_26SWpQ",
      category: "aktivitas"
    },
    
    // Kategori "Publikasi" - untuk media dan dokumen
    {
      id: "publikasi-1",
      title: "Artikel Tribun Pontianak - Erlina Harap Pokja Bunda PAUD Jadi Motor Pemerataan",
      description: "Liputan media tentang visi Bunda PAUD untuk wilayah 3T",
      type: "news",
      url: "https://pontianak.tribunnews.com/2025/06/17/erlina-harap-pokja-bunda-paud-jadi-motor-pemerataan-layanan-pendidikan-anak-usia-dini-ke-wilayah-3t",
      category: "publikasi"
    },
    {
      id: "publikasi-2",
      title: "Portal Dokumen Bunda PAUD Kalimantan Barat",
      description: "Portal resmi untuk akses dokumen dan data",
      type: "document",
      url: "https://kalbar.link/BundaPAUDKalbar",
      category: "publikasi"
    }
  ];

  // Filter media berdasarkan kategori dan search term
  const filteredMedia = mediaData.filter(item => {
    const matchesCategory = activeTab === "semua" || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMediaView = (item: MediaItem) => {
    setSelectedMedia(item);
  };

  const handleCloseViewer = () => {
    setSelectedMedia(null);
  };

  const getCategoryCount = (category: string) => {
    if (category === "semua") return mediaData.length;
    return mediaData.filter(item => item.category === category).length;
  };

  return (
    <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-hero opacity-10"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
              Dokumentasi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Galeri Dokumentasi
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Bunda PAUD Kalimantan Barat
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dokumentasi visual kegiatan pelantikan dan berbagai program 
              yang telah dilaksanakan oleh Bunda PAUD Kalimantan Barat.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari dokumentasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span>Menampilkan {filteredMedia.length} dari {mediaData.length} media</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-12 glass-card p-2">
                <TabsTrigger 
                  value="resmi" 
                  className="text-sm md:text-base data-[state=active]:bg-gradient-primary data-[state=active]:text-white transition-all duration-300 hover-lift"
                >
                  <span className="relative z-10">Resmi ({getCategoryCount("resmi")})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="aktivitas" 
                  className="text-sm md:text-base data-[state=active]:bg-gradient-secondary data-[state=active]:text-white transition-all duration-300 hover-lift"
                >
                  <span className="relative z-10">Aktivitas ({getCategoryCount("aktivitas")})</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="publikasi" 
                  className="text-sm md:text-base data-[state=active]:bg-gradient-hero data-[state=active]:text-white transition-all duration-300 hover-lift"
                >
                  <span className="relative z-10">Publikasi ({getCategoryCount("publikasi")})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-8">
                <div className="text-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-hero opacity-5 rounded-2xl blur-3xl"></div>
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 relative">
                      {activeTab === "resmi" && "Dokumentasi Resmi"}
                      {activeTab === "aktivitas" && "Dokumentasi Aktivitas"}
                      {activeTab === "publikasi" && "Publikasi Media"}
                    </h2>
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                    {activeTab === "resmi" && "Dokumentasi acara resmi dan pelantikan Kelompok Kerja Bunda PAUD Provinsi Kalimantan Barat."}
                    {activeTab === "aktivitas" && "Berbagai kegiatan dan program harian yang telah dilaksanakan untuk pengembangan PAUD di Kalimantan Barat."}
                    {activeTab === "publikasi" && "Publikasi media dan dokumen terkait kegiatan Bunda PAUD Kalimantan Barat."}
                  </p>
                </div>
                
                {filteredMedia.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMedia.map((item) => (
                      <MediaCard 
                        key={item.id} 
                        item={item} 
                        onView={handleMediaView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Tidak ada hasil</h3>
                    <p className="text-muted-foreground">
                      Coba ubah kata kunci pencarian atau pilih kategori lain.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-6">
          <Card className="glass-card max-w-4xl mx-auto p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              Ikuti Perkembangan Terbaru
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dapatkan informasi terkini tentang kegiatan dan program 
              Bunda PAUD Kalimantan Barat melalui media sosial kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Follow Instagram
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Unduh Semua Foto
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Media Viewer Modal */}
      <MediaViewer 
        item={selectedMedia}
        isOpen={selectedMedia !== null}
        onClose={handleCloseViewer}
      />
    </div>
  );
};

export default GaleriDokumentasi;