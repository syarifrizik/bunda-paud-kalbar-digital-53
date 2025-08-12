import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Phone, MapPin } from "lucide-react";
import OrganizationalFlow from "@/components/OrganizationalFlow";

const StrukturOrganisasi = () => {
  const struktur = [
    {
      level: "Ketua",
      nama: "Dr. Sutarmidji, M.Si",
      jabatan: "Gubernur Kalimantan Barat",
      foto: "/placeholder-avatar.jpg",
      kontak: {
        email: "gubernur@kalbarprov.go.id",
        phone: "(0561) 734371"
      }
    },
    {
      level: "Wakil Ketua",
      nama: "Hj. Marhamah Sutarmidji",
      jabatan: "Istri Gubernur Kalimantan Barat",
      foto: "/placeholder-avatar.jpg",
      kontak: {
        email: "bundapaud@kalbarprov.go.id",
        phone: "(0561) 734372"
      }
    },
    {
      level: "Sekretaris",
      nama: "Dr. Alexius Akim, M.Pd",
      jabatan: "Kepala Dinas Pendidikan dan Kebudayaan",
      foto: "/placeholder-avatar.jpg",
      kontak: {
        email: "disdikbud@kalbarprov.go.id",
        phone: "(0561) 736393"
      }
    }
  ];

  const anggota = [
    {
      nama: "Prof. Dr. H. Kaswandi, M.Si",
      jabatan: "Wakil Gubernur Kalimantan Barat",
      bidang: "Pembinaan"
    },
    {
      nama: "Dr. Harisson, M.Pd",
      jabatan: "Sekretaris Daerah Provinsi",
      bidang: "Koordinasi"
    },
    {
      nama: "Dra. Hj. Rahmawati, M.Pd",
      jabatan: "Kepala BPKPAD",
      bidang: "Anggaran"
    },
    {
      nama: "Dr. H. Muhammad Zain, M.Pd",
      jabatan: "Kepala Dinas Sosial",
      bidang: "Kesejahteraan"
    },
    {
      nama: "dr. Harisson Marangin, Sp.A",
      jabatan: "Kepala Dinas Kesehatan",
      bidang: "Kesehatan"
    },
    {
      nama: "Drs. H. Zainudin Hassan, M.Si",
      jabatan: "Kepala Dinas Komunikasi dan Informatika",
      bidang: "Komunikasi"
    }
  ];

  return (
    <div className="min-h-screen bg-background page-container">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-secondary opacity-10"
          style={{ backgroundAttachment: 'fixed' }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
              Organisasi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Struktur Organisasi
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Pokja Bunda PAUD Kalimantan Barat
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Susunan organisasi Kelompok Kerja Bunda PAUD Provinsi Kalimantan Barat 
              yang bertugas mengkoordinasikan dan mengembangkan program pendidikan anak usia dini.
            </p>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Flow Chart */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-full mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-8">
              Struktur Organisasi Pokja Bunda PAUD
            </h2>
            <h3 className="text-xl font-semibold text-center text-muted-foreground mb-4">
              Provinsi Kalimantan Barat Masa Bakti 2025 - 2030
            </h3>
            
            <div className="mb-8">
              <OrganizationalFlow />
            </div>
            
            <div className="text-center">
              <Badge variant="outline" className="text-sm px-4 py-2">
                BERDASARKAN SK GUBERNUR KALIMANTAN BARAT NO. 814/RO-KESRA/2025 TANGGAL 03 JUNI 2025
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Tugas dan Fungsi */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">
              Tugas dan Fungsi
            </h2>
            
            <Card className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-primary" />
                    Tugas Utama
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Mengkoordinasikan penyelenggaraan program PAUD</li>
                    <li>• Meningkatkan akses dan mutu layanan PAUD</li>
                    <li>• Mengembangkan kapasitas pendidik PAUD</li>
                    <li>• Memfasilitasi kerjasama antar lembaga</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-primary" />
                    Fungsi Organisasi
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Perencanaan dan pengembangan program</li>
                    <li>• Monitoring dan evaluasi pelaksanaan</li>
                    <li>• Advokasi kebijakan PAUD</li>
                    <li>• Pembinaan dan pengawasan</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StrukturOrganisasi;