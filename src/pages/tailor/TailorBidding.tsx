import React, { useState } from 'react';
import { Gavel, Package, Clock, User, MapPin, Send, Eye, ChevronDown, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { cn } from '@/lib/utils';
import dressPreview from '@/assets/dress-preview.png';
import { toast } from 'sonner';

/**
 * TailorBidding - Page for tailors to browse and bid on customer orders
 */
const TailorBidding: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});
  const [bidMessages, setBidMessages] = useState<Record<string, string>>({});
  const [bidDays, setBidDays] = useState<Record<string, string>>({});
  const [submittedBids, setSubmittedBids] = useState<string[]>([]);

  const filters = [
    { id: 'all', label: 'All Orders', count: 8 },
    { id: 'bridal', label: 'Bridal', count: 3 },
    { id: 'traditional', label: 'Traditional', count: 4 },
    { id: 'casual', label: 'Casual', count: 1 },
  ];

  const availableOrders = [
    {
      id: 'ORD-201',
      customer: 'Sarah Ahmed',
      location: 'Lahore',
      item: 'Bridal Lehenga',
      style: 'bridal',
      description: 'Red silk lehenga with heavy gold zari work, kundan embellishments, and scalloped borders',
      budget: '40,000 - 55,000',
      deadline: '28 Dec 2024',
      image: dressPreview,
      accessories: ['Zari Border', 'Crystal Sequins', 'Gold Buttons'],
      measurements: { bust: '36', waist: '28', hips: '38', length: '42' },
      postedAgo: '2 hours ago',
      bidsCount: 4,
    },
    {
      id: 'ORD-202',
      customer: 'Fatima Khan',
      location: 'Karachi',
      item: 'Anarkali Suit',
      style: 'traditional',
      description: 'Pastel pink anarkali with chikan embroidery and silver gota work on borders',
      budget: '15,000 - 22,000',
      deadline: '5 Jan 2025',
      image: dressPreview,
      accessories: ['Chantilly Lace', 'Mirror Work'],
      measurements: { bust: '34', waist: '26', hips: '36', length: '52' },
      postedAgo: '5 hours ago',
      bidsCount: 2,
    },
    {
      id: 'ORD-203',
      customer: 'Ayesha Ali',
      location: 'Islamabad',
      item: 'Party Gown',
      style: 'casual',
      description: 'Navy blue evening gown with sequin embellishments and flared sleeves',
      budget: '12,000 - 18,000',
      deadline: '2 Jan 2025',
      image: dressPreview,
      accessories: ['Crystal Sequins', 'Stone Work'],
      measurements: { bust: '32', waist: '24', hips: '34', length: '54' },
      postedAgo: '1 day ago',
      bidsCount: 6,
    },
    {
      id: 'ORD-204',
      customer: 'Hira Malik',
      location: 'Lahore',
      item: 'Walima Dress',
      style: 'bridal',
      description: 'Ivory white heavily embroidered dress with pearl and crystal work',
      budget: '50,000 - 70,000',
      deadline: '15 Jan 2025',
      image: dressPreview,
      accessories: ['Gold Pearl Buttons', 'Tassels', 'Zari Border'],
      measurements: { bust: '35', waist: '27', hips: '37', length: '44' },
      postedAgo: '3 hours ago',
      bidsCount: 3,
    },
  ];

  const filteredOrders = filter === 'all' 
    ? availableOrders 
    : availableOrders.filter(o => o.style === filter);

  const handleSubmitBid = (orderId: string) => {
    const amount = bidAmounts[orderId];
    const days = bidDays[orderId];
    const message = bidMessages[orderId];

    if (!amount || !days) {
      toast.error('Please enter bid amount and estimated days');
      return;
    }

    setSubmittedBids(prev => [...prev, orderId]);
    toast.success('Bid submitted successfully! 🎉', {
      description: `Your bid of Rs. ${amount} has been sent to ${availableOrders.find(o => o.id === orderId)?.customer}`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Gavel className="w-8 h-8 text-gold animate-bounce-soft" />
          Browse & Bid
        </h1>
        <p className="text-muted-foreground">Find customer orders and submit your bids</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Available Orders', value: '12', icon: Package, color: 'from-primary to-rose' },
          { label: 'Your Active Bids', value: submittedBids.length.toString(), icon: Gavel, color: 'from-gold to-coral' },
          { label: 'Won This Month', value: '5', icon: Star, color: 'from-mint to-secondary' },
          { label: 'Success Rate', value: '78%', icon: Sparkles, color: 'from-lavender to-primary' },
        ].map((stat, i) => (
          <AnimatedCard key={i} variant="glass" hoverEffect="lift">
            <AnimatedCardContent className="pt-6 text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </AnimatedCardContent>
          </AnimatedCard>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-2',
              filter === f.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {f.label}
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              filter === f.id ? 'bg-primary-foreground/20' : 'bg-background'
            )}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order, index) => {
          const hasBid = submittedBids.includes(order.id);
          const isExpanded = expandedOrder === order.id;

          return (
            <AnimatedCard
              key={order.id}
              variant="bordered"
              hoverEffect="none"
              className={`animate-slide-up stagger-${index + 1} ${hasBid ? 'ring-2 ring-mint ring-offset-2' : ''}`}
            >
              <AnimatedCardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={order.image}
                      alt={order.item}
                      className="w-full lg:w-40 h-40 object-cover rounded-xl"
                    />
                    {hasBid && (
                      <div className="absolute top-2 left-2 bg-mint text-mint-foreground px-2 py-1 rounded-full text-xs font-medium">
                        Bid Sent ✓
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{order.item}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {order.customer}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {order.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{order.postedAgo}</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{order.description}</p>
                    
                    {/* Accessories */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {order.accessories.map((acc, i) => (
                        <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {acc}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="font-semibold text-lg text-gold">Rs. {order.budget}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Due: {order.deadline}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Gavel className="w-4 h-4" />
                        {order.bidsCount} bids
                      </span>
                    </div>

                    {/* Expandable Details */}
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="flex items-center gap-2 mt-3 text-sm text-primary hover:underline"
                    >
                      {isExpanded ? 'Hide Details' : 'View Details & Bid'}
                      <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
                    </button>
                  </div>
                </div>

                {/* Expanded Bid Section */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-border animate-fade-scale">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Measurements */}
                      <div>
                        <h4 className="font-medium mb-3">Customer Measurements</h4>
                        <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-xl">
                          {Object.entries(order.measurements).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-xs text-muted-foreground uppercase">{key}</p>
                              <p className="font-semibold">{value}"</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bid Form */}
                      <div className="space-y-4">
                        <h4 className="font-medium">Submit Your Bid</h4>
                        {hasBid ? (
                          <div className="p-4 bg-mint/10 border border-mint/30 rounded-xl text-center">
                            <p className="text-mint font-medium">✓ Bid Submitted!</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Rs. {bidAmounts[order.id]} • {bidDays[order.id]} days
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-4">
                              <AnimatedInput
                                label="Your Bid (Rs.)"
                                value={bidAmounts[order.id] || ''}
                                onChange={(e) => setBidAmounts(prev => ({ ...prev, [order.id]: e.target.value }))}
                                placeholder="45000"
                              />
                              <AnimatedInput
                                label="Estimated Days"
                                value={bidDays[order.id] || ''}
                                onChange={(e) => setBidDays(prev => ({ ...prev, [order.id]: e.target.value }))}
                                placeholder="10"
                              />
                            </div>
                            <AnimatedInput
                              label="Message to Customer (optional)"
                              value={bidMessages[order.id] || ''}
                              onChange={(e) => setBidMessages(prev => ({ ...prev, [order.id]: e.target.value }))}
                              placeholder="I specialize in bridal wear with 15 years experience..."
                            />
                            <Button
                              variant="hero"
                              size="lg"
                              className="w-full hover-bounce"
                              onClick={() => handleSubmitBid(order.id)}
                            >
                              <Send className="w-5 h-5 mr-2" />
                              Submit Bid
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </AnimatedCardContent>
            </AnimatedCard>
          );
        })}
      </div>
    </div>
  );
};

export default TailorBidding;
