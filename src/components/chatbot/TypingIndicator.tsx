import React from 'react';
import { motion } from 'framer-motion';
import { ChatAvatar } from './ChatAvatar';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      <ChatAvatar size="sm" isTyping />
      
      <div className="bg-gradient-to-br from-rose/20 to-primary/10 border border-rose/30 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        
        {/* Typing text */}
        <motion.p
          className="text-xs text-muted-foreground mt-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Sana is typing...
        </motion.p>
      </div>
    </motion.div>
  );
};
