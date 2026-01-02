import React, { useState } from 'react';
import { User, Camera, Mail, Phone, MapPin, Heart, Package, Star, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { useAuth } from '@/contexts/AuthContext';
import dressPreview from '@/assets/dress-preview.png';

const UserProfile: React.FC = () => {
  const { user, profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: profile?.full_name || user?.email || '',
    email: user?.email || '',
    phone: '+92 300 1234567',
    address: 'Lahore, Punjab, Pakistan',
    bio: 'Fashion enthusiast who loves traditional Pakistani wear with modern touches.',
  });

  const savedDesigns = [
    { id: 1, name: 'Embroidered Kameez', image: dressPreview, date: '15 Dec 2024' },
    { id: 2, name: 'Wedding Lehenga', image: dressPreview, date: '12 Dec 2024' },
    { id: 3, name: 'Casual Kurta', image: dressPreview, date: '10 Dec 2024' },
  ];

  const pastOrders = [
    { id: 'ORD-001', item: 'Silk Kameez', tailor: 'Master Ali Tailors', date: '10 Dec 2024', status: 'Delivered', rating: 5 },
    { id: 'ORD-002', item: 'Formal Suit', tailor: 'Royal Stitch House', date: '5 Dec 2024', status: 'Delivered', rating: 4 },
  ];

  const reviewsSubmitted = [
    { id: 1, tailor: 'Master Ali Tailors', rating: 5, comment: 'Excellent work! Perfect stitching and on-time delivery.', date: '12 Dec 2024' },
    { id: 2, tailor: 'Royal Stitch House', rating: 4, comment: 'Good quality, minor delay but worth it.', date: '8 Dec 2024' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <User className="w-8 h-8 text-primary" />
          My Profile
        </h1>
        <p className="text-muted-foreground">Manage your account and view your history</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <AnimatedCard variant="glass" hoverEffect="glow" className="lg:col-span-1">
          <AnimatedCardContent className="pt-8 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mx-auto">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg animate-bounce-soft">
                <Camera className="w-5 h-5" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {isEditing ? (
              <div className="space-y-4 text-left">
                <AnimatedInput
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <AnimatedInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <AnimatedInput
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <AnimatedInput
                  label="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <div className="flex gap-2 pt-2">
                  <Button variant="hero" onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">{formData.bio}</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-sm">{formData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm">{formData.address}</span>
                  </div>
                </div>

                <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full mt-4">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </>
            )}
          </AnimatedCardContent>
        </AnimatedCard>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Saved Designs */}
          <AnimatedCard variant="bordered">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose" />
                Saved Designs
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {savedDesigns.map((design, index) => (
                  <div 
                    key={design.id} 
                    className={`group relative rounded-xl overflow-hidden cursor-pointer hover-bounce animate-fade-scale stagger-${index + 1}`}
                  >
                    <img src={design.image} alt={design.name} className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm font-medium text-primary-foreground">{design.name}</p>
                      <p className="text-xs text-primary-foreground/70">{design.date}</p>
                    </div>
                    <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-rose fill-rose" />
                    </button>
                  </div>
                ))}
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          {/* Past Orders */}
          <AnimatedCard variant="bordered">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-gold" />
                Past Orders
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="space-y-3">
                {pastOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.item}</p>
                        <p className="text-sm text-muted-foreground">{order.tailor} • {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-mint/20 text-mint">
                        {order.status}
                      </span>
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < order.rating ? 'text-gold fill-gold' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCardContent>
          </AnimatedCard>

          {/* Reviews Submitted */}
          <AnimatedCard variant="bordered">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gold" />
                Reviews Submitted
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="space-y-4">
                {reviewsSubmitted.map((review) => (
                  <div key={review.id} className="p-4 bg-muted rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.tailor}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
