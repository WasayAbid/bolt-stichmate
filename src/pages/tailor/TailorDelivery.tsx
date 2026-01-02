import React from 'react';
import { Truck, MapPin, Clock, CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { cn } from '@/lib/utils';

/**
 * TailorDelivery - Delivery and pickup management for tailors
 */
const TailorDelivery: React.FC = () => {
  const deliveries = [
    {
      id: 'DEL-001',
      orderId: 'ORD-098',
      customer: 'Amina Bibi',
      item: 'Wedding Dress',
      address: 'House 45, Street 12, DHA Phase 5, Lahore',
      status: 'in_transit',
      scheduledDate: '22 Dec 2024',
      type: 'delivery',
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-099',
      customer: 'Nadia Shah',
      item: 'Casual Kurta',
      address: 'Apt 203, Liberty Market, Lahore',
      status: 'pending',
      scheduledDate: '23 Dec 2024',
      type: 'pickup',
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-100',
      customer: 'Zara Ahmed',
      item: 'Party Wear',
      address: 'Mall Road, Gulberg III, Lahore',
      status: 'delivered',
      scheduledDate: '20 Dec 2024',
      type: 'delivery',
    },
  ];

  const getStatusInfo = (status: string) => {
    const info: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-gold/20 text-gold', label: 'Pending' },
      in_transit: { color: 'bg-primary/20 text-primary', label: 'In Transit' },
      delivered: { color: 'bg-mint/20 text-mint', label: 'Delivered' },
      picked_up: { color: 'bg-secondary text-secondary-foreground', label: 'Picked Up' },
    };
    return info[status] || { color: 'bg-muted', label: status };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Truck className="w-8 h-8 text-coral" />
          Deliveries & Pickups
        </h1>
        <p className="text-muted-foreground">Manage your order deliveries and customer pickups</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <AnimatedCard variant="bordered" hoverEffect="lift">
          <AnimatedCardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-gold/20 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-gold" />
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </AnimatedCardContent>
        </AnimatedCard>
        <AnimatedCard variant="bordered" hoverEffect="lift">
          <AnimatedCardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/20 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">In Transit</p>
          </AnimatedCardContent>
        </AnimatedCard>
        <AnimatedCard variant="bordered" hoverEffect="lift">
          <AnimatedCardContent className="pt-6 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-mint/20 flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-mint" />
            </div>
            <p className="text-2xl font-bold">28</p>
            <p className="text-sm text-muted-foreground">Completed This Month</p>
          </AnimatedCardContent>
        </AnimatedCard>
      </div>

      {/* Delivery List */}
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader>
          <AnimatedCardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Active Deliveries
          </AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          <div className="space-y-4">
            {deliveries.map((delivery, index) => {
              const statusInfo = getStatusInfo(delivery.status);
              return (
                <div
                  key={delivery.id}
                  className={`flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-muted/30 rounded-xl gap-4 animate-slide-up stagger-${index + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      delivery.type === 'delivery' ? 'bg-coral/20' : 'bg-lavender/20'
                    )}>
                      {delivery.type === 'delivery' ? (
                        <Truck className="w-6 h-6 text-coral" />
                      ) : (
                        <Package className="w-6 h-6 text-lavender" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{delivery.item}</span>
                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusInfo.color)}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{delivery.customer} • {delivery.orderId}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {delivery.address}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">{delivery.scheduledDate}</p>
                      <p className="text-xs text-muted-foreground capitalize">{delivery.type}</p>
                    </div>
                    {delivery.status !== 'delivered' && (
                      <Button variant="outline" size="sm">
                        {delivery.status === 'pending' ? 'Start' : 'Complete'}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );
};

export default TailorDelivery;
