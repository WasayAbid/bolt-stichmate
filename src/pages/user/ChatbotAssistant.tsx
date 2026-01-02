import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Lightbulb, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDesign } from '@/contexts/DesignContext';
import { ChatAvatar } from '@/components/chatbot/ChatAvatar';
import { ChatMessage } from '@/components/chatbot/ChatMessage';
import { TypingIndicator } from '@/components/chatbot/TypingIndicator';
import { generateMockResponse } from '@/components/chatbot/mockResponses';
import { GlassmorphicCard } from '@/components/ui/GlassmorphicCard';
import { FloatingParticles } from '@/components/animations/ParticleEffects';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isPositive?: boolean;
}

const ChatbotAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { fabricAnalysis, selectedDesign, selectedAccessories } = useDesign();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm Sana, your personal StitchMate fashion assistant! 💕\n\nI'm here to help you create the perfect outfit. Whether you need fabric advice, design inspiration, or styling tips - just ask!\n\nWhat can I help you with today? ✨",
      timestamp: new Date(),
      isPositive: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    { text: 'What fabric suits traditional wear?', icon: '🧵' },
    { text: 'Suggest embroidery patterns', icon: '✨' },
    { text: 'How to style a wedding outfit?', icon: '👰' },
    { text: 'Find matching accessories', icon: '💎' },
  ];

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await generateMockResponse(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      isPositive: response.isPositive,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
      <FloatingParticles count={30} className="opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-lavender/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 space-y-6 p-6 pt-20" style={{ overflow: 'visible' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
          style={{ overflow: 'visible' }}
        >
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4" style={{ overflow: 'visible' }}>
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative p-6"
              style={{ overflow: 'visible' }}
            >
              <motion.div
                className="absolute inset-3 rounded-full bg-gradient-to-r from-primary via-rose to-gold blur-md"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative p-1 rounded-full bg-gradient-to-br from-primary via-rose to-gold">
                <ChatAvatar size="xl" mood={isTyping ? 'thinking' : isHovered ? 'excited' : 'greeting'} isTyping={isTyping} isHovered={isHovered} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Chat with Sana</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                Your personal fashion assistant
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <GlassmorphicCard variant="glow" className="h-[650px] flex flex-col p-0 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      role={message.role}
                      content={message.content}
                      timestamp={message.timestamp}
                      showSparkle={message.isPositive}
                    />
                  ))}
                </AnimatePresence>

                <AnimatePresence>
                  {isTyping && <TypingIndicator />}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <motion.div
                className="p-4 border-t border-border/30 bg-card/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-3"
                >
                  <motion.div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask Sana anything about fashion..."
                      className="w-full h-14 px-5 pr-12 bg-muted/50 border-2 border-border/50 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none text-base shadow-inner"
                    />
                    <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                  </motion.div>
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="h-14 px-6 rounded-2xl bg-gradient-to-r from-primary via-rose to-gold text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 30px hsl(var(--primary) / 0.5)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </motion.button>
                </form>
              </motion.div>
            </GlassmorphicCard>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Quick suggestions */}
            <GlassmorphicCard variant="elevated">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-coral flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Quick Suggestions</h3>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full text-left p-3 rounded-xl bg-muted/30 hover:bg-primary/10 border-2 border-transparent hover:border-primary/30 transition-all text-sm flex items-center gap-2 group"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{suggestion.icon}</span>
                    <span className="group-hover:text-primary transition-colors">
                      {suggestion.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </GlassmorphicCard>

            {/* About Sana */}
            <GlassmorphicCard variant="bordered">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary via-rose to-gold p-0.5"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>
                <h3 className="font-semibold mb-1">Meet Sana</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your AI fashion expert who knows everything about Pakistani fashion, fabrics, and styling!
                </p>
                <div className="flex justify-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-gold fill-gold"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Rated 4.9 by users</p>
              </div>
            </GlassmorphicCard>

            {/* Context Info */}
            {(fabricAnalysis || selectedDesign) && (
              <GlassmorphicCard variant="bordered">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Your Project
                </h3>
                {fabricAnalysis && (
                  <div className="p-3 bg-muted/30 rounded-xl mb-2">
                    <p className="text-xs text-muted-foreground">Fabric</p>
                    <p className="text-sm font-medium">{fabricAnalysis.type}</p>
                  </div>
                )}
                {selectedDesign && (
                  <div className="p-3 bg-muted/30 rounded-xl">
                    <p className="text-xs text-muted-foreground">Design</p>
                    <p className="text-sm font-medium">{selectedDesign.name}</p>
                  </div>
                )}
              </GlassmorphicCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotAssistant;
