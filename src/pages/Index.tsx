import React, { useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Scissors, Users, Star, Palette, Wand2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingElements } from '@/components/ui/FloatingElements';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { ScrollReveal, StaggerReveal } from '@/components/animations/ScrollAnimations';
import { FloatingParticles } from '@/components/animations/ParticleEffects';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { gsap } from 'gsap';
import heroBanner from '@/assets/hero-banner.png';

// Lazy load the 3D scene
const HeroScene3D = React.lazy(() => import('@/components/3d/HeroScene3D'));

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance animation
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelectorAll('.hero-animate'), {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }

    // CTA pulse animation
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        boxShadow: '0 0 40px hsl(var(--primary) / 0.4)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, []);

  const features = [
    { icon: Sparkles, title: 'AI Design', desc: 'Upload fabric and let AI create stunning designs', color: 'from-primary to-rose' },
    { icon: Scissors, title: 'Expert Tailors', desc: 'Connect with skilled Pakistani tailors', color: 'from-gold to-coral' },
    { icon: Users, title: 'Virtual Try-On', desc: 'See designs on yourself before ordering', color: 'from-mint to-lavender' },
  ];

  const steps = [
    { icon: Palette, title: 'Upload Fabric', desc: 'Share your fabric photos and measurements' },
    { icon: Wand2, title: 'AI Magic', desc: 'Get AI-generated design suggestions' },
    { icon: Scissors, title: 'Find Tailors', desc: 'Connect with expert tailors nearby' },
    { icon: ShoppingBag, title: 'Get Styled', desc: 'Receive your custom outfit' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingElements />
      <FloatingParticles count={40} />
      
      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-sm bg-background/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-gradient">StichMate</span>
        </div>
        <Link to="/auth">
          <AnimatedButton variant="hero" glowOnHover>Get Started</AnimatedButton>
        </Link>
      </nav>

      {/* Hero Section with 3D Scene */}
      <section ref={heroRef} className="relative z-10 px-6 lg:px-12 py-16 lg:py-24 min-h-[80vh] flex items-center">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-60">
          <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5" />}>
            <HeroScene3D />
          </Suspense>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="hero-animate text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Your Fashion
              <span className="text-gradient block">Design Playground</span>
            </h1>
            <p className="hero-animate text-lg text-muted-foreground mb-8 max-w-lg">
              Upload fabrics, create AI-powered designs, try them virtually, and connect with master tailors. Pakistani fashion meets modern technology.
            </p>
            <div className="hero-animate flex flex-wrap gap-4">
              <Link to="/auth">
                <div ref={ctaRef} className="inline-block rounded-2xl">
                  <AnimatedButton variant="hero" size="xl" pulseEffect>
                    <Sparkles className="w-5 h-5" />
                    Start Designing
                  </AnimatedButton>
                </div>
              </Link>
              <Button variant="glass" size="xl" className="backdrop-blur-xl border border-border/30 hover:bg-card/60 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
          <ScrollReveal animation="scale" delay={0.3}>
            <GlassmorphicCard variant="glow" className="relative overflow-hidden">
              <img 
                src={heroBanner} 
                alt="Fashion design elements" 
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl animate-pulse-glow" />
            </GlassmorphicCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 bg-muted/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="slideUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Transform your fabric into stunning custom designs with our AI-powered platform
            </p>
          </ScrollReveal>
          
          <StaggerReveal stagger={0.2} animation="scale" className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <GlassmorphicCard 
                key={i} 
                variant="elevated" 
                className="text-center group cursor-pointer"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </GlassmorphicCard>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal animation="slideUp">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Your Journey to Custom Fashion</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={i} animation="slideUp" delay={i * 0.15}>
                <GlassmorphicCard variant="bordered" className="text-center relative group">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                    {i + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-gold/30 transition-all duration-300">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </GlassmorphicCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 text-center">
        <ScrollReveal animation="scale">
          <GlassmorphicCard variant="glow" className="max-w-2xl mx-auto">
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <Star 
                  key={i} 
                  className="w-6 h-6 text-gold fill-gold hover:scale-125 transition-transform duration-200" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of fashion enthusiasts and tailors on StichMate</p>
            <Link to="/auth">
              <AnimatedButton variant="hero" size="xl" glowOnHover bounceOnClick>
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </AnimatedButton>
            </Link>
          </GlassmorphicCard>
        </ScrollReveal>
      </section>

      {/* Footer gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
