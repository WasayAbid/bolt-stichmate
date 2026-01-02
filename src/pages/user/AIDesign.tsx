import React, { useState } from 'react';
import { Palette, Sparkles, Wand2, RefreshCw, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import dressPreview from '@/assets/dress-preview.png';
import fabricPattern from '@/assets/fabric-pattern.png';

/**
 * AIDesign - Page for creating AI-generated dress designs
 */
const AIDesign: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState<string[]>([]);

  const styles = [
    { id: 'traditional', label: 'Traditional', emoji: '🏛️' },
    { id: 'modern', label: 'Modern', emoji: '✨' },
    { id: 'fusion', label: 'Fusion', emoji: '🎨' },
    { id: 'bridal', label: 'Bridal', emoji: '💍' },
    { id: 'casual', label: 'Casual', emoji: '👗' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setGeneratedDesigns([dressPreview, dressPreview, dressPreview, dressPreview]);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Palette className="w-8 h-8 text-primary" />
          AI Design Studio
        </h1>
        <p className="text-muted-foreground">Transform your fabric into stunning dress designs</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <AnimatedCard variant="bordered" className="lg:col-span-1">
          <AnimatedCardHeader>
            <AnimatedCardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-gold" />
              Design Settings
            </AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent className="space-y-6">
            {/* Selected Fabric */}
            <div>
              <p className="text-sm font-medium mb-2">Selected Fabric</p>
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={fabricPattern}
                  alt="Selected fabric"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                <p className="absolute bottom-2 left-2 text-sm text-primary-foreground font-medium">
                  Silk Chiffon - Pastel Pink
                </p>
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <p className="text-sm font-medium mb-3">Choose Style</p>
              <div className="grid grid-cols-2 gap-2">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-300 text-left
                      ${selectedStyle === style.id
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <span className="text-xl mb-1 block">{style.emoji}</span>
                    <span className="text-sm font-medium">{style.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={handleGenerate}
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

        {/* Generated Designs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Designs</h2>
            {generatedDesigns.length > 0 && (
              <Button variant="outline" size="sm">
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
                  variant="glass"
                  hoverEffect="lift"
                  className={`overflow-hidden animate-fade-scale stagger-${index + 1}`}
                >
                  <div className="relative group">
                    <img
                      src={design}
                      alt={`Design ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <Button variant="glass" size="sm" className="flex-1">
                        <Heart className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button variant="gold" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
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
                Select a style and click "Generate Designs" to see AI-created dresses based on your fabric
              </p>
            </AnimatedCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDesign;
