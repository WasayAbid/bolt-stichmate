import React, { useState } from 'react';
import { Package, Check, X, Clock, MessageSquare, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { cn } from '@/lib/utils';
import dressPreview from '@/assets/dress-preview.png';

/**
 * TailorOrders - Order requests management for tailors
 */
const TailorOrders: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'completed', label: 'Completed' },
  ];

  const orders = [
    {
      id: 'ORD-101',
      customer: 'Sarah Ahmed',
      item: 'Bridal Lehenga',
      description: 'Red silk lehenga with gold zari work',
      price: 45000,
      status: 'pending',
      dueDate: '28 Dec 2024',
      image: dressPreview,
      measurements: { bust: '36', waist: '28', hips: '38', length: '42' },
    },
    {
      id: 'ORD-102',
      customer: 'Fatima Khan',
      item: 'Silk Kameez',
      description: 'Pastel pink silk kameez with embroidery',
      price: 8500,
      status: 'accepted',
      dueDate: '30 Dec 2024',
      image: dressPreview,
      measurements: { bust: '34', waist: '26', hips: '36', length: '38' },
    },
    {
      id: 'ORD-103',
      customer: 'Ayesha Ali',
      item: 'Party Gown',
      description: 'Navy blue evening gown with sequins',
      price: 15000,
      status: 'pending',
      dueDate: '2 Jan 2025',
      image: dressPreview,
      measurements: { bust: '32', waist: '24', hips: '34', length: '52' },
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-gold/20 text-gold',
      accepted: 'bg-mint/20 text-mint',
      completed: 'bg-secondary text-secondary-foreground',
      rejected: 'bg-destructive/20 text-destructive',
    };
    return styles[status] || 'bg-muted';
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Package className="w-8 h-8 text-primary" />
          Order Requests
        </h1>
        <p className="text-muted-foreground">Manage incoming order requests</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300',
              filter === f.id
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <AnimatedCard
            key={order.id}
            variant="bordered"
            hoverEffect="none"
            className={`animate-slide-up stagger-${index + 1}`}
          >
            <AnimatedCardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <img
                  src={order.image}
                  alt={order.item}
                  className="w-full lg:w-32 h-32 object-cover rounded-xl"
                />

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{order.item}</h3>
                      <p className="text-sm text-muted-foreground">{order.id} • {order.customer}</p>
                    </div>
                    <span className={cn('px-3 py-1 rounded-full text-xs font-medium capitalize', getStatusBadge(order.status))}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{order.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-semibold text-lg text-primary">Rs. {order.price.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Due: {order.dueDate}
                    </span>
                  </div>

                  {/* Expandable Measurements */}
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="flex items-center gap-2 mt-3 text-sm text-primary hover:underline"
                  >
                    View Measurements
                    <ChevronDown className={cn('w-4 h-4 transition-transform', expandedOrder === order.id && 'rotate-180')} />
                  </button>

                  {expandedOrder === order.id && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-xl animate-fade-scale">
                      <div className="grid grid-cols-4 gap-4 text-center">
                        {Object.entries(order.measurements).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-xs text-muted-foreground uppercase">{key}</p>
                            <p className="font-semibold">{value}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  {order.status === 'pending' && (
                    <>
                      <Button variant="mint" size="sm" className="flex-1 hover-bounce">
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-destructive hover:bg-destructive/10">
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default TailorOrders;
