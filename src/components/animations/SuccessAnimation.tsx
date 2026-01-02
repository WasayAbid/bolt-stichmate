import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ show, message = 'Success!' }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4">
        <Player
          autoplay
          loop={false}
          src="https://assets5.lottiefiles.com/packages/lf20_jbrw3hcz.json"
          style={{ height: '200px', width: '200px' }}
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-semibold text-foreground"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export const SparkleEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255,215,0,0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(255,215,0,0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default SuccessAnimation;
