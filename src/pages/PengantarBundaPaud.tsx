import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PengantarBundaPaud = () => {
  return (
    <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-secondary opacity-10"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
              Pengantar
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Kelompok Kerja
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-8">
              Bunda PAUD Provinsi Kalimantan Barat
            </h2>
            <Badge variant="secondary" className="mb-4">
              Masa Bakti 2025-2030
            </Badge>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Pengertian Bunda PAUD */}
            <Card className="glass-card hover-lift p-8 md:p-12">
              <h2 className="text-3xl font-bold gradient-text mb-6">Kelompok Kerja Bunda PAUD</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-card-foreground leading-relaxed mb-6">
                  <strong>Kelompok Kerja Bunda PAUD Provinsi Kalimantan Barat</strong> adalah organisasi yang dibentuk 
                  untuk membantu Bunda PAUD Provinsi dalam melaksanakan tugas dan tanggung jawabnya. Pembentukan 
                  organisasi ini didasarkan pada pemahaman bahwa Pendidikan Anak Usia Dini merupakan investasi 
                  fundamental bagi pembangunan sumber daya manusia yang berkualitas.
                </p>
                
                <p className="text-card-foreground leading-relaxed mb-6">
                  Pokja Bunda PAUD hadir sebagai entitas strategis yang tidak hanya menginisiasi tetapi juga 
                  memfasilitasi berbagai upaya untuk meningkatkan aksesibilitas dan kualitas layanan PAUD di 
                  seluruh wilayah Kalimantan Barat melalui pendekatan holistik integratif.
                </p>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-4">Dasar Pembentukan</h3>
                  <p className="text-card-foreground">
                    Surat Keputusan Gubernur Kalimantan Barat Nomor. 814 / RO-KESRA/ 2025 tanggal 03 Juni 2025 Tentang Pembentukan Kelompok Kerja (Pokja) Bunda Pendidikan Anak Usia Dini Masa Bakti 2025-2030 dan telah dilaksanakan pelantikan oleh Bunda Paud Provinsi Kalbar tanggal 16 Juni 2025 bertempat di Pendopo Gubernur Kalimantan Barat.
                  </p>
                </div>
              </div>
            </Card>

            {/* Peran Bunda PAUD */}
            <Card className="glass-card hover-lift p-8 md:p-12">
              <h2 className="text-3xl font-bold gradient-text mb-6">Peran Bunda PAUD</h2>
              <p className="text-lg text-card-foreground mb-8">
                Bunda PAUD adalah sosok mitra utama, tokoh sentral, sekaligus figur ibu dalam Gerakan PAUD Bermutu 
                di setiap jenjang pemerintahan. Keberadaan Bunda PAUD diharapkan dapat memotivasi masyarakat dan 
                para pemangku kepentingan PAUD untuk menyediakan layanan PAUD Bermutu untuk Semua dalam kerangka 
                Pengembangan Anak Usia Dini Holistik Integratif.
              </p>
              
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Memberikan sumbangan pemikiran, melakukan advokasi, dan melaksanakan sosialisasi dalam mewujudkan 
                    Gerakan PAUD Bermutu untuk Semua dalam kerangka Pengembangan Anak Usia Dini Holistik Integratif 
                    di seluruh wilayah Indonesia
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong peran serta masyarakat untuk berpartisipasi dalam pembinaan, penyelenggaraan, dan 
                    pengembangan layanan PAUD Bermutu untuk Semua dalam kerangka Pengembangan Anak Usia Dini Holistik Integratif
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Memotivasi pembina, penyelenggara, guru dan tenaga kependidikan PAUD dalam menyelenggarakan 
                    PAUD Bermutu untuk Semua dalam kerangka Pengembangan Anak Usia Dini Holistik Integratif
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong optimalisasi sumber dana untuk mendukung penyelenggaraan PAUD Bermutu untuk Semua 
                    dalam kerangka Pengembangan Anak Usia Dini Holistik Integratif melalui APBN, APBD, Dana Desa, 
                    Corporate Social Responsibility (CSR), dan sumber-sumber lain di masyarakat
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Memberikan saran, masukan dan rekomendasi kepada Pemerintah dan/atau pemerintah daerah untuk 
                    mendukung pelaksanaan penyelenggaraan PAUD Bermutu untuk Semua dalam kerangka Pengembangan 
                    Anak Usia Dini Holistik Integratif
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong peningkatan mutu dan perluasan akses layanan PAUD
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong peningkatan mutu guru dan tenaga kependidikan PAUD (kualifikasi, kompetensi, 
                    kesejahteraan, dan perlindungan)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong peningkatan pengawasan terutama yang terkait proses pembelajaran dan bahan ajar 
                    yang terbebas dari unsur kekerasan, perundungan, radikalisme, pornografi, dan SARA
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong peningkatan konsumsi makanan sehat, bergizi, dan seimbang bagi anak usia dini
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong pencegahan dan penuntasan penanganan anak usia dini yang gagal tumbuh (stunting)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong edukasi mengenai bahaya narkoba, psikotropika, dan zat adiktif lainnya (NAPZA) 
                    sebagai bentuk perlindungan kepada anak usia dini
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <p className="text-card-foreground">
                    Mendorong terciptanya layanan Pengembangan Anak Usia Dini Holistik Integratif yang mencakup 
                    kesehatan, pendidikan, gizi, perawatan, pengasuhan, kesejahteraan, dan perlindungan anak usia dini
                  </p>
                </div>
              </div>
            </Card>

            {/* Introduction Card */}
            <Card className="glass-card hover-lift p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-secondary p-1">
                    <img 
                      src="https://ik.imagekit.io/biajcse64/Paudpedia/Bunda%20PAUD%20KALBAR.png?updatedAt=1754851725333" 
                      alt="Bunda PAUD KALBAR"
                      className="w-full h-full rounded-2xl object-cover"
                      draggable="false"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-card-foreground">
                    Ny. Dr. Hj. Erlina Norsan,.S.H., M.H
                  </h2>
                  <p className="text-lg text-accent font-semibold mb-2">
                    Bunda PAUD Provinsi Kalimantan Barat
                  </p>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-card-foreground leading-relaxed mb-6">
                      "Dengan penuh rasa syukur dan kebanggaan, saya menyambut baik 
                      kehadiran website resmi Kelompok Kerja Bunda PAUD Provinsi Kalimantan Barat 
                      sebagai wadah informasi dan komunikasi dalam mengembangkan pendidikan 
                      anak usia dini di seluruh wilayah Kalimantan Barat."
                    </p>

                    <p className="text-card-foreground leading-relaxed">
                      "Sebagai Bunda PAUD Provinsi Kalimantan Barat dan Penanggungjawab Pokja Bunda PAUD Provinsi, 
                      saya berkomitmen untuk memimpin tim dalam melaksanakan program kerja 2025 yang telah disusun dengan 
                      fokus pada empat program utama: Perencanaan dan Pengembangan Program, 
                      Sosialisasi dan Edukasi, Koordinasi dan Kerjasama Kemitraan, serta 
                      Pengawasan, Pemantauan dan Evaluasi."
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Call to Action */}
            <Card className="p-8 text-center bg-gradient-primary text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">
                Mari Bersama Membangun Masa Depan Anak
              </h3>
              <p className="text-lg opacity-90">
                Dengan semangat gotong royong dan komitmen bersama, mari kita wujudkan 
                pendidikan anak usia dini yang berkualitas untuk seluruh anak Kalimantan Barat.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PengantarBundaPaud;
