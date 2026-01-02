import React from 'react';
import { Package, Truck, CheckCircle, Clock, Scissors, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { cn } from '@/lib/utils';
import dressPreview from '@/assets/dress-preview.png';

/**
 * MyOrders - Page for viewing order history and tracking
 */
const MyOrders: React.FC = () => {
  const orders = [
    {
      id: 'ORD-001',
      item: 'Embroidered Silk Kameez',
      tailor: 'Master Ali Tailors',
      status: 'stitching',
      progress: 65,
      estimatedDelivery: '25 Dec 2024',
      image: dressPreview,
      timeline: [
        { step: 'Order Placed', completed: true, date: '15 Dec' },
        { step: 'Fabric Cutting', completed: true, date: '17 Dec' },
        { step: 'Stitching', completed: false, date: 'In Progress' },
        { step: 'Finishing', completed: false, date: 'Pending' },
        { step: 'Delivery', completed: false, date: '25 Dec' },
      ],
    },
    {
      id: 'ORD-002',
      item: 'Wedding Lehenga Set',
      tailor: 'Royal Stitch House',
      status: 'cutting',
      progress: 30,
      estimatedDelivery: '5 Jan 2025',
      image: dressPreview,
      timeline: [
        { step: 'Order Placed', completed: true, date: '20 Dec' },
        { step: 'Fabric Cutting', completed: false, date: 'In Progress' },
        { step: 'Stitching', completed: false, date: 'Pending' },
        { step: 'Finishing', completed: false, date: 'Pending' },
        { step: 'Delivery', completed: false, date: '5 Jan' },
      ],
    },
    {
      id: 'ORD-003',
      item: 'Casual Kurta',
      tailor: 'Fashion Hub',
      status: 'delivered',
      progress: 100,
      estimatedDelivery: '10 Dec 2024',
      image: dressPreview,
      timeline: [
        { step: 'Order Placed', completed: true, date: '1 Dec' },
        { step: 'Fabric Cutting', completed: true, date: '3 Dec' },
        { step: 'Stitching', completed: true, date: '6 Dec' },
        { step: 'Finishing', completed: true, date: '8 Dec' },
        { step: 'Delivery', completed: true, date: '10 Dec' },
      ],
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      cutting: 'bg-gold/20 text-gold',
      stitching: 'bg-primary/20 text-primary',
      finishing: 'bg-mint/20 text-mint',
      delivered: 'bg-secondary text-secondary-foreground',
    };
    return styles[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Package className="w-8 h-8 text-coral" />
          My Orders
        </h1>
        <p className="text-muted-foreground">Track your orders and view order history</p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order, index) => (
          <AnimatedCard
            key={order.id}
            variant="bordered"
            hoverEffect="glow"
            className={`animate-slide-up stagger-${index + 1}`}
          >
            <AnimatedCardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Order Info */}
                <div className="flex gap-4 lg:w-1/3">
                  <img
                    src={order.image}
                    alt={order.item}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{order.item}</h3>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Scissors className="w-3 h-3" />
                      {order.tailor}
                    </p>
                    <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 capitalize', getStatusBadge(order.status))}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">Order Progress</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Est. {order.estimatedDelivery}
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-mint to-gold rounded-full transition-all duration-1000 relative"
                      style={{ width: `${order.progress}%` }}
                    >
                      {order.status !== 'delivered' && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4">
                          <Scissors className="w-4 h-4 text-primary-foreground animate-sewing" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline Steps */}
                  <div className="flex justify-between">
                    {order.timeline.map((step, i) => (
                      <div key={i} className="flex flex-col items-center text-center">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all',
                          step.completed
                            ? 'bg-mint text-secondary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}>
                          {step.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>
                        <p className="text-xs font-medium hidden sm:block">{step.step}</p>
                        <p className="text-xs text-muted-foreground">{step.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:w-32">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    Track
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
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

export default MyOrders;
