
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Clock, Car, Bus, ExternalLink, Instagram } from "lucide-react";

const LokasiSekretariat = () => {
  const kontakInfo = [
    {
      icon: MapPin,
      label: "Alamat",
      value: "Jl. Letnan Jendral Sutoyo No.124, Parit Tokaya, Kec. Pontianak Sel., Kota Pontianak, Kalimantan Barat 78113",
      color: "text-primary"
    },
    {
      icon: Clock,
      label: "Jam Operasional",
      value: "Senin - Jumat: 08:00 - 16:00 WIB",
      color: "text-destructive"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@bundapaudkalimantanbarat",
      color: "text-accent",
      link: "https://www.instagram.com/bundapaudkalimantanbarat?utm_source=ig_web_button_share_sheet&igsh=dzFhMmhxNHhqMGZz"
    },
    {
      icon: Mail,
      label: "Email",
      value: "bundapaud@kalbarprov.go.id",
      color: "text-secondary",
      link: "mailto:bundapaud@kalbarprov.go.id"
    }
  ];

  const transportasi = [
    {
      icon: Car,
      title: "Kendaraan Pribadi",
      deskripsi: "Tersedia area parkir yang luas dan aman",
      waktu: "15 menit dari pusat kota"
    },
    {
      icon: Bus,
      title: "Transportasi Umum",
      deskripsi: "Angkutan kota dan bus Trans Pontianak",
      waktu: "Halte terdekat 200m"
    }
  ];

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
              Lokasi
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              Lokasi Sekretariat
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              Bunda PAUD Kalimantan Barat
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Kunjungi kantor sekretariat Bunda PAUD Kalimantan Barat untuk informasi 
              lebih lanjut tentang program dan layanan pendidikan anak usia dini.
            </p>
          </div>
        </div>
      </section>

      {/* Peta dan Informasi Kontak */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Peta */}
              <div>
                <Card className="glass-card p-6 h-full">
                  <h3 className="text-2xl font-bold gradient-text mb-6">
                    Peta Lokasi
                  </h3>
                  <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.816878649191!2d109.33922679999999!3d-0.04870770000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d59a3841da327%3A0xddb14750880de7d1!2sJl.%20Letnan%20Jendral%20Sutoyo%20No.124%2C%20Parit%20Tokaya%2C%20Kec.%20Pontianak%20Sel.%2C%20Kota%20Pontianak%2C%20Kalimantan%20Barat%2078113!5e0!3m2!1sid!2sid!4v1754831838885!5m2!1sid!2sid" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button className="flex-1" onClick={() => window.open('https://maps.google.com/maps?q=Jl.+Letnan+Jendral+Sutoyo+No.124,+Parit+Tokaya,+Kec.+Pontianak+Sel.,+Kota+Pontianak,+Kalimantan+Barat+78113', '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buka di Google Maps
                    </Button>
                    <Button variant="outline" onClick={() => window.open('https://maps.google.com/maps/dir//Jl.+Letnan+Jendral+Sutoyo+No.124,+Parit+Tokaya,+Kec.+Pontianak+Sel.,+Kota+Pontianak,+Kalimantan+Barat+78113', '_blank')}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Arah
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Informasi Kontak */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold gradient-text">
                  Informasi Kontak
                </h3>
                
                {kontakInfo.map((info, index) => (
                  <Card key={index} className="glass-card hover-lift p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ${info.color}`}>
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-card-foreground mb-1">
                          {info.label}
                        </h4>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Akses Transportasi */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">
              Akses Transportasi
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {transportasi.map((transport, index) => (
                <Card key={index} className="glass-card hover-lift p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 text-primary`}>
                    <transport.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">
                    {transport.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {transport.deskripsi}
                  </p>
                  <Badge variant="outline">
                    {transport.waktu}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Landmark Terdekat */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center gradient-text mb-12">
              Landmark Terdekat
            </h2>
            
            <Card className="glass-card p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">
                    Tempat Penting
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      Kantor Gubernur Kalimantan Barat (1.2 km)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      Universitas Tanjungpura (2.5 km)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      RSUD Dr. Soedarso (1.8 km)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      Mall Ayani Megamall (3.2 km)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">
                    Fasilitas Umum
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-accent" />
                      Bank BCA Cabang Pontianak (500m)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-accent" />
                      Masjid Raya Mujahidin (800m)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-accent" />
                      Terminal Sungai Raya (15 km)
                    </li>
                    <li className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-accent" />
                      Bandara Supadio (18 km)
                    </li>
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

export default LokasiSekretariat;
