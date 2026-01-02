import React, { useState, useCallback } from 'react';
import { 
  Upload, Scan, Sparkles, Palette, Wand2, RefreshCw, Download, Heart, 
  X, GripVertical, Star, ArrowRight, ArrowLeft, Eye, Check, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { useDesign } from '@/contexts/DesignContext';
import { useNavigate } from 'react-router-dom';
import fabricPattern from '@/assets/fabric-pattern.png';
import dressPreview from '@/assets/dress-preview.png';

type Step = 'upload' | 'design' | 'accessories' | 'preview';

/**
 * DesignStudio - Unified page for fabric upload, AI design, and accessories styling
 */
const DesignStudio: React.FC = () => {
  const navigate = useNavigate();
  const { setUploadedFabric, setSelectedDesign, addAccessory, clearAccessories } = useDesign();
  
  // Current step
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  
  // Step 1: Fabric Upload
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fabricMeasurements, setFabricMeasurements] = useState({ length: '', width: '', type: 'Silk' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    type: string;
    color: string;
    pattern: string;
    quality: string;
  } | null>(null);
  
  // Step 2: Design Generation
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const [designPrompt, setDesignPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);
  const [chosenDesign, setChosenDesign] = useState<string | null>(null);
  
  // Step 3: Accessories
  const [placedAccessories, setPlacedAccessories] = useState<Array<{id: number; name: string; position: {x: number; y: number}}>>([]);
  const [accessoriesPrompt, setAccessoriesPrompt] = useState('');
  const [isApplyingAccessories, setIsApplyingAccessories] = useState(false);
  const [finalDesignWithAccessories, setFinalDesignWithAccessories] = useState<string | null>(null);
  
  const styles = [
    { id: 'traditional', label: 'Traditional', emoji: '🏛️' },
    { id: 'modern', label: 'Modern', emoji: '✨' },
    { id: 'fusion', label: 'Fusion', emoji: '🎨' },
    { id: 'bridal', label: 'Bridal', emoji: '💍' },
    { id: 'casual', label: 'Casual', emoji: '👗' },
    { id: 'anarkali', label: 'Anarkali', emoji: '🌸' },
    { id: 'lehenga', label: 'Lehenga', emoji: '👸' },
    { id: 'salwar', label: 'Salwar Kameez', emoji: '🪷' },
  ];
  
  const accessories = [
    { id: 1, name: 'Gold Pearl Buttons', emoji: '🔘', color: 'from-gold to-coral' },
    { id: 2, name: 'Floral Embroidery', emoji: '🌺', color: 'from-primary to-rose' },
    { id: 3, name: 'Crystal Sequins', emoji: '💎', color: 'from-lavender to-primary' },
    { id: 4, name: 'Chantilly Lace', emoji: '🎀', color: 'from-mint to-secondary' },
    { id: 5, name: 'Zari Border', emoji: '✨', color: 'from-gold to-accent' },
    { id: 6, name: 'Mirror Work', emoji: '🪞', color: 'from-coral to-rose' },
    { id: 7, name: 'Tassels', emoji: '🎊', color: 'from-gold to-primary' },
    { id: 8, name: 'Stone Work', emoji: '💠', color: 'from-mint to-lavender' },
  ];
  
  const steps = [
    { id: 'upload', label: 'Upload Fabric', icon: Upload },
    { id: 'design', label: 'Generate Design', icon: Palette },
    { id: 'accessories', label: 'Add Accessories', icon: Layers },
    { id: 'preview', label: 'Final Preview', icon: Eye },
  ];

  // Handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysisResult({
      type: fabricMeasurements.type || 'Silk Chiffon',
      color: 'Pastel Pink with Gold Accents',
      pattern: 'Traditional Floral Embroidery',
      quality: 'Premium Grade A',
    });
    setUploadedFabric(uploadedImage);
    setIsAnalyzing(false);
  };

  const handleGenerateDesigns = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGeneratedDesigns([dressPreview, dressPreview, dressPreview, dressPreview]);
    setIsGenerating(false);
  };

  const handleSelectDesign = (design: string) => {
    setChosenDesign(design);
    // Create a design object for context
    setSelectedDesign({
      id: `design-${Date.now()}`,
      name: `${selectedStyle} Design`,
      style: selectedStyle,
      neckline: 'round',
      image: design,
      accessories: []
    });
  };

  const handleAddAccessory = (acc: typeof accessories[0]) => {
    if (placedAccessories.find(a => a.id === acc.id)) {
      setPlacedAccessories(prev => prev.filter(a => a.id !== acc.id));
    } else {
      setPlacedAccessories(prev => [...prev, { 
        id: acc.id, 
        name: acc.name, 
        position: { x: Math.random() * 50 + 25, y: Math.random() * 50 + 25 } 
      }]);
    }
  };

  const handleApplyAccessories = async () => {
    setIsApplyingAccessories(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFinalDesignWithAccessories(chosenDesign);
    // Save accessories to context
    clearAccessories();
    placedAccessories.forEach(acc => {
      addAccessory({ id: acc.id, name: acc.name, price: 0, category: 'general' });
    });
    setIsApplyingAccessories(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'upload': return !!analysisResult;
      case 'design': return !!chosenDesign;
      case 'accessories': return placedAccessories.length > 0 || accessoriesPrompt.length > 0;
      case 'preview': return true;
      default: return false;
    }
  };

  const goToNext = () => {
    const stepOrder: Step[] = ['upload', 'design', 'accessories', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPrevious = () => {
    const stepOrder: Step[] = ['upload', 'design', 'accessories', 'preview'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Palette className="w-8 h-8 text-primary" />
          Design Studio
        </h1>
        <p className="text-muted-foreground">Upload fabric → Generate AI designs → Add accessories → Preview</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between bg-card rounded-2xl p-4 border border-border">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isPast = steps.findIndex(s => s.id === currentStep) > index;
          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => {
                  // Only allow going back or to completed steps
                  if (isPast || isActive) setCurrentStep(step.id as Step);
                }}
                className={`flex flex-col items-center gap-2 transition-all ${
                  isActive ? 'scale-110' : isPast ? 'opacity-80' : 'opacity-40'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' :
                  isPast ? 'bg-mint text-mint-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {isPast ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full ${isPast ? 'bg-mint' : 'bg-muted'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[500px]">
        {/* Step 1: Fabric Upload */}
        {currentStep === 'upload' && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
            <AnimatedCard variant="bordered">
              <AnimatedCardHeader>
                <AnimatedCardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Your Fabric
                </AnimatedCardTitle>
              </AnimatedCardHeader>
              <AnimatedCardContent>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    dragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50'
                  } ${uploadedImage ? 'border-mint' : ''}`}
                >
                  {uploadedImage ? (
                    <div className="relative">
                      <img src={uploadedImage} alt="Uploaded fabric" className="w-full h-48 object-cover rounded-xl" />
                      <button
                        onClick={() => { setUploadedImage(null); setAnalysisResult(null); }}
                        className="absolute top-2 right-2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-mint/20 flex items-center justify-center animate-bounce-soft">
                        <Scan className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium mb-2">Drag & drop your fabric image</p>
                      <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                  <img src={fabricPattern} alt="" className="absolute -top-4 -right-4 w-16 h-16 opacity-20 animate-float pointer-events-none" />
                </div>

                {/* Measurements */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <AnimatedInput
                    label="Length (meters)"
                    value={fabricMeasurements.length}
                    onChange={(e) => setFabricMeasurements({ ...fabricMeasurements, length: e.target.value })}
                    placeholder="2.5"
                  />
                  <AnimatedInput
                    label="Width (meters)"
                    value={fabricMeasurements.width}
                    onChange={(e) => setFabricMeasurements({ ...fabricMeasurements, width: e.target.value })}
                    placeholder="1.5"
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Fabric Type</label>
                    <select
                      value={fabricMeasurements.type}
                      onChange={(e) => setFabricMeasurements({ ...fabricMeasurements, type: e.target.value })}
                      className="w-full h-12 px-4 bg-card border-2 border-border rounded-xl focus:border-primary outline-none"
                    >
                      <option>Silk</option>
                      <option>Cotton</option>
                      <option>Chiffon</option>
                      <option>Velvet</option>
                      <option>Organza</option>
                    </select>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleAnalyze}
                  disabled={!uploadedImage || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing Fabric...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Analyze Fabric
                    </span>
                  )}
                </Button>
              </AnimatedCardContent>
            </AnimatedCard>

            <AnimatedCard variant="glass" hoverEffect="glow">
              <AnimatedCardHeader>
                <AnimatedCardTitle className="flex items-center gap-2">
                  <Scan className="w-5 h-5 text-mint" />
                  Analysis Result
                </AnimatedCardTitle>
              </AnimatedCardHeader>
              <AnimatedCardContent>
                {analysisResult ? (
                  <div className="space-y-4 animate-fade-scale">
                    {Object.entries(analysisResult).map(([key, value]) => (
                      <div key={key} className="p-4 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-medium text-lg">{value}</p>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-mint mt-4">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Fabric analysis complete!</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Scan className="w-10 h-10 text-muted-foreground animate-pulse" />
                    </div>
                    <p className="text-muted-foreground">Upload a fabric image to see AI analysis</p>
                  </div>
                )}
              </AnimatedCardContent>
            </AnimatedCard>
          </div>
        )}

        {/* Step 2: Design Generation */}
        {currentStep === 'design' && (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            <AnimatedCard variant="bordered" className="lg:col-span-1">
              <AnimatedCardHeader>
                <AnimatedCardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-gold" />
                  Design Settings
                </AnimatedCardTitle>
              </AnimatedCardHeader>
              <AnimatedCardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-2">Your Fabric</p>
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={uploadedImage || fabricPattern} alt="Selected fabric" className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                    <p className="absolute bottom-2 left-2 text-sm text-primary-foreground font-medium">
                      {analysisResult?.type || 'Fabric'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">Choose Style</p>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedStyle === style.id
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-xl mb-1 block">{style.emoji}</span>
                        <span className="text-sm font-medium">{style.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatedInput
                  label="Design Prompt (optional)"
                  value={designPrompt}
                  onChange={(e) => setDesignPrompt(e.target.value)}
                  placeholder="E.g., Add gold zari work on borders..."
                />

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={handleGenerateDesigns}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating Magic...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Generate Designs
                    </span>
                  )}
                </Button>
              </AnimatedCardContent>
            </AnimatedCard>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Designs</h2>
                {generatedDesigns.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleGenerateDesigns}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                )}
              </div>

              {generatedDesigns.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {generatedDesigns.map((design, index) => (
                    <AnimatedCard
                      key={index}
                      variant={chosenDesign === design ? 'default' : 'glass'}
                      hoverEffect="lift"
                      className={`overflow-hidden cursor-pointer animate-fade-scale stagger-${index + 1} ${
                        chosenDesign === design ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      onClick={() => handleSelectDesign(design)}
                    >
                      <div className="relative group">
                        <img src={design} alt={`Design ${index + 1}`} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                        {chosenDesign === design && (
                          <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <p className="font-medium">Design #{index + 1}</p>
                        <p className="text-sm text-muted-foreground capitalize">{selectedStyle} Style</p>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              ) : (
                <AnimatedCard variant="bordered" className="flex flex-col items-center justify-center py-16">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center mb-4 animate-pulse">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-lg font-medium mb-2">No designs yet</p>
                  <p className="text-muted-foreground text-center max-w-md">
                    Select a style and click "Generate Designs" to see AI-created outfits
                  </p>
                </AnimatedCard>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Accessories */}
        {currentStep === 'accessories' && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold mb-4">Add Accessories</h2>
              <p className="text-muted-foreground mb-6">Select accessories to add to your design, or describe what you want</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {accessories.map((acc) => {
                  const isSelected = placedAccessories.find(a => a.id === acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => handleAddAccessory(acc)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl block mb-2">{acc.emoji}</span>
                      <span className="text-xs font-medium">{acc.name}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary mx-auto mt-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatedInput
                label="Describe accessories placement (optional)"
                value={accessoriesPrompt}
                onChange={(e) => setAccessoriesPrompt(e.target.value)}
                placeholder="E.g., Add gold buttons on the front, lace on sleeves..."
              />

              <Button
                variant="hero"
                size="lg"
                className="w-full mt-6"
                onClick={handleApplyAccessories}
                disabled={isApplyingAccessories || (placedAccessories.length === 0 && !accessoriesPrompt)}
              >
                {isApplyingAccessories ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Applying Accessories...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Apply Accessories
                  </span>
                )}
              </Button>
            </div>

            <AnimatedCard variant="glass" className="relative overflow-hidden">
              <AnimatedCardHeader>
                <AnimatedCardTitle>Design Preview</AnimatedCardTitle>
              </AnimatedCardHeader>
              <AnimatedCardContent>
                <div className="relative aspect-[3/4] bg-muted rounded-xl overflow-hidden">
                  <img 
                    src={finalDesignWithAccessories || chosenDesign || dressPreview} 
                    alt="Design with accessories" 
                    className="w-full h-full object-cover"
                  />
                  {/* Accessory overlays */}
                  {placedAccessories.map((acc) => (
                    <div
                      key={acc.id}
                      className="absolute w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-xs animate-bounce-soft"
                      style={{ left: `${acc.position.x}%`, top: `${acc.position.y}%` }}
                    >
                      {accessories.find(a => a.id === acc.id)?.emoji}
                    </div>
                  ))}
                  {finalDesignWithAccessories && (
                    <div className="absolute top-2 right-2 bg-mint text-mint-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Applied
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {placedAccessories.map((acc) => (
                    <span key={acc.id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {acc.name}
                    </span>
                  ))}
                </div>
              </AnimatedCardContent>
            </AnimatedCard>
          </div>
        )}

        {/* Step 4: Final Preview */}
        {currentStep === 'preview' && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
            <AnimatedCard variant="glass" className="overflow-hidden">
              <div className="aspect-[3/4]">
                <img 
                  src={finalDesignWithAccessories || chosenDesign || dressPreview} 
                  alt="Final design" 
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedCard>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Your Final Design</h2>
              
              <AnimatedCard variant="bordered">
                <AnimatedCardContent className="pt-6 space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Fabric Type</span>
                    <span className="font-medium">{analysisResult?.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Style</span>
                    <span className="font-medium capitalize">{selectedStyle}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Accessories</span>
                    <span className="font-medium">{placedAccessories.length} items</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-muted-foreground block mb-2">Selected Accessories:</span>
                    <div className="flex flex-wrap gap-2">
                      {placedAccessories.map((acc) => (
                        <span key={acc.id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {acc.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedCardContent>
              </AnimatedCard>

              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="w-5 h-5 mr-2" />
                  Save Design
                </Button>
                <Button variant="gold" size="lg" className="flex-1">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="mint" size="lg" className="flex-1" onClick={() => navigate('/user/virtual-try-on')}>
                  <Eye className="w-5 h-5 mr-2" />
                  Virtual Try-On
                </Button>
                <Button variant="hero" size="lg" className="flex-1" onClick={() => navigate('/user/marketplace')}>
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Post Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          size="lg"
          onClick={goToPrevious}
          disabled={currentStep === 'upload'}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        <Button
          variant="hero"
          size="lg"
          onClick={goToNext}
          disabled={!canProceed() || currentStep === 'preview'}
        >
          Next Step
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DesignStudio;
