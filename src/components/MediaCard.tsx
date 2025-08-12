import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Eye, ExternalLink, Play, FileText, Instagram, Youtube, Newspaper } from "lucide-react";

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  location?: string;
  participants?: string;
  type: 'instagram_reel' | 'instagram_post' | 'youtube' | 'news' | 'document';
  url: string;
  thumbnail?: string;
  embedId?: string;
  category: 'resmi' | 'aktivitas' | 'publikasi';
}

interface MediaCardProps {
  item: MediaItem;
  onView: (item: MediaItem) => void;
}

const MediaCard = ({ item, onView }: MediaCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getIcon = () => {
    switch (item.type) {
      case 'instagram_reel':
      case 'instagram_post':
        return <Instagram className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'news':
        return <Newspaper className="w-5 h-5" />;
      case 'document':
        return <FileText className="w-5 h-5" />;
      default:
        return <Eye className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case 'instagram_reel':
        return 'Instagram Reel';
      case 'instagram_post':
        return 'Instagram Post';
      case 'youtube':
        return 'YouTube Video';
      case 'news':
        return 'Berita';
      case 'document':
        return 'Dokumen';
      default:
        return 'Media';
    }
  };

  const getModernBackground = () => {
    const backgrounds = {
      youtube: "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
      instagram_reel: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500",
      instagram_post: "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
      news: "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600",
      document: "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
    };

    const patterns = {
      youtube: "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_0%,transparent_50%)]",
      instagram_reel: "before:absolute before:inset-0 before:bg-[conic-gradient(from_45deg_at_center,rgba(255,255,255,0.1)_0deg,transparent_90deg,rgba(255,255,255,0.1)_180deg,transparent_270deg)]",
      instagram_post: "before:absolute before:inset-0 before:bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] before:bg-[length:8px_8px]",
      news: "before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15)_0%,transparent_70%)]",
      document: "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_100%)]"
    };

    return (
      <div className={`w-full h-full relative overflow-hidden ${backgrounds[item.type]} ${patterns[item.type]} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
        <div className="relative z-10 p-4">
          {item.type === 'youtube' && (
            <div className="relative">
              <Play className="w-16 h-16 text-white drop-shadow-2xl animate-pulse" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
            </div>
          )}
          {(item.type === 'instagram_reel' || item.type === 'instagram_post') && (
            <div className="relative">
              <Instagram className="w-16 h-16 text-white drop-shadow-2xl animate-float" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50"></div>
            </div>
          )}
          {item.type === 'news' && (
            <div className="relative">
              <Newspaper className="w-16 h-16 text-white drop-shadow-2xl animate-glow" />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"></div>
            </div>
          )}
        </div>
        
        {/* Animated overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-white/20 to-transparent"></div>
      </div>
    );
  };

  return (
    <Card className="glass-card hover-lift overflow-hidden group cursor-pointer relative border-0 shadow-elevation">
      <div className="absolute inset-0 bg-gradient-card rounded-lg"></div>
      <div className="relative h-48 overflow-hidden rounded-t-lg" onClick={() => onView(item)}>
        {getModernBackground()}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="glass border-white/20 text-white backdrop-blur-md shadow-lg">
            <span className="relative z-10 font-semibold">{getTypeLabel()}</span>
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <div className="p-2 glass border-white/20 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <Eye className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      
      <div className="relative p-6 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background-secondary rounded-b-lg"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-foreground mb-2 line-clamp-2 flex-1 text-lg leading-tight">
              {item.title}
            </h3>
            <div className="ml-3 p-2 bg-primary/10 rounded-full">
              {getIcon()}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          
          <div className="space-y-3 mb-6">
            {item.date && (
              <div className="flex items-center text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
                <Calendar className="w-4 h-4 mr-3 text-primary" />
                <span className="font-medium">{item.date}</span>
              </div>
            )}
            {item.location && (
              <div className="flex items-center text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
                <MapPin className="w-4 h-4 mr-3 text-secondary" />
                <span className="font-medium">{item.location}</span>
              </div>
            )}
            {item.participants && (
              <div className="flex items-center text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-2">
                <Users className="w-4 h-4 mr-3 text-accent" />
                <span className="font-medium">{item.participants}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 glass border-primary/20 hover:bg-primary/10 group/btn transition-all duration-300"
              onClick={() => onView(item)}
            >
              <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              <span className="font-semibold">Lihat</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="glass border-border/50 hover:bg-accent/10 hover:scale-105 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                window.open(item.url, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MediaCard;