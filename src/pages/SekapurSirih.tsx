import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SekapurSirih = () => {
  return (
    <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-hero opacity-10"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
              Sekapur Sirih
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Sambutan Gubernur Kalimantan Barat
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-card hover-lift max-w-4xl mx-auto p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Governor Photo */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-primary p-1 animate-glow">
                  <img 
                    src="https://ik.imagekit.io/biajcse64/Paudpedia/Gubernur%20Kalbar%20Drs.%20H.%20Ria%20Norsan,%20M.M.,%20M.H.png?updatedAt=1754828210142" 
                    alt="Drs. H. Ria Norsan,.M.M.,M.H"
                    className="w-full h-full rounded-2xl object-cover"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-card-foreground">
                  Drs. H. Ria Norsan,.M.M.,M.H
                </h2>
                <p className="text-lg text-muted-foreground mb-4 italic">
                  Gubernur Kalimantan Barat
                </p>
                <Badge variant="secondary" className="mb-6">
                  Pembina Kelompok Kerja Bunda PAUD Provinsi Kalimantan Barat
                </Badge>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-card-foreground leading-relaxed mb-6">
                    <strong>Assalamu'alaikum Warahmatullahi Wabarokatuh,</strong>
                  </p>
                  
                  <p className="text-card-foreground leading-relaxed mb-6">
                    Puji syukur kita panjatkan kepada Allah SWT atas segala rahmat dan karunia-Nya 
                    yang telah memberikan kesempatan kepada kita untuk terus berkontribusi dalam 
                    memajukan pendidikan anak usia dini di Kalimantan Barat.
                  </p>

                  <p className="text-card-foreground leading-relaxed mb-6">
                    Pendidikan Anak Usia Dini (PAUD) merupakan fondasi yang sangat penting dalam 
                    membangun generasi penerus bangsa yang berkualitas. Melalui Kelompok Kerja Bunda PAUD 
                    Provinsi Kalimantan Barat Masa Bakti 2025-2030, kita berkomitmen untuk memberikan 
                    layanan pendidikan terbaik bagi anak-anak di masa emas pertumbuhan mereka.
                  </p>

                  <p className="text-card-foreground leading-relaxed mb-6">
                    Kelompok Kerja Bunda PAUD Provinsi Kalbar telah dibentuk berdasarkan Surat Keputusan Gubernur 
                    Kalimantan Barat Nomor. 814 / RO-KESRA/ 2025 tanggal 03 Juni 2025 Tentang Pembentukan 
                    Kelompok Kerja (Pokja) Bunda Pendidikan Anak Usia Dini Masa Bakti 2025-2030 yang terdiri 
                    dari enam bidang kerja yang akan bekerja secara sinergis: Kesekretariatan, Sumber Daya Manusia, 
                    Penelitian dan Pengembangan, Kesehatan dan Gizi, Hubungan Masyarakat, dan Kemitraan.
                  </p>

                  <p className="text-card-foreground leading-relaxed mb-6">
                    Program kerja tahun 2025 yang telah disusun mencakup empat program utama: Perencanaan dan 
                    Pengembangan Program, Sosialisasi dan Edukasi, Koordinasi dan Kerjasama Kemitraan, serta 
                    Pengawasan, Pemantauan dan Evaluasi. Semua program ini dirancang untuk meningkatkan 
                    aksesibilitas dan kualitas layanan PAUD di seluruh wilayah Kalimantan Barat.
                  </p>

                  <p className="text-card-foreground leading-relaxed mb-6">
                    Dengan dukungan penuh dari Pemerintah Provinsi Kalimantan Barat dan partisipasi aktif seluruh 
                    stakeholder, saya yakin Kelompok Kerja Bunda PAUD ini akan memberikan dampak positif yang 
                    berkelanjutan bagi masa depan anak-anak Kalimantan Barat melalui pendekatan holistik integratif.
                  </p>

                  <p className="text-card-foreground leading-relaxed mb-4">
                    Mari bersama-sama kita wujudkan cita-cita membangun generasi emas Kalimantan Barat yang 
                    cerdas, berkarakter, dan siap menghadapi tantangan masa depan melalui pendidikan anak 
                    usia dini yang berkualitas.
                  </p>

                  <p className="text-card-foreground leading-relaxed">
                    <strong>Wassalamu'alaikum Warahmatullahi Wabarokatuh.</strong>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SekapurSirih;
