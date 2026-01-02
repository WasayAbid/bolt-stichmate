import React, { useState, useCallback } from 'react';
import { Upload, Scan, Sparkles, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import fabricPattern from '@/assets/fabric-pattern.png';

/**
 * FabricUpload - Page for uploading and analyzing fabric
 */
const FabricUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [instructions, setInstructions] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    type: string;
    color: string;
    pattern: string;
    quality: string;
  } | null>(null);

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
    // Simulated AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysisResult({
      type: 'Silk Chiffon',
      color: 'Pastel Pink with Gold Accents',
      pattern: 'Traditional Floral Embroidery',
      quality: 'Premium Grade A',
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload Fabric</h1>
        <p className="text-muted-foreground">Scan your fabric and let AI analyze it for the perfect design</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <AnimatedCard variant="bordered" hoverEffect="none">
          <AnimatedCardHeader>
            <AnimatedCardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Your Fabric
            </AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                ${dragActive ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/50'}
                ${uploadedImage ? 'border-mint' : ''}
              `}
            >
              {uploadedImage ? (
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded fabric"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    onClick={() => setUploadedImage(null)}
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

              {/* Floating decorative elements */}
              <img
                src={fabricPattern}
                alt=""
                className="absolute -top-4 -right-4 w-16 h-16 opacity-20 animate-float pointer-events-none"
              />
            </div>

            {/* Instructions Input */}
            <div className="mt-6">
              <AnimatedInput
                label="Design Instructions (optional)"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g., Create a traditional wedding dress with gold embroidery..."
              />
            </div>

            {/* Analyze Button */}
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

        {/* Analysis Result */}
        <AnimatedCard variant="glass" hoverEffect="glow">
          <AnimatedCardHeader>
            <AnimatedCardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-mint" />
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
                <Button variant="mint" size="lg" className="w-full mt-4">
                  <Sparkles className="w-4 h-4" />
                  Generate AI Design
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Scan className="w-10 h-10 text-muted-foreground animate-pulse" />
                </div>
                <p className="text-muted-foreground">
                  Upload a fabric image to see AI analysis
                </p>
              </div>
            )}
          </AnimatedCardContent>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default FabricUpload;
