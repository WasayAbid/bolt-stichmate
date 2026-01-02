import React, { useState, useRef, Suspense, lazy } from 'react';
import { Upload, Sparkles, Check, X, AlertTriangle, Wand2, Palette, ChevronDown, Image as ImageIcon, ArrowRight, Shirt, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDesign, Accessory } from '@/contexts/DesignContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load 3D component
const EnhancedScene3D = lazy(() => import('@/components/3d/EnhancedScene3D'));
const fabricTypes = [
  'Cotton', 'Silk', 'Chiffon', 'Georgette', 'Velvet', 'Lawn', 'Linen', 'Organza', 'Net', 'Jacquard'
];

const styleCards = [
  { id: 'salwar-kameez', name: 'Salwar Kameez', minLength: 4, image: '👗' },
  { id: 'angrakha', name: 'Angrakha', minLength: 4.5, image: '🥻' },
  { id: 'lehenga', name: 'Lehenga', minLength: 6, image: '👘' },
  { id: 'kurta', name: 'Simple Kurta', minLength: 2.5, image: '👔' },
  { id: 'frock', name: 'Frock', minLength: 3, image: '👗' },
  { id: 'palazzo-set', name: 'Palazzo Set', minLength: 5, image: '🩱' },
];

const necklineOptions = [
  'Round Neck', 'V-Neck', 'Boat Neck', 'Collar', 'Square Neck', 'Sweetheart'
];

const accessories: Accessory[] = [
  { id: 1, name: 'Pearl Buttons', price: 150, category: 'buttons' },
  { id: 2, name: 'Golden Buttons', price: 200, category: 'buttons' },
  { id: 3, name: 'Crystal Buttons', price: 350, category: 'buttons' },
  { id: 4, name: 'French Lace', price: 500, category: 'lace' },
  { id: 5, name: 'Chantilly Lace', price: 750, category: 'lace' },
  { id: 6, name: 'Gold Zari', price: 800, category: 'embroidery' },
  { id: 7, name: 'Thread Work', price: 600, category: 'embroidery' },
  { id: 8, name: 'Mirror Work', price: 450, category: 'embroidery' },
  { id: 9, name: 'Sequin Border', price: 300, category: 'border' },
  { id: 10, name: 'Velvet Piping', price: 250, category: 'border' },
];

const FabricToDesignStudio: React.FC = () => {
  const navigate = useNavigate();
  const [fabricImage, setFabricImage] = useState<string | null>(null);
  const [fabricLength, setFabricLength] = useState<string>('');
  const [fabricWidth, setFabricWidth] = useState<string>('');
  const [fabricType, setFabricType] = useState<string>('');
  const [fabricSubmitted, setFabricSubmitted] = useState(false);

  // Section 2: Design Request State
  const [designPrompt, setDesignPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedNeckline, setSelectedNeckline] = useState<string>('');

  // Section 3: Feasibility State
  const [feasibilityChecked, setFeasibilityChecked] = useState(false);
  const [isFeasible, setIsFeasible] = useState(false);
  const [feasibilityMessage, setFeasibilityMessage] = useState('');
  const [suggestedAlternatives, setSuggestedAlternatives] = useState<typeof styleCards>([]);

  // Section 4: Generated Designs State
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Section 5: Accessories State
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  const [placementInstructions, setPlacementInstructions] = useState('');

  const fabricInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  // Context
  const { setUploadedFabric, setSelectedDesign, addAccessory } = useDesign();

  // Section refs for smooth scrolling
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Handlers
  const handleFabricUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFabricImage(reader.result as string);
        setUploadedFabric(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setReferenceImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleContinueToDesign = () => {
    if (!fabricImage || !fabricLength || !fabricWidth || !fabricType) {
      toast.error('Please complete all fabric details');
      return;
    }
    setFabricSubmitted(true);
    toast.success('Fabric details saved! Now describe your design.');
    scrollToSection(section2Ref);
  };

  const handleCheckFeasibility = () => {
    if (!selectedStyle && !designPrompt) {
      toast.error('Please select a style or describe your design');
      return;
    }

    const length = parseFloat(fabricLength);
    const selectedStyleData = styleCards.find(s => s.id === selectedStyle);
    const minRequired = selectedStyleData?.minLength || 3;

    // Simulate feasibility check
    if (length >= minRequired) {
      setIsFeasible(true);
      setFeasibilityMessage(`✅ Great news! Your ${fabricType} fabric (${length}m) is sufficient for ${selectedStyleData?.name || 'this design'}. Ready to generate!`);
      setSuggestedAlternatives([]);
    } else {
      setIsFeasible(false);
      setFeasibilityMessage(`❌ Your fabric length (${length}m) is insufficient for ${selectedStyleData?.name || 'this design'} which requires ${minRequired}m minimum.`);
      setSuggestedAlternatives(styleCards.filter(s => s.minLength <= length));
    }

    setFeasibilityChecked(true);
    scrollToSection(section3Ref);
  };

  const handleGenerateDesigns = async () => {
    setIsGenerating(true);
    
    // Simulate AI design generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockDesigns = [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
    ];
    
    setGeneratedDesigns(mockDesigns);
    setIsGenerating(false);
    toast.success('Designs generated successfully!');
    scrollToSection(section4Ref);
  };

  const handleSelectDesign = (index: number) => {
    setSelectedDesignIndex(index);
    setSelectedDesign({
      id: `design-${index}`,
      name: `${selectedStyle || 'Custom'} Design ${index + 1}`,
      style: selectedStyle || 'custom',
      neckline: selectedNeckline,
      image: generatedDesigns[index],
      accessories: []
    });
    toast.success('Design selected! Now add accessories.');
    scrollToSection(section5Ref);
  };

  const toggleAccessory = (accessory: Accessory) => {
    const exists = selectedAccessories.find(a => a.id === accessory.id);
    if (exists) {
      setSelectedAccessories(prev => prev.filter(a => a.id !== accessory.id));
    } else {
      setSelectedAccessories(prev => [...prev, accessory]);
      addAccessory(accessory);
    }
  };

  const handleFinalizeDesign = () => {
    toast.success('Design finalized with accessories! Ready for virtual try-on or ordering.');
  };

  const handleProceedToTryOn = () => {
    if (selectedDesignIndex === null) {
      toast.error('Please select a design first');
      return;
    }
    toast.success('Navigating to Virtual Try-On...');
    navigate('/dashboard/tryon');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Fabric to Design Studio
          </h1>
          <p className="text-muted-foreground">Transform your fabric into stunning designs</p>
        </div>

        {/* Section 1: Fabric Input */}
        <section className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">1</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Upload Your Fabric</h2>
            {fabricSubmitted && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload Area */}
            <div
              onClick={() => !fabricSubmitted && fabricInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                fabricSubmitted ? 'border-green-500/50 bg-green-500/5' : 'border-primary/30 hover:border-primary/60 hover:bg-primary/5 cursor-pointer'
              }`}
            >
              <input
                ref={fabricInputRef}
                type="file"
                accept="image/*"
                onChange={handleFabricUpload}
                className="hidden"
                disabled={fabricSubmitted}
              />
              {fabricImage ? (
                <div className="space-y-3">
                  <img src={fabricImage} alt="Fabric" className="w-full h-40 object-cover rounded-lg" />
                  <p className="text-sm text-muted-foreground">Fabric uploaded</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 mx-auto text-primary/60 animate-bounce" />
                  <p className="text-muted-foreground">Drag & drop or click to upload fabric image</p>
                </div>
              )}
            </div>

            {/* Measurements */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (meters)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 4.5"
                    value={fabricLength}
                    onChange={(e) => setFabricLength(e.target.value)}
                    disabled={fabricSubmitted}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 1.2"
                    value={fabricWidth}
                    onChange={(e) => setFabricWidth(e.target.value)}
                    disabled={fabricSubmitted}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fabric Type</Label>
                <Select value={fabricType} onValueChange={setFabricType} disabled={fabricSubmitted}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fabric type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fabricTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!fabricSubmitted && (
                <Button 
                  onClick={handleContinueToDesign} 
                  className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all"
                  disabled={!fabricImage || !fabricLength || !fabricWidth || !fabricType}
                >
                  Continue to Design Request
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Design Request */}
        <section 
          ref={section2Ref}
          className={`bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg transition-all duration-500 ${
            !fabricSubmitted ? 'opacity-50 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              fabricSubmitted ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <span className={fabricSubmitted ? 'text-primary font-bold' : 'text-muted-foreground'}>2</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">Describe Your Design</h2>
            {feasibilityChecked && isFeasible && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </div>

          <div className="space-y-6">
            {/* Text Prompt */}
            <div className="space-y-2">
              <Label>Design Description</Label>
              <Textarea
                placeholder="e.g., Elegant salwar kameez with gold embroidery on neckline and sleeves..."
                value={designPrompt}
                onChange={(e) => setDesignPrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Reference Image */}
            <div className="space-y-2">
              <Label>Reference Image (Optional)</Label>
              <div
                onClick={() => referenceInputRef.current?.click()}
                className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-all"
              >
                <input
                  ref={referenceInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleReferenceUpload}
                  className="hidden"
                />
                {referenceImage ? (
                  <img src={referenceImage} alt="Reference" className="w-32 h-32 object-cover mx-auto rounded-lg" />
                ) : (
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon className="w-5 h-5" />
                    <span>Upload reference image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Style Cards */}
            <div className="space-y-2">
              <Label>Select Style</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {styleCards.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedStyle === style.id
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{style.image}</div>
                    <div className="font-medium text-foreground">{style.name}</div>
                    <div className="text-xs text-muted-foreground">Min: {style.minLength}m</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Neckline */}
            <div className="space-y-2">
              <Label>Neckline Style</Label>
              <Select value={selectedNeckline} onValueChange={setSelectedNeckline}>
                <SelectTrigger>
                  <SelectValue placeholder="Select neckline" />
                </SelectTrigger>
                <SelectContent>
                  {necklineOptions.map(neck => (
                    <SelectItem key={neck} value={neck}>{neck}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleCheckFeasibility}
              className="w-full bg-gradient-to-r from-accent to-secondary hover:opacity-90"
              disabled={!selectedStyle && !designPrompt}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Check Design Feasibility
            </Button>
          </div>
        </section>

        {/* Section 3: Feasibility Analysis */}
        {feasibilityChecked && (
          <section 
            ref={section3Ref}
            className={`rounded-2xl p-6 border shadow-lg transition-all duration-500 animate-fade-in ${
              isFeasible 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-destructive/10 border-destructive/30'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isFeasible ? 'bg-green-500/20' : 'bg-destructive/20'
              }`}>
                {isFeasible ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-destructive" />
                )}
              </div>
              <h2 className="text-xl font-semibold text-foreground">Feasibility Analysis</h2>
            </div>

            <p className={`text-lg ${isFeasible ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
              {feasibilityMessage}
            </p>

            {!isFeasible && suggestedAlternatives.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <AlertTriangle className="w-4 h-4" />
                  Suggested alternatives for your fabric length:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedAlternatives.map(alt => (
                    <button
                      key={alt.id}
                      onClick={() => {
                        setSelectedStyle(alt.id);
                        handleCheckFeasibility();
                      }}
                      className="px-4 py-2 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all flex items-center gap-2"
                    >
                      <span>{alt.image}</span>
                      <span>{alt.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isFeasible && (
              <Button 
                onClick={handleGenerateDesigns}
                className="mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Designs...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Design Previews
                  </>
                )}
              </Button>
            )}
          </section>
        )}

        {/* Section 4: Generated Designs */}
        {generatedDesigns.length > 0 && (
          <section 
            ref={section4Ref}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg animate-fade-in"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">4</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Choose Your Design</h2>
              {selectedDesignIndex !== null && <Check className="w-5 h-5 text-green-500 ml-auto" />}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {generatedDesigns.map((design, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectDesign(index)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    selectedDesignIndex === index
                      ? 'border-primary shadow-lg ring-2 ring-primary/30'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-6xl">👗</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                    <span className="font-medium text-foreground">Design {index + 1}</span>
                  </div>
                  {selectedDesignIndex === index && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Accessories Styling */}
        {selectedDesignIndex !== null && (
          <section 
            ref={section5Ref}
            className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg animate-fade-in"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">5</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Add Accessories</h2>
              <Palette className="w-5 h-5 text-accent ml-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Accessories Selection */}
              <div className="space-y-4">
                <Label>Select Accessories</Label>
                <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                  {accessories.map(acc => (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc)}
                      className={`p-3 rounded-lg border text-left transition-all duration-300 hover:scale-105 ${
                        selectedAccessories.find(a => a.id === acc.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-sm text-foreground">{acc.name}</div>
                      <div className="text-xs text-muted-foreground">PKR {acc.price}</div>
                    </button>
                  ))}
                </div>

                {/* Placement Instructions */}
                <div className="space-y-2">
                  <Label>Placement Instructions</Label>
                  <Textarea
                    placeholder="e.g., Add pearl buttons on neckline and French lace on sleeves..."
                    value={placementInstructions}
                    onChange={(e) => setPlacementInstructions(e.target.value)}
                  />
                </div>
              </div>

              {/* Live 3D Preview */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  Live 3D Preview
                  <RotateCw className="w-4 h-4 text-muted-foreground animate-spin-slow" />
                </Label>
                <Suspense fallback={
                  <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden border border-border/50">
                    <EnhancedScene3D 
                      accessories={selectedAccessories}
                      variant="studio"
                    />
                  </div>
                </Suspense>
                {selectedAccessories.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {selectedAccessories.map(acc => (
                      <motion.span 
                        key={acc.id} 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2 py-1 rounded-full bg-primary/20 text-xs text-primary"
                      >
                        + {acc.name}
                      </motion.span>
                    ))}
                  </div>
                )}

                {/* Selected Summary */}
                {selectedAccessories.length > 0 && (
                  <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Accessories ({selectedAccessories.length})</span>
                      <span className="font-medium text-foreground">
                        PKR {selectedAccessories.reduce((sum, a) => sum + a.price, 0)}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleFinalizeDesign}
                  className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Finalize Design
                </Button>

                {/* Proceed to Virtual Try-On Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button 
                    onClick={handleProceedToTryOn}
                    variant="gold"
                    size="lg"
                    className="w-full mt-3 group"
                  >
                    <Shirt className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Proceed to Virtual Try-On
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FabricToDesignStudio;
