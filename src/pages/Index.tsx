import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, BookOpen, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {

  const quickActions = [
    {
      title: "Program Kerja 2025",
      description: "Perencanaan dan Pengembangan Program Pokja",
      href: "/visi-misi",
      gradient: "bg-gradient-primary"
    },
    {
      title: "Struktur Organisasi",
      description: "Susunan Kelompok Kerja Masa Bakti 2025-2030",
      href: "/struktur",
      gradient: "bg-gradient-secondary"
    },
    {
      title: "Data PAUD Kalbar",
      description: "Sebaran data PAUD se-Kalimantan Barat",
      href: "/data",
      gradient: "bg-gradient-hero"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative hero-mobile-safe pb-24 md:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge variant="outline" className="mb-8 text-lg px-6 py-3 animate-fade-in shadow-lg backdrop-blur-sm">
              Selamat Datang
            </Badge>
            
            <h1 className="text-5xl md:text-8xl font-bold gradient-text mb-8 animate-fade-in delay-200 tracking-tight">
              BUNDA PAUD
            </h1>
            
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-6 animate-fade-in delay-300">
              Provinsi Kalimantan Barat
            </h2>
            
            <Badge variant="secondary" className="mb-12 text-lg px-6 py-2 animate-fade-in delay-400 shadow-md">
              Masa Bakti 2025-2030
            </Badge>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500">
              Portal resmi BUNDA PAUD Provinsi Kalimantan Barat yang bertugas 
              mengkoordinasikan dan mengembangkan program pendidikan anak usia dini untuk 
              mewujudkan <span className="gold-shimmer font-semibold">generasi emas</span> yang cerdas, sehat, dan berkarakter.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-700">
              <Button asChild size="lg" className="group px-8 py-4 text-lg hover-lift shadow-xl">
                <Link to="/pengantar">
                  Tentang Kami
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg hover-lift shadow-lg backdrop-blur-sm">
                <Link to="/galeri">Galeri Kegiatan</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Bunda PAUD Section */}
      <section className="py-24 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                Tentang Kami
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Memahami peran dan fungsi BUNDA PAUD dalam mengembangkan ekosistem PAUD Kalimantan Barat
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Card className="glass-card hover-lift p-8 md:p-12 h-full animate-fade-in delay-200">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold gradient-text mb-4">Organisasi Strategis</h3>
                  <p className="text-card-foreground leading-relaxed text-lg">
                    <strong>Kelompok Kerja (Pokja) BUNDA PAUD Provinsi Kalimantan Barat</strong> adalah organisasi yang dibentuk untuk 
                    membantu Bunda PAUD Provinsi Kalimantan Barat dalam melaksanakan tugas dan tanggung jawabnya dengan fokus pada 
                    peningkatan aksesibilitas dan kualitas layanan PAUD melalui pendekatan holistik integratif.
                  </p>
                  
                  <p className="text-card-foreground leading-relaxed text-lg">
                    Pokja Bunda PAUD Provinsi Kalimantan Barat terdiri dari <strong>6 bidang kerja</strong> yang bekerja secara sinergis 
                    untuk mencapai visi mewujudkan <span className="gold-shimmer font-semibold">generasi emas</span> Kalimantan Barat.
                  </p>
                </div>
              </Card>

              <div className="space-y-6 animate-fade-in delay-400">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="glass-card hover-lift p-6 group">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-bold text-primary">Program Utama</h4>
                    </div>
                    <ul className="text-sm text-card-foreground space-y-2">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Perencanaan & Pengembangan</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Sosialisasi & Edukasi</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Koordinasi & Kemitraan</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Pengawasan & Evaluasi</li>
                    </ul>
                  </Card>

                  <Card className="glass-card hover-lift p-6 group">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                        <Award className="w-5 h-5 text-secondary" />
                      </div>
                      <h4 className="font-bold text-secondary">Target Pencapaian</h4>
                    </div>
                    <ul className="text-sm text-card-foreground space-y-2">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>Peningkatan Kualitas SDM</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>Bantuan APE & Alat Bantu</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>Program Makanan Bergizi</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>Pemantauan Layanan Holistik</li>
                    </ul>
                  </Card>
                </div>

                <Card className="glass-card hover-lift p-6">
                  <h4 className="font-bold text-foreground mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-accent" />
                    6 Bidang Kerja Strategis
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <span className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-center font-medium">Kesekretariatan</span>
                    <span className="px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-center font-medium">SDM</span>
                    <span className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-center font-medium">Litbang</span>
                    <span className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-center font-medium">Kesehatan</span>
                    <span className="px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-center font-medium">Humas</span>
                    <span className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-center font-medium">Kemitraan</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Program Kerja Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                Program Kerja 2025
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Akses informasi lengkap tentang program kerja, kegiatan, dan layanan 
                Kelompok Kerja Bunda PAUD Kalimantan Barat Masa Bakti 2025-2030
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href} className="group animate-fade-in" style={{ animationDelay: `${(index + 1) * 200}ms` }}>
                  <Card 
                    className="glass-card hover-lift p-10 text-center h-full text-white relative overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-2xl"
                    style={{ 
                      background: action.gradient === 'bg-gradient-primary' ? 'var(--gradient-primary)' :
                                action.gradient === 'bg-gradient-secondary' ? 'var(--gradient-secondary)' :
                                'var(--gradient-hero)'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                        {action.title}
                      </h3>
                      <p className="text-white/90 mb-8 text-lg leading-relaxed">
                        {action.description}
                      </p>
                      <div className="inline-flex items-center text-white font-semibold text-lg group-hover:translate-x-3 transition-all duration-300 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
                        Selengkapnya
                        <ArrowRight className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Card className="glass-card max-w-5xl mx-auto p-12 md:p-16 text-center hover-lift animate-fade-in shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8 leading-tight">
              Mari Bersama Membangun Masa Depan Anak
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Bergabunglah dengan gerakan pendidikan anak usia dini untuk 
              menciptakan <span className="gradient-text font-semibold">generasi penerus</span> yang berkualitas dan berkarakter 
              di Kalimantan Barat.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="px-8 py-4 text-lg hover-lift shadow-xl">
                <Link to="/struktur">
                  Struktur Organisasi
                  <Users className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg hover-lift shadow-lg backdrop-blur-sm">
                <Link to="/lokasi">
                  Lokasi Sekretariat
                  <MapPin className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
