import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { AnimatedInput } from '@/components/ui/AnimatedInput';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { 
  Eye, EyeOff, Scissors, Mail, Lock, User, ArrowRight, 
  Sparkles, Store, MapPin, Briefcase, Phone, Check, Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const tailorApplySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  shopName: z.string().trim().min(2, 'Shop name is required'),
  shopAddress: z.string().trim().min(10, 'Please provide a complete address'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number'),
  yearsExperience: z.number().min(0, 'Experience must be 0 or more'),
  specializations: z.string().optional(),
  portfolioUrl: z.string().url().optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const TailorApplyPage = () => {
  const { signup, isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    shopName: '',
    shopAddress: '',
    phone: '',
    yearsExperience: 0,
    specializations: '',
    portfolioUrl: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Check if already applied
  useEffect(() => {
    const checkExistingApplication = async () => {
      if (isAuthenticated && user) {
        const { data } = await supabase
          .from('tailor_applications')
          .select('status')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data) {
          setApplicationSubmitted(true);
        }
      }
    };
    
    if (!isLoading) {
      checkExistingApplication();
    }
  }, [isAuthenticated, user, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (step === 1) {
      // Validate step 1
      const partialResult = z.object({
        name: z.string().trim().min(2, 'Name must be at least 2 characters'),
        email: z.string().trim().email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
      }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }).safeParse(formData);

      if (!partialResult.success) {
        const fieldErrors: Record<string, string> = {};
        partialResult.error.errors.forEach((err) => {
          const field = err.path[0] as string;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setStep(2);
      return;
    }

    // Full validation
    const result = tailorApplySchema.safeParse({
      ...formData,
      yearsExperience: Number(formData.yearsExperience),
    });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // First, create the user account
      const { error: signupError } = await signup(formData.name, formData.email, formData.password);

      if (signupError) {
        toast.error(signupError);
        setIsSubmitting(false);
        return;
      }

      // Wait a bit for auth state to update, then get session with retries
      let session = null;
      let retries = 0;
      const maxRetries = 5;

      while (!session && retries < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500));
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        session = currentSession;
        retries++;
      }

      if (!session?.user) {
        toast.error('Account created but session not available. Please sign in to complete your application.');
        setIsSubmitting(false);
        return;
      }

      // Submit tailor application
      const { error: applicationError } = await supabase
        .from('tailor_applications')
        .insert({
          user_id: session.user.id,
          shop_name: formData.shopName,
          shop_address: formData.shopAddress,
          phone: formData.phone,
          years_experience: Number(formData.yearsExperience),
          specializations: formData.specializations ? formData.specializations.split(',').map(s => s.trim()) : [],
          portfolio_url: formData.portfolioUrl || null,
        });

      if (applicationError) {
        console.error('Application error:', applicationError);
        toast.error(`Failed to submit application: ${applicationError.message}`);
        setIsSubmitting(false);
        return;
      }

      setApplicationSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (err) {
      console.error('Submission error:', err);
      toast.error('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" />

        <GlassmorphicCard className="w-full max-w-xl p-8 relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-4">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Application Submitted Successfully</h1>
            <p className="text-muted-foreground text-lg mb-2">
              Your application has been submitted and is under review by the admin.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              We typically review applications within 1-2 business days.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Demo Access Available</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  While your application is being reviewed, you can explore the Tailor Dashboard in demo mode. Full features will be activated once approved by admin.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full h-12 text-base font-semibold"
              onClick={() => navigate('/tailor')}
            >
              Access Demo Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              className="w-full h-12"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              You will receive an email notification once your application has been reviewed.
            </p>
          </div>
        </GlassmorphicCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      
      <GlassmorphicCard className="w-full max-w-lg p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 relative">
            <Scissors className="w-8 h-8 text-primary" />
            <Sparkles className="w-4 h-4 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Apply as a Tailor</h1>
          <p className="text-muted-foreground mt-2">Join our network of skilled tailors</p>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`w-2 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-8 h-0.5 transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Step {step} of 2: {step === 1 ? 'Account Details' : 'Shop Information'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="relative">
                <AnimatedInput
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />
                <User className="absolute right-4 top-4 w-4 h-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
                <Mail className="absolute right-4 top-4 w-4 h-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={errors.confirmPassword}
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <AnimatedInput
                  label="Shop Name"
                  type="text"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                  error={errors.shopName}
                />
                <Store className="absolute right-4 top-4 w-4 h-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Shop Address"
                  type="text"
                  value={formData.shopAddress}
                  onChange={(e) => setFormData({ ...formData, shopAddress: e.target.value })}
                  error={errors.shopAddress}
                />
                <MapPin className="absolute right-4 top-4 w-4 h-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                />
                <Phone className="absolute right-4 top-4 w-4 h-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Years of Experience"
                  type="number"
                  min="0"
                  value={formData.yearsExperience.toString()}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) || 0 })}
                  error={errors.yearsExperience}
                />
                <Briefcase className="absolute right-4 top-4 w-4 h-4 text-muted-foreground" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Specializations (comma separated)</Label>
                <Textarea
                  placeholder="e.g., Wedding dresses, Suits, Traditional wear"
                  value={formData.specializations}
                  onChange={(e) => setFormData({ ...formData, specializations: e.target.value })}
                  className="resize-none"
                />
              </div>

              <div className="relative">
                <AnimatedInput
                  label="Portfolio URL (optional)"
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  error={errors.portfolioUrl}
                />
              </div>
            </>
          )}

          <div className="flex gap-3 mt-6">
            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 h-12 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : step === 1 ? (
                <span className="flex items-center gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Submit Application
                  <Check className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </form>

        {/* Sign in link */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/auth" className="text-primary hover:text-primary/80 transition-colors">
              Sign In
            </Link>
          </p>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
            ← Back to Home
          </Link>
        </div>
      </GlassmorphicCard>
    </div>
  );
};

export default TailorApplyPage;
