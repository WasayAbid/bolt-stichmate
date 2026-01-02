import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShoppingBag, Send, Eye, Check, Star, Clock, DollarSign, 
  MessageSquare, User, MapPin, Truck, CreditCard, CheckCircle,
  ArrowRight, ArrowLeft, Sparkles, PartyPopper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { useDesign, Bid, Tailor } from '@/contexts/DesignContext';
import { cn } from '@/lib/utils';
import dressPreview from '@/assets/dress-preview.png';
import { ConfettiEffect } from '@/components/ui/FloatingElements';

type MarketplaceStep = 'post' | 'bids' | 'select' | 'booking' | 'payment' | 'review' | 'complete';

const MarketplaceBidding: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialStep = (searchParams.get('step') as MarketplaceStep) || 'post';
  
  const { selectedDesign, selectedAccessories, fabricAnalysis } = useDesign();
  const [currentStep, setCurrentStep] = useState<MarketplaceStep>(initialStep);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Form states
  const [orderNotes, setOrderNotes] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState<'urgent' | 'normal' | 'flexible'>('normal');
  
  // Bids state (simulated)
  const [bids] = useState<Bid[]>([
    {
      id: '1',
      tailor: { id: 't1', name: 'Ali Hassan', shopName: 'Master Ali Tailors', rating: 4.9, reviewCount: 156, specialties: ['Wedding', 'Traditional'] },
      amount: 5500,
      estimatedDays: 7,
      message: 'I have 20 years experience in traditional Pakistani wear. Will deliver premium quality!',
      createdAt: new Date(),
    },
    {
      id: '2',
      tailor: { id: 't2', name: 'Farhan Khan', shopName: 'Royal Stitch House', rating: 4.7, reviewCount: 89, specialties: ['Modern', 'Fusion'] },
      amount: 4800,
      estimatedDays: 5,
      message: 'Quick delivery with excellent craftsmanship. Free alterations included!',
      createdAt: new Date(),
    },
    {
      id: '3',
      tailor: { id: 't3', name: 'Usman Malik', shopName: 'Fashion Hub', rating: 4.8, reviewCount: 120, specialties: ['Casual', 'Traditional'] },
      amount: 5200,
      estimatedDays: 6,
      message: 'Specialized in embroidery work. Your design will look stunning!',
      createdAt: new Date(),
    },
  ]);
  
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  
  // Booking state
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    length: '',
    shoulder: '',
    sleeves: 'full',
    neckline: 'round',
    additionalNotes: '',
  });
  const [logistics, setLogistics] = useState<'home_pickup' | 'self_drop' | 'tailor_delivery'>('home_pickup');
  const [address, setAddress] = useState('');
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'jazzcash' | 'easypaisa'>('card');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  
  // Review state
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const steps = [
    { id: 'post', label: 'Post Order', icon: Send },
    { id: 'bids', label: 'View Bids', icon: Eye },
    { id: 'select', label: 'Select Tailor', icon: Check },
    { id: 'booking', label: 'Booking', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Star },
  ];

  const handlePostOrder = () => {
    setCurrentStep('bids');
  };

  const handleSelectTailor = (bid: Bid) => {
    setSelectedBid(bid);
    setSelectedTailor(bid.tailor);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCurrentStep('booking');
    }, 2000);
  };

  const handleBookingSubmit = () => {
    setCurrentStep('payment');
  };

  const handlePayment = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCurrentStep('complete');
    }, 2000);
  };

  const handleReviewSubmit = () => {
    setCurrentStep('complete');
  };

  const renderPostOrder = () => (
    <div className="space-y-6">
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader>
          <AnimatedCardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Post Your Order
          </AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          {/* Selected Design Preview */}
          <div className="p-4 bg-muted rounded-xl mb-6">
            <p className="text-sm font-medium mb-3">Selected Design & Fabric</p>
            <div className="flex gap-4">
              <img 
                src={selectedDesign?.image || dressPreview} 
                alt="Design" 
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <p className="font-semibold">{selectedDesign?.name || 'Traditional Kameez'}</p>
                <p className="text-sm text-muted-foreground">{fabricAnalysis?.type || 'Silk Chiffon'}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedAccessories.slice(0, 3).map(acc => (
                    <span key={acc.id} className="px-2 py-0.5 bg-primary/10 rounded-full text-xs">
                      {acc.name}
                    </span>
                  ))}
                  {selectedAccessories.length > 3 && (
                    <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                      +{selectedAccessories.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Describe any specific requirements, preferences, or special instructions..."
              className="w-full h-32 p-4 bg-muted border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
            />
          </div>

          {/* Delivery Preferences */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Delivery Timeline</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'urgent', label: 'Urgent', desc: '3-5 days', price: '+20%' },
                { id: 'normal', label: 'Normal', desc: '7-10 days', price: 'Standard' },
                { id: 'flexible', label: 'Flexible', desc: '10-14 days', price: '-10%' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setDeliveryPreference(opt.id as any)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-center transition-all",
                    deliveryPreference === opt.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  <p className="text-xs text-primary mt-1">{opt.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Date */}
          <div className="mb-6">
            <AnimatedInput
              label="Preferred Delivery Date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </div>

          <Button variant="hero" size="lg" className="w-full" onClick={handlePostOrder}>
            <Send className="w-5 h-5 mr-2" />
            Post Order for Bidding
          </Button>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );

  const renderBids = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tailor Bids ({bids.length})</h2>
        <span className="px-3 py-1 bg-mint/20 text-mint rounded-full text-sm animate-pulse">
          <Clock className="w-4 h-4 inline mr-1" />
          Bidding Open
        </span>
      </div>

      <div className="space-y-4">
        {bids.map((bid, index) => (
          <AnimatedCard 
            key={bid.id} 
            variant="bordered" 
            hoverEffect="lift"
            className={`animate-slide-up stagger-${index + 1}`}
          >
            <AnimatedCardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Tailor Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{bid.tailor.shopName}</h3>
                      <p className="text-sm text-muted-foreground">{bid.tailor.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-gold fill-gold" />
                          <span className="text-sm font-medium">{bid.tailor.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({bid.tailor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {bid.tailor.specialties.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-muted rounded-full text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-xl">
                    <MessageSquare className="w-4 h-4 text-muted-foreground inline mr-2" />
                    <span className="text-sm">{bid.message}</span>
                  </div>
                </div>

                {/* Bid Details */}
                <div className="md:w-48 text-center md:text-right">
                  <div className="text-3xl font-bold text-primary">Rs. {bid.amount.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-end gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {bid.estimatedDays} days delivery
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full mt-4"
                    onClick={() => handleSelectTailor(bid)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Select
                  </Button>
                </div>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Measurements */}
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader>
          <AnimatedCardTitle>Fitting Measurements</AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {['chest', 'waist', 'hips', 'length', 'shoulder'].map((field) => (
              <AnimatedInput
                key={field}
                label={`${field.charAt(0).toUpperCase() + field.slice(1)} (inches)`}
                type="number"
                value={measurements[field as keyof typeof measurements] as string}
                onChange={(e) => setMeasurements({ ...measurements, [field]: e.target.value })}
              />
            ))}
          </div>

          {/* Sleeves */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Sleeves Style</p>
            <div className="flex gap-2">
              {['full', 'three-quarter', 'half', 'sleeveless'].map((style) => (
                <button
                  key={style}
                  onClick={() => setMeasurements({ ...measurements, sleeves: style })}
                  className={cn(
                    "flex-1 py-2 rounded-xl border-2 text-sm capitalize transition-all",
                    measurements.sleeves === style
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Neckline */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Neckline Style</p>
            <div className="flex gap-2">
              {['round', 'v-neck', 'collar', 'boat'].map((style) => (
                <button
                  key={style}
                  onClick={() => setMeasurements({ ...measurements, neckline: style })}
                  className={cn(
                    "flex-1 py-2 rounded-xl border-2 text-sm capitalize transition-all",
                    measurements.neckline === style
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              value={measurements.additionalNotes}
              onChange={(e) => setMeasurements({ ...measurements, additionalNotes: e.target.value })}
              placeholder="Any specific embroidery placement, pocket requirements, etc..."
              className="w-full h-24 p-3 bg-muted border-2 border-border rounded-xl focus:border-primary transition-all outline-none resize-none text-sm"
            />
          </div>
        </AnimatedCardContent>
      </AnimatedCard>

      {/* Logistics */}
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader>
          <AnimatedCardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-mint" />
            Delivery Options
          </AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          <div className="space-y-3 mb-6">
            {[
              { id: 'home_pickup', label: 'Home Pickup', desc: 'Rider picks up fabric from your address', icon: MapPin },
              { id: 'self_drop', label: 'Self Drop', desc: 'You drop fabric at tailor shop', icon: MapPin },
              { id: 'tailor_delivery', label: 'Tailor Delivery', desc: 'Tailor delivers the finished order', icon: Truck },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setLogistics(opt.id as any)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all",
                  logistics === opt.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <opt.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-sm text-muted-foreground">{opt.desc}</p>
                </div>
                {logistics === opt.id && (
                  <CheckCircle className="w-6 h-6 text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>

          {(logistics === 'home_pickup' || logistics === 'tailor_delivery') && (
            <AnimatedInput
              label="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
            />
          )}

          {/* Order Summary */}
          <div className="mt-6 p-4 bg-muted rounded-xl">
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tailoring Cost</span>
                <span className="font-medium">Rs. {selectedBid?.amount.toLocaleString() || '5,500'}</span>
              </div>
              <div className="flex justify-between">
                <span>Accessories</span>
                <span className="font-medium">Rs. {selectedAccessories.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium">Rs. 200</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">Rs. {((selectedBid?.amount || 5500) + selectedAccessories.reduce((sum, a) => sum + a.price, 0) + 200).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <Button variant="hero" size="lg" className="w-full mt-6" onClick={handleBookingSubmit}>
            <ArrowRight className="w-5 h-5 mr-2" />
            Proceed to Payment
          </Button>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-xl mx-auto">
      <AnimatedCard variant="glass" hoverEffect="glow">
        <AnimatedCardHeader>
          <AnimatedCardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gold" />
            Secure Payment
          </AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            {[
              { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
              { id: 'jazzcash', label: 'JazzCash', icon: '📱' },
              { id: 'easypaisa', label: 'Easypaisa', icon: '📱' },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as any)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all",
                  paymentMethod === method.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <span className="text-2xl">{method.icon}</span>
                <span className="font-medium">{method.label}</span>
                {paymentMethod === method.id && (
                  <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                )}
              </button>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4 mb-6">
              <AnimatedInput
                label="Card Number"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                placeholder="1234 5678 9012 3456"
              />
              <div className="grid grid-cols-2 gap-4">
                <AnimatedInput
                  label="Expiry Date"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  placeholder="MM/YY"
                />
                <AnimatedInput
                  label="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                />
              </div>
            </div>
          )}

          {/* Total */}
          <div className="p-4 bg-muted rounded-xl mb-6">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-primary">
                Rs. {((selectedBid?.amount || 5500) + selectedAccessories.reduce((sum, a) => sum + a.price, 0) + 200).toLocaleString()}
              </span>
            </div>
          </div>

          <Button variant="hero" size="lg" className="w-full" onClick={handlePayment}>
            <Sparkles className="w-5 h-5 mr-2" />
            Pay Now
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            🔒 Your payment is secure and encrypted
          </p>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );

  const renderReview = () => (
    <div className="max-w-xl mx-auto">
      <AnimatedCard variant="glass" hoverEffect="glow">
        <AnimatedCardHeader>
          <AnimatedCardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" />
            Rate Your Experience
          </AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          {/* Tailor Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-xl mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{selectedTailor?.shopName || 'Master Ali Tailors'}</h3>
              <p className="text-sm text-muted-foreground">{selectedTailor?.name || 'Ali Hassan'}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium mb-3">How was your experience?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="hover:scale-125 transition-transform"
                >
                  <Star 
                    className={cn(
                      "w-10 h-10 transition-colors",
                      star <= rating ? "text-gold fill-gold" : "text-muted-foreground"
                    )} 
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {rating === 0 && 'Tap to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent!'}
            </p>
          </div>

          {/* Review Comment */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Share your feedback</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Tell others about your experience..."
              className="w-full h-32 p-4 bg-muted border-2 border-border rounded-xl focus:border-primary transition-all outline-none resize-none"
            />
          </div>

          <Button variant="hero" size="lg" className="w-full" onClick={handleReviewSubmit} disabled={rating === 0}>
            <Send className="w-5 h-5 mr-2" />
            Submit Review
          </Button>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );

  const renderComplete = () => (
    <div className="max-w-xl mx-auto text-center py-12">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-mint to-secondary flex items-center justify-center animate-bounce-soft">
        <PartyPopper className="w-12 h-12 text-primary-foreground" />
      </div>
      <h1 className="text-3xl font-bold mb-3">Order Complete!</h1>
      <p className="text-muted-foreground mb-8">
        Thank you for your order. Your tailor will start working on your design soon.
      </p>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={() => navigate('/dashboard/orders')}>
          View My Orders
        </Button>
        <Button variant="hero" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-gold" />
            Marketplace & Orders
          </h1>
          <p className="text-muted-foreground">Post orders, receive bids, and book tailors</p>
        </div>
      </div>

      {/* Progress Steps */}
      {currentStep !== 'complete' && (
        <div className="flex justify-between items-center overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const stepIndex = steps.findIndex(s => s.id === step.id);
            const currentIndex = steps.findIndex(s => s.id === currentStep);
            const isCompleted = stepIndex < currentIndex;
            const isCurrent = step.id === currentStep;
            
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center min-w-[80px]">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    isCompleted && "bg-mint text-secondary-foreground",
                    isCurrent && "bg-primary text-primary-foreground animate-pulse-glow",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                  )}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 whitespace-nowrap",
                    isCurrent ? "font-semibold text-primary" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2",
                    stepIndex < currentIndex ? "bg-mint" : "bg-muted"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Step Content */}
      {currentStep === 'post' && renderPostOrder()}
      {currentStep === 'bids' && renderBids()}
      {currentStep === 'select' && renderBids()}
      {currentStep === 'booking' && renderBooking()}
      {currentStep === 'payment' && renderPayment()}
      {currentStep === 'review' && renderReview()}
      {currentStep === 'complete' && renderComplete()}
    </div>
  );
};

export default MarketplaceBidding;
