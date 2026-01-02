import React, { useState } from 'react';
import { User, Camera, MapPin, Phone, Mail, Clock, Save, Star, Plus, Play, X, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { toast } from 'sonner';
import dressPreview from '@/assets/dress-preview.png';

interface PortfolioItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
}

/**
 * TailorProfile - Profile setup page for tailors with portfolio showcase
 */
const TailorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'portfolio'>('info');

  const [profile, setProfile] = useState({
    shopName: 'Master Ali Tailors',
    ownerName: 'Ali Hassan',
    phone: '+92 300 1234567',
    email: 'ali@mastertailors.pk',
    address: 'Shop #12, Fashion Street, Lahore',
    experience: '15 years',
    speciality: 'Bridal Wear, Traditional Pakistani',
    openingHours: '10:00 AM - 8:00 PM',
    bio: 'Expert in traditional Pakistani bridal wear with over 15 years of experience. Specializing in hand embroidery, zari work, and custom designs.',
  });

  const specialities = [
    'Bridal Wear',
    'Traditional Pakistani',
    'Western Formal',
    'Kids Wear',
    'Alterations',
    'Embroidery',
  ];

  // Portfolio state
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: 1, type: 'image', src: dressPreview, title: 'Bridal Lehenga', description: 'Red silk with gold zari work' },
    { id: 2, type: 'image', src: dressPreview, title: 'Anarkali Suit', description: 'Pastel pink chiffon' },
    { id: 3, type: 'image', src: dressPreview, title: 'Party Gown', description: 'Navy blue with sequins' },
    { id: 4, type: 'video', src: '', title: 'Making Process', description: 'Behind the scenes' },
  ]);

  const handleAddPortfolioItem = (type: 'image' | 'video') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const newItem: PortfolioItem = {
            id: Date.now(),
            type,
            src: ev.target?.result as string,
            title: file.name.split('.')[0],
            description: '',
          };
          setPortfolio(prev => [...prev, newItem]);
          toast.success(`${type === 'image' ? 'Image' : 'Video'} added to portfolio!`);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleRemovePortfolioItem = (id: number) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from portfolio');
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile saved successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-secondary-foreground" />
          My Profile
        </h1>
        <p className="text-muted-foreground">Manage your shop information and showcase your work</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-6 py-2 rounded-t-xl font-medium transition-all ${
            activeTab === 'info'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Shop Info
        </button>
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`px-6 py-2 rounded-t-xl font-medium transition-all ${
            activeTab === 'portfolio'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Portfolio
        </button>
      </div>

      {activeTab === 'info' ? (
        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Profile Picture & Basic Info */}
          <AnimatedCard variant="bordered" className="lg:col-span-1">
            <AnimatedCardContent className="pt-6 text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-secondary to-mint flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-secondary-foreground" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5 text-primary-foreground animate-wiggle" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setProfileImage(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              <h2 className="text-xl font-bold mt-4">{profile.shopName}</h2>
              <p className="text-muted-foreground">{profile.ownerName}</p>

              <div className="flex items-center justify-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? 'text-gold fill-gold' : 'text-muted'}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">4.9 (127 reviews)</span>
              </div>

              <div className="mt-6 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{profile.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{profile.openingHours}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 p-4 bg-muted/50 rounded-xl text-left">
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          {/* Edit Form */}
          <AnimatedCard variant="bordered" className="lg:col-span-2">
            <AnimatedCardHeader className="flex flex-row items-center justify-between">
              <AnimatedCardTitle>Shop Information</AnimatedCardTitle>
              <Button
                variant={isEditing ? 'default' : 'outline'}
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : null}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </AnimatedCardHeader>
            <AnimatedCardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Shop Name"
                  value={profile.shopName}
                  onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                  disabled={!isEditing}
                />
                <AnimatedInput
                  label="Owner Name"
                  value={profile.ownerName}
                  onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                  disabled={!isEditing}
                />
                <AnimatedInput
                  label="Phone Number"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                />
                <AnimatedInput
                  label="Email Address"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <AnimatedInput
                label="Shop Address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!isEditing}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Years of Experience"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  disabled={!isEditing}
                />
                <AnimatedInput
                  label="Opening Hours"
                  value={profile.openingHours}
                  onChange={(e) => setProfile({ ...profile, openingHours: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">About Your Shop</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-24 px-4 py-3 bg-card border-2 border-border rounded-xl focus:border-primary outline-none transition-colors disabled:opacity-60"
                  placeholder="Tell customers about your expertise..."
                />
              </div>

              {/* Specialities */}
              <div>
                <p className="text-sm font-medium mb-3">Specialities</p>
                <div className="flex flex-wrap gap-2">
                  {specialities.map((spec) => (
                    <span
                      key={spec}
                      className={`
                        px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all
                        ${profile.speciality.includes(spec)
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }
                        ${isEditing ? 'hover:scale-105' : ''}
                      `}
                      onClick={() => {
                        if (isEditing) {
                          if (profile.speciality.includes(spec)) {
                            setProfile({ ...profile, speciality: profile.speciality.replace(`, ${spec}`, '').replace(`${spec}, `, '').replace(spec, '') });
                          } else {
                            setProfile({ ...profile, speciality: profile.speciality ? `${profile.speciality}, ${spec}` : spec });
                          }
                        }
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </div>
      ) : (
        /* Portfolio Tab */
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Showcase Your Work</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleAddPortfolioItem('image')}>
                <Image className="w-4 h-4 mr-2" />
                Add Photo
              </Button>
              <Button variant="outline" onClick={() => handleAddPortfolioItem('video')}>
                <Video className="w-4 h-4 mr-2" />
                Add Video
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolio.map((item, index) => (
              <AnimatedCard
                key={item.id}
                variant="bordered"
                hoverEffect="lift"
                className={`group overflow-hidden animate-fade-scale stagger-${(index % 5) + 1}`}
              >
                <div className="relative aspect-[4/5]">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                      {item.src ? (
                        <video src={item.src} className="w-full h-full object-cover" />
                      ) : (
                        <Play className="w-16 h-16 text-primary" />
                      )}
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.type === 'video' ? 'bg-gold text-gold-foreground' : 'bg-primary text-primary-foreground'
                    }`}>
                      {item.type === 'video' ? <Play className="w-3 h-3 inline mr-1" /> : <Image className="w-3 h-3 inline mr-1" />}
                      {item.type === 'video' ? 'Video' : 'Photo'}
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleRemovePortfolioItem(item.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-destructive/80 text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    <p className="font-semibold text-primary-foreground">{item.title}</p>
                    <p className="text-sm text-primary-foreground/80">{item.description}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}

            {/* Add New Card */}
            <AnimatedCard
              variant="bordered"
              className="aspect-[4/5] flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleAddPortfolioItem('image')}
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-muted-foreground">Add More Work</p>
              <p className="text-sm text-muted-foreground">Photos or Videos</p>
            </AnimatedCard>
          </div>

          <p className="text-center text-muted-foreground mt-6">
            Showcase your best work to attract more customers! 📸✨
          </p>
        </div>
      )}
    </div>
  );
};

export default TailorProfile;
