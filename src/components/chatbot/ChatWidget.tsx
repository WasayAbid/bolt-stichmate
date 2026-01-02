import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { ChatAvatar } from './ChatAvatar';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { Button } from '@/components/ui/button';
import { generateMockResponse } from './mockResponses';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isPositive?: boolean;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm Sana, your StitchMate fashion assistant! 💕\n\nI can help you with:\n✨ Fabric selection\n👗 Design recommendations\n🎨 Styling tips\n📦 Order tracking\n\nAsk me anything!",
      timestamp: new Date(),
      isPositive: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI response
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

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ overflow: 'visible' }}
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative group p-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ overflow: 'visible' }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-5 rounded-full bg-gradient-to-r from-primary via-rose to-gold blur-md"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative p-1 rounded-full bg-gradient-to-br from-primary via-rose to-gold">
                <ChatAvatar size="md" mood={isHovered ? 'excited' : 'happy'} isHovered={isHovered} />
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border rounded-xl px-4 py-2 shadow-lg whitespace-nowrap z-10"
                  >
                    <p className="text-sm font-medium text-foreground">Ask me anything! 💕</p>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 rotate-45 bg-card border-r border-t border-border" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-border/50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/90 via-rose/80 to-gold/70 p-4 flex items-center gap-3">
              <ChatAvatar size="sm" mood={isTyping ? 'thinking' : 'happy'} isTyping={isTyping} />
              <div className="flex-1">
                <h3 className="font-semibold text-primary-foreground">Sana</h3>
                <p className="text-xs text-primary-foreground/80">
                  {isTyping ? 'Typing...' : 'StitchMate Assistant'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-card via-background to-card/50">
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  isNew={index === messages.length - 1}
                  showSparkle={message.isPositive}
                />
              ))}
              
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 bg-card border-t border-border/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 h-11 px-4 bg-muted/50 border border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="h-11 px-4 rounded-xl bg-gradient-to-r from-primary to-rose text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
