import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { title: "Sekapur Sirih", href: "/sekapur-sirih" },
    { title: "Pengantar Bunda PAUD", href: "/pengantar" },
    { title: "Visi & Misi", href: "/visi-misi" },
    { title: "Aturan Terbaru", href: "/aturan" }
  ];

  const infoLinks = [
    { title: "Struktur Organisasi", href: "/struktur" },
    { title: "Lokasi Sekretariat", href: "/lokasi" },
    { title: "Data PAUD", href: "/data" },
    { title: "Galeri Dokumentasi", href: "/galeri" }
  ];

  const socialMedia = [
    { icon: Instagram, href: "https://www.instagram.com/bundapaudkalimantanbarat?utm_source=ig_web_button_share_sheet&igsh=dzFhMmhxNHhqMGZz", label: "Instagram" }
  ];

  return (
    <footer className="relative bg-background-secondary border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
               <h3 className="text-2xl font-bold gradient-text mb-4">
                BUNDA PAUD KALBAR
               </h3>
               <p className="text-muted-foreground mb-6 leading-relaxed">
                 Portal resmi BUNDA PAUD Provinsi Kalimantan Barat Masa Bakti 2025-2030. 
                 Bersama membangun generasi emas melalui pendidikan anak usia dini 
                 yang berkualitas dan berkarakter.
               </p>
              </div>
              
              {/* Kontak Info */}
              <Card className="glass-card p-6">
                <h4 className="font-semibold text-card-foreground mb-4">
                  Informasi Kontak
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Jalan Letnan Jenderal Sutoyo Nomor 124 Kelurahan Parit Tokaya 
                      Kec. Pontianak Selatan Kota Pontianak 78113 Kalimantan Barat
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">bundapaudkb@gmail.com</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">www.kalbarprov.go.id</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-card-foreground mb-6">
                Menu Utama
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm story-link"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Links */}
            <div>
              <h4 className="font-semibold text-card-foreground mb-6">
                Informasi
              </h4>
              <ul className="space-y-3">
                {infoLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm story-link"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="font-semibold text-card-foreground mb-4">
                  Ikuti Instagram Kami
                </h4>
                <div className="flex items-center gap-3">
                  {socialMedia.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="glass-card hover-lift"
                      asChild
                    >
                      <a 
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    </Button>
                  ))}
                  <a 
                    href="https://www.instagram.com/bundapaudkalimantanbarat?utm_source=ig_web_button_share_sheet&igsh=dzFhMmhxNHhqMGZz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm story-link"
                  >
                    @bundapaudkalimantanbarat
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <Card className="glass-card p-4 w-full md:w-auto">
                <p className="text-sm text-muted-foreground mb-3">
                  Dapatkan update terbaru
                </p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Email Anda"
                    className="px-3 py-2 bg-background border border-border rounded-md text-sm flex-1 min-w-0"
                  />
                  <Button size="sm">
                    Subscribe
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-background">
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>
                © 2025 BUNDA PAUD KALBAR. Semua hak cipta dilindungi.
              </p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">
                  Kebijakan Privasi
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Kontak
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;