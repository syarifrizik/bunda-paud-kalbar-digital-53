import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Eye, Star, FileText, Users, BookOpen, Heart, Shield, Zap } from "lucide-react";
const VisiMisi = () => {
  const canvaUrl = "https://www.canva.com/design/DAGtfUsYdGo/6cqYbVIiIcwkMWFDpo5Ssg/view?utm_content=DAGtfUsYdGo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfa296476b4";
  const handleOpenExternal = () => {
    window.open(canvaUrl, '_blank', 'noopener,noreferrer');
  };
  const misiItems = ["Meningkatkan akses dan kualitas layanan PAUD di seluruh Kalimantan Barat", "Mengembangkan kompetensi pendidik dan tenaga kependidikan PAUD", "Memperkuat peran keluarga dan masyarakat dalam pendidikan anak usia dini", "Membangun sistem manajemen PAUD yang profesional dan berkelanjutan", "Mengintegrasikan nilai-nilai karakter dan kearifan lokal dalam pembelajaran PAUD", "Menciptakan lingkungan belajar yang ramah anak dan inklusif"];
  const ranStrategies = [{
    title: "Penguatan Kapasitas SDM",
    description: "Meningkatkan kompetensi pendidik dan tenaga kependidikan PAUD melalui pelatihan berkualitas",
    icon: Users
  }, {
    title: "Peningkatan Akses Layanan",
    description: "Memperluas jangkauan layanan PAUD ke seluruh pelosok daerah dengan standar kualitas",
    icon: BookOpen
  }, {
    title: "Penguatan Tata Kelola",
    description: "Membangun sistem manajemen PAUD yang profesional dan berkelanjutan",
    icon: Shield
  }, {
    title: "Kemitraan Strategis",
    description: "Membangun kolaborasi dengan berbagai pihak untuk mendukung ekosistem PAUD",
    icon: Heart
  }, {
    title: "Inovasi Pembelajaran",
    description: "Mengembangkan metode pembelajaran inovatif berbasis teknologi dan kearifan lokal",
    icon: Zap
  }, {
    title: "Monitoring & Evaluasi",
    description: "Sistem pemantauan dan evaluasi berkelanjutan untuk penjaminan mutu layanan",
    icon: Target
  }];
  const ranPaud = [{
    title: "Holistik Integratif",
    description: "Pendekatan menyeluruh yang mengintegrasikan aspek pendidikan, kesehatan, nutrisi, dan pengasuhan"
  }, {
    title: "Berbasis Keluarga",
    description: "Melibatkan keluarga sebagai pendidik utama dengan dukungan profesional"
  }, {
    title: "Ramah Anak",
    description: "Menciptakan lingkungan yang aman, nyaman, dan menyenangkan bagi anak"
  }, {
    title: "Berorientasi Bermain",
    description: "Pembelajaran melalui bermain sesuai dengan tahapan perkembangan anak"
  }];
  return <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" style={{
        backgroundAttachment: 'fixed'
      }} />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-lg px-4 py-2">
              Visi & Misi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Rencana Aksi Nasional
            </h1>
            <p className="text-xl text-muted-foreground">
              Bunda PAUD Kalimantan Barat
            </p>
          </div>
        </div>
      </section>

      {/* Visi Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Visi Card */}
            <Card className="glass-card hover-lift p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center animate-glow">
                  <Eye className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Visi</h2>
              <blockquote className="text-xl md:text-2xl leading-relaxed text-card-foreground font-medium italic">
                "Terwujudnya layanan PAUD berkualitas, holistik-integratif yang 
                mudah diakses oleh seluruh anak usia dini di Kalimantan Barat 
                untuk mengoptimalkan tumbuh kembang anak menuju generasi emas 
                yang cerdas, sehat, dan berkarakter."
              </blockquote>
            </Card>

            {/* Misi Card */}
            <Card className="glass-card hover-lift p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <Target className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h2 className="text-3xl font-bold gradient-text">Misi</h2>
              </div>
              
              <div className="grid gap-6">
                {misiItems.map((misi, index) => <div key={index} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-card-foreground leading-relaxed">
                      {misi}
                    </p>
                  </div>)}
              </div>
            </Card>

            {/* RAN PAUD Strategies */}
            <Card className="glass-card hover-lift p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold gradient-text">Rencana Aksi Nasional PAUD</h2>
                    <p className="text-muted-foreground">6 Strategi Utama Pengembangan PAUD</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Button onClick={handleOpenExternal} variant="outline" size="lg" className="h-auto p-4 border-2 border-primary/20 hover:border-primary/40 transition-all group hover:shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <FileText className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        Lihat Presentasi
                      </span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {ranStrategies.map((strategy, index) => <div key={index} className="group">
                    <Card className="h-full p-6 border-2 border-transparent hover:border-primary/30 transition-all hover:shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <strategy.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-primary">Strategi {index + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                        {strategy.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {strategy.description}
                      </p>
                    </Card>
                  </div>)}
              </div>

              {/* Mobile presentation card */}
              <div className="md:hidden">
                <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <Button onClick={handleOpenExternal} variant="outline" size="lg" className="w-full h-auto p-4 border-2 border-primary/30 hover:border-primary/50 transition-all group hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <FileText className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <span className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        Lihat Presentasi
                      </span>
                    </div>
                  </Button>
                </Card>
              </div>
            </Card>

            {/* RAN PAUD Principles */}
            <Card className="glass-card hover-lift p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold gradient-text">Prinsip Dasar PAUD</h2>
                  <p className="text-muted-foreground">Landasan Implementasi RAN PAUD</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {ranPaud.map((item, index) => <div key={index} className="group">
                    <Card className="h-full p-6 border-2 border-transparent hover:border-primary/30 transition-colors">
                      <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-primary-glow transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-card-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  </div>)}
              </div>
            </Card>

            {/* Goals Section */}
            
          </div>
        </div>
      </section>
    </div>;
};
export default VisiMisi;