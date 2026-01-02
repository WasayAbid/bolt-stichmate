import React from 'react';
import { motion } from 'framer-motion';
import { ChatAvatar } from './ChatAvatar';
import { User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isNew?: boolean;
  showSparkle?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  timestamp,
  isNew = false,
  showSparkle = false,
}) => {
  const isBot = role === 'assistant';

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 20, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isBot ? (
          <ChatAvatar size="sm" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lavender to-primary flex items-center justify-center">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Message bubble */}
      <motion.div
        className={`relative max-w-[75%] rounded-2xl p-4 shadow-md ${
          isBot
            ? 'bg-gradient-to-br from-rose/20 to-primary/10 border border-rose/30'
            : 'bg-gradient-to-br from-lavender/40 to-primary/20 border border-lavender/30'
        }`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Sparkle effect for positive messages */}
        {showSparkle && isBot && (
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.div>
        )}

        <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground">
          {content}
        </p>
        <p className="text-xs text-muted-foreground mt-2 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>

        {/* Decorative tail */}
        <div
          className={`absolute top-4 w-3 h-3 rotate-45 ${
            isBot
              ? '-left-1.5 bg-gradient-to-br from-rose/20 to-primary/10 border-l border-b border-rose/30'
              : '-right-1.5 bg-gradient-to-br from-lavender/40 to-primary/20 border-r border-t border-lavender/30'
          }`}
        />
      </motion.div>
    </motion.div>
  );
};
