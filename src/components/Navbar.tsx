import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu handler
  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMobileMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeMobileMenu]);

  // Close menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Handle scroll effect with enhanced floating behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Sekapur Sirih', href: '/sekapur-sirih' },
    { name: 'Pengantar', href: '/pengantar' },
    { name: 'Visi & Misi', href: '/visi-misi' },
    { name: 'Aturan', href: '/aturan' },
    { name: 'Struktur', href: '/struktur' },
    { name: 'Lokasi', href: '/lokasi' },
    { name: 'Data PAUD', href: '/data' },
    { name: 'Galeri', href: '/galeri' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`transition-all duration-500 ease-out ${
          isScrolled 
            ? 'glass-navbar-floating rounded-2xl px-6 py-3 mx-4 sm:mx-8 shadow-floating' 
            : 'glass-navbar-top rounded-xl px-6 py-4'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group navbar-logo">
              <div className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <img 
                  src="https://ik.imagekit.io/biajcse64/Paudpedia/Logo%20bunda%20PAUD.png?updatedAt=1754827173201" 
                  alt="Logo Bunda PAUD" 
                  className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform duration-300"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-lg leading-tight gradient-text tracking-tight">BUNDA PAUD KALBAR</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1 bg-background/50 backdrop-blur-sm rounded-xl p-1 border border-border/50">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group nav-item ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10 nav-item-active'
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive(item.href) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg animate-fade-in" />
                    )}
                    <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2 transform -translate-x-1/2" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative w-10 h-10 rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-300 theme-toggle"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-background to-muted opacity-50" />
                <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}>
                  <Moon className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className={`absolute inset-0 transition-all duration-500 ${isDark ? 'rotate-0 scale-100' : 'rotate-180 scale-0'}`}>
                  <Sun className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </Button>

              {/* Mobile menu button with modern hamburger animation */}
              <button
                className="lg:hidden w-10 h-10 rounded-xl hover:bg-primary/10 transition-all duration-300 flex items-center justify-center group hamburger-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Animated hamburger lines */}
                  <div className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                  }`} />
                  <div className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`} />
                  <div className={`absolute w-5 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu with Modern Effects */}
        {isOpen && (
          <div className="lg:hidden mt-4 mx-4">
            <div className="glass-mobile-menu p-4 rounded-2xl border border-border/50 shadow-floating mobile-menu-slide">
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 mobile-menu-ripple mobile-nav-item mobile-menu-item-enter ${
                      isActive(item.href)
                        ? 'text-primary bg-primary/10 mobile-nav-item-active border-l-2 border-primary'
                        : 'text-foreground hover:text-primary hover:bg-primary/5 hover:shadow-md hover:scale-[1.02]'
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Enhanced Theme Toggle in Mobile Menu */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full justify-start px-4 py-3 rounded-xl theme-toggle mobile-menu-ripple text-sm"
                >
                  <div className="flex items-center gap-2">
                    {isDark ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                    <span>{isDark ? 'Mode Terang' : 'Mode Gelap'}</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;