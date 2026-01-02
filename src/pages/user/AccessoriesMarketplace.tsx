import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Sparkles, Star, ShoppingCart, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';

/**
 * AccessoriesMarketplace - Page for browsing and buying accessories
 */
const AccessoriesMarketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'All', emoji: '✨' },
    { id: 'buttons', label: 'Buttons', emoji: '🔘' },
    { id: 'embroidery', label: 'Embroidery', emoji: '🧵' },
    { id: 'sequins', label: 'Sequins', emoji: '💎' },
    { id: 'lace', label: 'Lace', emoji: '🎀' },
    { id: 'beads', label: 'Beads', emoji: '📿' },
  ];

  const accessories = [
    { id: 1, name: 'Gold Pearl Buttons', price: 250, rating: 4.8, category: 'buttons', color: 'from-gold to-coral' },
    { id: 2, name: 'Floral Embroidery Patch', price: 450, rating: 4.9, category: 'embroidery', color: 'from-primary to-rose' },
    { id: 3, name: 'Crystal Sequin Pack', price: 350, rating: 4.7, category: 'sequins', color: 'from-lavender to-primary' },
    { id: 4, name: 'Chantilly Lace Border', price: 550, rating: 4.9, category: 'lace', color: 'from-mint to-secondary' },
    { id: 5, name: 'Vintage Metal Buttons', price: 180, rating: 4.5, category: 'buttons', color: 'from-gold to-accent' },
    { id: 6, name: 'Glass Bead Collection', price: 320, rating: 4.6, category: 'beads', color: 'from-coral to-rose' },
    { id: 7, name: 'Zari Thread Bundle', price: 280, rating: 4.8, category: 'embroidery', color: 'from-gold to-primary' },
    { id: 8, name: 'Mirror Work Patches', price: 400, rating: 4.7, category: 'sequins', color: 'from-mint to-lavender' },
  ];

  const filteredAccessories = selectedCategory === 'all'
    ? accessories
    : accessories.filter(a => a.category === selectedCategory);

  const toggleCart = (id: number) => {
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-gold" />
            Accessories Marketplace
          </h1>
          <p className="text-muted-foreground">Drag & drop accessories onto your designs</p>
        </div>
        <Button variant="gold" className="relative">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-bounce-soft">
              {cart.length}
            </span>
          )}
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search accessories..."
              className="w-full h-12 pl-12 pr-4 bg-card border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>
        <Button variant="outline" size="lg">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
              ${selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted hover:bg-muted/80'
              }
            `}
          >
            <span>{cat.emoji}</span>
            <span className="font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Accessories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAccessories.map((item, index) => (
          <AnimatedCard
            key={item.id}
            variant="bordered"
            hoverEffect="lift"
            className={`group cursor-grab active:cursor-grabbing animate-fade-scale stagger-${(index % 5) + 1}`}
          >
            <div className={`h-32 bg-gradient-to-br ${item.color} rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
              <Sparkles className="w-12 h-12 text-primary-foreground/80" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="w-5 h-5 text-primary-foreground/60" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <AnimatedCardContent className="pt-4">
              <h3 className="font-semibold mb-1">{item.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm text-muted-foreground">{item.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">Rs. {item.price}</span>
                <Button
                  variant={cart.includes(item.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleCart(item.id)}
                  className="hover-bounce"
                >
                  {cart.includes(item.id) ? 'Added' : 'Add'}
                </Button>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesMarketplace;
