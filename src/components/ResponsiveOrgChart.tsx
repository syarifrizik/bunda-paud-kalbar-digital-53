import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronDown, ChevronRight, Crown, Shield, Star, Briefcase, Heart, MessageCircle, Handshake, Users, FileText, Coins } from 'lucide-react';

interface OrganizationMember {
  id: string;
  name: string;
  position: string;
  level: 'pembina' | 'penanggungjawab' | 'ketua' | 'leadership' | 'bidang';
  members?: string[];
  deputy?: string;
  icon: any;
  gradient: string;
}

const organizationData: OrganizationMember[] = [
  {
    id: 'pembina',
    name: 'Gubernur Kalimantan Barat',
    position: 'PEMBINA',
    level: 'pembina',
    icon: Crown,
    gradient: 'from-purple-600 to-purple-400'
  },
  {
    id: 'penanggungjawab',
    name: 'Bunda PAUD Provinsi Kalimantan Barat',
    position: 'PENANGGUNGJAWAB',
    level: 'penanggungjawab',
    icon: Shield,
    gradient: 'from-pink-600 to-pink-400'
  },
  {
    id: 'ketua',
    name: 'Vivi Nurvijah, S.Pd,.M.Pd',
    position: 'KETUA POKJA',
    level: 'ketua',
    icon: Star,
    gradient: 'from-blue-600 to-blue-400'
  },
  {
    id: 'sekretaris',
    name: 'Nelly Fitriana, S.STP, MM',
    position: 'SEKRETARIS',
    level: 'leadership',
    icon: FileText,
    gradient: 'from-green-600 to-green-400'
  },
  {
    id: 'bendahara',
    name: 'Dhea Putri Herdiningrum, S.Sos, M.Sos',
    position: 'BENDAHARA',
    level: 'leadership',
    icon: Coins,
    gradient: 'from-green-600 to-green-400',
    deputy: 'Sella Wahyu Ningrum,SE'
  },
    {
      id: 'bidang-sdm',
      name: 'BIDANG SUMBER DAYA MANUSIA',
      position: 'BIDANG SDM',
      level: 'bidang',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-300',
    members: [
      'Dr. Rustam, M.Pd.Kons',
      'Dr. Fitri Sukmawati, M.Psi',
      'Hj. Siti Salechah, S.Pd., M.Pd'
    ]
  },
    {
      id: 'bidang-penelitian',
      name: 'BIDANG PENELITIAN DAN PENGEMBANGAN',
      position: 'BIDANG LITBANG',
      level: 'bidang',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-300',
    members: [
      'Prof. Dr. Aunurrahman, M.Pd',
      'Drs. Ahmad, M.Pd',
      'Fitri Darsini, S.TP, M.Pd'
    ]
  },
    {
      id: 'bidang-kesehatan',
      name: 'BIDANG KESEHATAN DAN GIZI',
      position: 'BIDANG KESEHATAN',
      level: 'bidang',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-300',
    members: [
      'dr. Purwitasari Aquarini Prehnansy',
      'dr. Citra Wulandari, MKM (Ars),dipl.AAAM',
      'Rayna Anita, SKM,.M.PH',
      'Suharningsih, SKM'
    ]
  },
    {
      id: 'bidang-humas',
      name: 'BIDANG HUMAS',
      position: 'BIDANG HUMAS',
      level: 'bidang',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-300',
    members: [
      'Naufal, S.STP',
      'Helmi Putra Hibatullah, ST',
      'Nurul H. Zainuri'
    ]
  },
    {
      id: 'bidang-kemitraan',
      name: 'BIDANG KEMITRAAN',
      position: 'BIDANG KEMITRAAN',
      level: 'bidang',
      icon: Briefcase,
      gradient: 'from-orange-500 to-orange-300',
    members: [
      'Drs. Yusniardi, M.Si',
      'Maisara, S.Pd',
      'Hj. Suryati, M.Ag'
    ]
  }
];

const MemberCard = ({ member, isExpanded, onToggle }: { 
  member: OrganizationMember; 
  isExpanded?: boolean; 
  onToggle?: () => void;
}) => {
  const Icon = member.icon;
  
  const getLevelStyle = (level: string) => {
    switch (level) {
      case 'pembina':
        return 'ring-purple-200 shadow-purple-100 scale-105';
      case 'penanggungjawab':
        return 'ring-pink-200 shadow-pink-100 scale-102';
      case 'ketua':
        return 'ring-blue-200 shadow-blue-100';
      case 'leadership':
        return 'ring-green-200 shadow-green-100';
      case 'bidang':
        return 'ring-gray-200 shadow-gray-100';
      default:
        return 'ring-gray-200';
    }
  };

  // Get card width based on level - wider for leadership to accommodate long names
  const getCardWidth = (level: string) => {
    if (level === 'leadership') {
      return 'w-80'; // Wider for Sekretaris and Ketua Bendahara
    }
    return 'w-full'; // Default width for others
  };

  return (
    <div className={getCardWidth(member.level)}>
      <Card className={`
        p-4 transition-all duration-300 hover:shadow-lg border-2 ring-2 ring-offset-2
        ${getLevelStyle(member.level)}
        hover:scale-105 animate-fade-in
      `}>
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`
            p-3 rounded-full bg-gradient-to-br ${member.gradient} 
            shadow-lg ring-2 ring-white
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs font-medium">
              {member.position}
            </Badge>
            
            <div className="min-h-[2.5rem] flex items-center justify-center">
              <h3 className="font-bold text-sm leading-tight text-foreground px-2">
                {member.name}
              </h3>
            </div>
            
            {member.deputy && (
              <div className="text-xs text-muted-foreground border-t border-border/50 pt-2 mt-2">
                <span className="font-bold">WAKIL BENDAHARA:</span>
                <br />
                 <span className="font-bold text-foreground">{member.deputy}</span>
              </div>
            )}
          </div>

          {member.members && member.members.length > 0 && (
          <div className="w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Users className="w-4 h-4 mr-1" />
                  Lihat Anggota ({member.members.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {member.position}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  {member.members.map((memberName, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{memberName}</span>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        </div>
      </Card>
    </div>
  );
};

const TreeView = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  // Create hierarchy structure for mobile
  const hierarchyLevels = [
    organizationData.filter(m => m.level === 'pembina'),
    organizationData.filter(m => m.level === 'penanggungjawab'),
    organizationData.filter(m => m.level === 'ketua'),
    organizationData.filter(m => m.level === 'leadership'),
    organizationData.filter(m => m.level === 'bidang')
  ];

  const renderTreeItem = (member: OrganizationMember, level: number = 0, isLast: boolean = false) => {
    const hasChildren = member.members && member.members.length > 0;
    const isExpanded = expandedItems.has(member.id);
    const Icon = member.icon;

    return (
      <div key={member.id} className="relative">
        {/* Clean hierarchy without connecting lines */}
        
        <div 
          className={`
            flex items-center space-x-3 p-3 rounded-lg cursor-pointer
            hover:bg-muted/50 transition-colors duration-200
            ${level > 0 ? 'ml-6' : ''}
          `}
          onClick={() => hasChildren && toggleExpanded(member.id)}
        >
          {hasChildren && (
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          )}
          
          <div className={`p-2 rounded-full bg-gradient-to-br ${member.gradient}`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="font-semibold text-sm">
              {member.position === 'GUBERNUR' ? (
                <span className="font-bold">Gubernur Kalimantan Barat</span>
              ) : member.position === 'BUNDA PAUD' ? (
                <span className="font-bold">Bunda PAUD Provinsi Kalimantan Barat</span>
              ) : (
                member.position
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {(member.name === 'Vivi Nurvijah, S.Pd,.M.Pd' || 
                member.name === 'Nelly Fitriana, S.STP, MM' || 
                member.name === 'Dhea Putri Herdiningrum, S.Sos, M.Sos') ? (
                <span className="font-bold">{member.name}</span>
              ) : (
                member.name
              )}
            </div>
            {member.deputy && (
              <div className="text-xs text-muted-foreground border-t border-border/50 pt-1 mt-1">
                <span className="font-bold">WAKIL BENDAHARA:</span>
                <br />
                <span className="font-bold text-foreground">{member.deputy}</span>
              </div>
            )}
          </div>
          
          {hasChildren && (
            <Badge variant="secondary" className="text-xs">
              {member.members!.length}
            </Badge>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-8 mt-2 space-y-1 animate-accordion-down">
            {member.members!.map((memberName, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-md bg-muted/30">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                </div>
                <span className="text-sm">{memberName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {hierarchyLevels.map((levelMembers, levelIndex) => (
        <div key={levelIndex} className="relative">
          {levelMembers.map((member, memberIndex) => (
            <div key={member.id} className="relative">
              {renderTreeItem(member, levelIndex, memberIndex === levelMembers.length - 1)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ResponsiveOrgChart = () => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group members by level for better organization
  const groupedMembers = {
    topLeadership: organizationData.filter(m => ['pembina', 'penanggungjawab', 'ketua'].includes(m.level)),
    executive: organizationData.filter(m => m.level === 'leadership'),
    bidang: organizationData.filter(m => m.level === 'bidang')
  };

  return (
    <div className="w-full space-y-6">
      {/* Mobile: Tree View */}
      <div className="md:hidden">
        <Card className="p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold gradient-text">Struktur Organisasi</h3>
            <p className="text-sm text-muted-foreground">Pokja Bunda PAUD Kalimantan Barat</p>
          </div>
          <TreeView />
        </Card>
      </div>

      {/* Desktop: Hierarchical Structure with Connecting Lines */}
      <div className="hidden md:block relative">
        {/* Top Leadership Level */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold gradient-text mb-8">Struktur Kepemimpinan</h3>
          <div className="flex flex-col items-center space-y-8">
            {groupedMembers.topLeadership.map((member, index) => (
              <div key={member.id} className="relative">
                <div className="w-80">
                  <MemberCard member={member} />
                </div>
                {index < groupedMembers.topLeadership.length - 1 && (
                  <div className="flex justify-center mt-6 mb-2">
                    <div className="w-px h-12 bg-gradient-to-b from-primary via-primary/60 to-primary/30"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Executive Level - Horizontal Layout */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-8 max-w-5xl mx-auto">
            {groupedMembers.executive.map((member) => (
              <div key={member.id}>
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Bidang Level - Clean hierarchy without lines */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-bold gradient-text mb-8">Bidang Kerja</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {groupedMembers.bidang.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-muted/20 to-muted/10 border-2">
        <h4 className="font-bold text-lg mb-4 text-center gradient-text">Keterangan Struktur Organisasi</h4>
        <div className="hidden md:flex justify-center items-center space-x-8 text-sm">
          <div className="flex items-center space-x-3 px-4 py-2 bg-background/60 rounded-lg border">
            <div className="p-2 rounded-full bg-gradient-to-br from-purple-600 to-purple-400">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Pembina</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-background/60 rounded-lg border">
            <div className="p-2 rounded-full bg-gradient-to-br from-pink-600 to-pink-400">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Penanggungjawab</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-background/60 rounded-lg border">
            <div className="p-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-400">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Ketua Pokja</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-background/60 rounded-lg border">
            <div className="p-2 rounded-full bg-gradient-to-br from-green-600 to-green-400">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Sekretaris</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-background/60 rounded-lg border">
            <div className="p-2 rounded-full bg-gradient-to-br from-green-600 to-green-400">
              <Coins className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Bendahara</span>
          </div>
          <div className="flex items-center space-x-3 px-4 py-2 bg-background/60 rounded-lg border">
            <div className="p-2 rounded-full bg-gradient-to-br from-orange-500 to-orange-300">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Bidang Kerja</span>
          </div>
        </div>
        
        {/* Mobile Legend */}
        <div className="md:hidden grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Crown className="w-4 h-4 text-purple-600" />
            <span>Pembina</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-pink-600" />
            <span>Penanggungjawab</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-blue-600" />
            <span>Ketua Pokja</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-green-600" />
            <span>Sekretaris</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-green-600" />
            <span>Ketua Bendahara</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2 justify-center">
            <Briefcase className="w-4 h-4 text-orange-600" />
            <span>Bidang Kerja</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResponsiveOrgChart;
