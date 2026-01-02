import React, { useState, Suspense, lazy } from 'react';
import { Shirt, Upload, Move, RotateCw, ZoomIn, ZoomOut, Check, ArrowLeft, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { useDesign } from '@/contexts/DesignContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import dressPreview from '@/assets/dress-preview.png';

// Lazy load enhanced 3D component for better performance
const EnhancedTryOnScene = lazy(() => import('@/components/3d/EnhancedTryOnScene'));

/**
 * VirtualTryOn - Enhanced 3D Virtual Try-On Experience
 */
const VirtualTryOn: React.FC = () => {
  const navigate = useNavigate();
  const { selectedDesign, selectedAccessories, uploadedFabric } = useDesign();
  
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedDress, setSelectedDress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [show3D, setShow3D] = useState(false);

  const dresses = selectedDesign 
    ? [{ id: 1, name: selectedDesign.name, image: selectedDesign.image || dressPreview }]
    : [
        { id: 1, name: 'Traditional Kameez', image: dressPreview },
        { id: 2, name: 'Modern Gown', image: dressPreview },
        { id: 3, name: 'Bridal Lehenga', image: dressPreview },
      ];

  const handleTryOn = async () => {
    if (!userImage) {
      toast.error('Please upload your photo first');
      return;
    }
    setIsProcessing(true);
    setShow3D(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setTryOnResult(dressPreview);
    setIsProcessing(false);
    toast.success('Virtual try-on complete!');
  };

  const handleOrderDesign = () => {
    toast.success('Navigating to order page...');
    navigate('/dashboard/bidding');
  };

  return (
    <div className="space-y-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-4 mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard/studio')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Studio
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shirt className="w-8 h-8 text-primary" />
          </motion.div>
          Virtual Try-On Studio
        </h1>
        <p className="text-muted-foreground">Experience your design in immersive 3D before ordering</p>
      </motion.div>

      {/* Selected Design Info */}
      {selectedDesign && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary/10 rounded-xl p-4 border border-primary/30 relative z-10"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl">
              👗
            </div>
            <div>
              <p className="font-semibold text-foreground">{selectedDesign.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedDesign.neckline} • {selectedAccessories.length} accessories
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-primary ml-auto animate-pulse" />
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* User Photo Upload */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatedCard variant="bordered" hoverEffect="lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle>Your Photo</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              {userImage ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative rounded-xl overflow-hidden"
                >
                  <img
                    src={userImage}
                    alt="Your photo"
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    variant="glass"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => setUserImage(null)}
                  >
                    Change
                  </Button>
                </motion.div>
              ) : (
                <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors group">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Upload className="w-10 h-10 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
                  </motion.div>
                  <p className="font-medium">Upload your photo</p>
                  <p className="text-sm text-muted-foreground">For best results, use a full-body photo</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => setUserImage(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              )}
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>

        {/* Dress Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatedCard variant="bordered" hoverEffect="lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle>Select Design</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="space-y-3">
                {dresses.map((dress, index) => (
                  <motion.button
                    key={dress.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDress(index)}
                    className={`
                      w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all duration-300
                      ${selectedDress === index
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{dress.name}</p>
                      <p className="text-sm text-muted-foreground">AI Generated</p>
                    </div>
                    <AnimatePresence>
                      {selectedDress === index && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-4"
                  onClick={handleTryOn}
                  disabled={!userImage || isProcessing}
                >
                  {isProcessing ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="flex items-center"
                    >
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Processing 3D Try-On...
                    </motion.span>
                  ) : (
                    <>
                      <Shirt className="w-4 h-4 mr-2" />
                      Try On in 3D
                    </>
                  )}
                </Button>
              </motion.div>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>

        {/* 3D Result */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedCard variant="glass" hoverEffect="glow">
            <AnimatedCardHeader>
              <AnimatedCardTitle>3D Try-On Result</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              {show3D ? (
                <div className="space-y-4">
                  <Suspense fallback={
                    <div className="h-80 flex items-center justify-center">
                      <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  }>
                    <div className="h-80 rounded-xl overflow-hidden">
                      <EnhancedTryOnScene 
                        userImage={userImage} 
                        isProcessing={isProcessing}
                        showResult={!!tryOnResult}
                      />
                    </div>
                  </Suspense>
                  
                  {tryOnResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* 3D Controls */}
                      <div className="flex justify-center gap-2">
                        <Button variant="outline" size="icon">
                          <Move className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <RotateCw className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          variant="gold" 
                          size="lg" 
                          className="w-full"
                          onClick={handleOrderDesign}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Order This Design
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotateY: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shirt className="w-16 h-16 text-muted-foreground mb-4" />
                  </motion.div>
                  <p className="text-muted-foreground">
                    Upload your photo and select a design to experience immersive 3D try-on
                  </p>
                </div>
              )}
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
