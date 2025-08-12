import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 text-lg px-4 py-2">
            Error 404
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
            Halaman Tidak Ditemukan
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. 
            Mungkin halaman telah dipindahkan atau URL salah.
          </p>

          <Card className="glass-card p-8 mb-8">
            <p className="text-muted-foreground mb-4">
              URL yang dicoba: <code className="bg-muted px-2 py-1 rounded text-sm">{location.pathname}</code>
            </p>
            <p className="text-sm text-muted-foreground">
              Jika Anda yakin ini adalah kesalahan, silakan hubungi administrator.
            </p>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/galeri">
                <Search className="w-5 h-5 mr-2" />
                Jelajahi Galeri
              </Link>
            </Button>
          </div>

          <div className="mt-12">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke halaman sebelumnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
