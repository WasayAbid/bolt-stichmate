import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AvatarMood = 'idle' | 'happy' | 'thinking' | 'greeting' | 'farewell' | 'excited';

interface ChatAvatarProps {
  isTyping?: boolean;
  isHovered?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: AvatarMood;
  showSpeechBubble?: boolean;
  speechText?: string;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  isTyping = false,
  isHovered = false,
  size = 'lg',
  mood = 'idle',
  showSpeechBubble = false,
  speechText = '',
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [currentMood, setCurrentMood] = useState<AvatarMood>(mood);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
    }, 2500 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  const sizeConfig = {
    sm: { container: 64, eye: 8, pupil: 4, blush: 12 },
    md: { container: 96, eye: 12, pupil: 6, blush: 16 },
    lg: { container: 128, eye: 16, pupil: 8, blush: 22 },
    xl: { container: 180, eye: 22, pupil: 11, blush: 30 },
  };

  const config = sizeConfig[size];

  const getEyeStyle = () => {
    if (isBlinking) return { scaleY: 0.1 };
    switch (currentMood) {
      case 'happy':
      case 'excited':
        return { scaleY: 0.6 };
      case 'thinking':
        return { scaleY: 1, y: -2 };
      default:
        return { scaleY: 1 };
    }
  };

  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeechBubble && speechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 bg-primary-foreground px-4 py-2 rounded-2xl shadow-lg text-sm font-medium whitespace-nowrap z-10 border border-primary/20"
          >
            {speechText}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-primary-foreground border-r border-b border-primary/20" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative cursor-pointer"
        style={{ width: config.container, height: config.container, overflow: 'visible' }}
        animate={{
          y: currentMood === 'excited' ? [0, -6, 0] : isHovered ? [0, -3, 0] : 0,
          rotate: currentMood === 'greeting' || currentMood === 'farewell' ? [0, -4, 4, -4, 0] : 0,
        }}
        transition={{ duration: 0.5, repeat: currentMood === 'excited' ? Infinity : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer Glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{ background: 'linear-gradient(135deg, #FFB6C1, #DDA0DD, #FFD700)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Main Face Circle */}
        <div
          className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 8px 32px rgba(255, 182, 193, 0.4), 0 4px 16px rgba(221, 160, 221, 0.3)' }}
        >
          {/* Gradient Border Ring */}
          <div
            className="absolute inset-0 rounded-full p-[3px]"
            style={{ background: 'linear-gradient(135deg, #FF69B4, #FFB6C1, #DDA0DD, #E6E6FA)' }}
          >
            {/* Skin Base */}
            <div
              className="w-full h-full rounded-full relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, #FFECD2 0%, #FCE1C6 40%, #F8D5B8 100%)' }}
            >
              {/* Face Highlight */}
              <div
                className="absolute rounded-full"
                style={{
                  width: '60%',
                  height: '40%',
                  top: '15%',
                  left: '20%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 70%)',
                }}
              />

              {/* Beautiful Hair */}
              <div
                className="absolute"
                style={{
                  width: '100%',
                  height: '55%',
                  top: 0,
                  background: 'linear-gradient(180deg, #4A2040 0%, #6B3050 30%, #8B4570 60%, #6B3050 100%)',
                  borderRadius: '50% 50% 0 0',
                }}
              />

              {/* Hair Shine */}
              <motion.div
                className="absolute"
                style={{
                  width: '30%',
                  height: '25%',
                  top: '8%',
                  left: '25%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
                  borderRadius: '50%',
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Cute Bangs - Left */}
              <motion.div
                className="absolute"
                style={{
                  width: '28%',
                  height: size === 'xl' ? '22%' : '20%',
                  left: '12%',
                  top: '22%',
                  background: 'linear-gradient(180deg, #6B3050 0%, #8B4570 100%)',
                  borderRadius: '0 0 50% 50%',
                  transformOrigin: 'top center',
                }}
                animate={{ rotate: isHovered ? [0, 3, -2, 0] : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Cute Bangs - Right */}
              <motion.div
                className="absolute"
                style={{
                  width: '25%',
                  height: size === 'xl' ? '18%' : '16%',
                  right: '15%',
                  top: '24%',
                  background: 'linear-gradient(180deg, #6B3050 0%, #8B4570 100%)',
                  borderRadius: '0 0 50% 50%',
                  transformOrigin: 'top center',
                }}
                animate={{ rotate: isHovered ? [0, -3, 2, 0] : 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              />

              {/* Side Hair - Left */}
              <div
                className="absolute"
                style={{
                  width: '18%',
                  height: '35%',
                  left: '3%',
                  top: '35%',
                  background: 'linear-gradient(180deg, #6B3050 0%, #8B4570 50%, #6B3050 100%)',
                  borderRadius: '0 0 40% 40%',
                }}
              />

              {/* Side Hair - Right */}
              <div
                className="absolute"
                style={{
                  width: '18%',
                  height: '35%',
                  right: '3%',
                  top: '35%',
                  background: 'linear-gradient(180deg, #6B3050 0%, #8B4570 50%, #6B3050 100%)',
                  borderRadius: '0 0 40% 40%',
                }}
              />

              {/* ✨ Cute Bow */}
              <motion.div
                className="absolute z-20"
                style={{ top: '8%', right: '15%' }}
                animate={{ rotate: isHovered ? [0, -5, 5, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Bow Left Loop */}
                <div
                  className="absolute"
                  style={{
                    width: config.container * 0.12,
                    height: config.container * 0.1,
                    background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
                    borderRadius: '50% 20% 50% 50%',
                    transform: 'rotate(-30deg)',
                    left: -config.container * 0.08,
                    top: 0,
                    boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3)',
                  }}
                />
                {/* Bow Right Loop */}
                <div
                  className="absolute"
                  style={{
                    width: config.container * 0.12,
                    height: config.container * 0.1,
                    background: 'linear-gradient(135deg, #FF69B4, #FF1493)',
                    borderRadius: '20% 50% 50% 50%',
                    transform: 'rotate(30deg)',
                    left: config.container * 0.02,
                    top: 0,
                    boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.3)',
                  }}
                />
                {/* Bow Center */}
                <div
                  className="absolute"
                  style={{
                    width: config.container * 0.05,
                    height: config.container * 0.05,
                    background: 'linear-gradient(135deg, #FF1493, #C71585)',
                    borderRadius: '50%',
                    left: -config.container * 0.01,
                    top: config.container * 0.02,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                />
                {/* Bow Ribbons */}
                <div
                  className="absolute"
                  style={{
                    width: config.container * 0.03,
                    height: config.container * 0.08,
                    background: 'linear-gradient(180deg, #FF1493, #C71585)',
                    borderRadius: '0 0 50% 50%',
                    left: -config.container * 0.005,
                    top: config.container * 0.06,
                    transform: 'rotate(-10deg)',
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: config.container * 0.03,
                    height: config.container * 0.07,
                    background: 'linear-gradient(180deg, #FF1493, #C71585)',
                    borderRadius: '0 0 50% 50%',
                    left: config.container * 0.01,
                    top: config.container * 0.06,
                    transform: 'rotate(10deg)',
                  }}
                />
              </motion.div>

              {/* Pretty Eyes */}
              <div className="absolute" style={{ left: '22%', right: '22%', top: '42%' }}>
                {/* Left Eye */}
                <motion.div
                  className="absolute"
                  style={{
                    width: config.eye,
                    height: config.eye * 1.2,
                    left: '8%',
                    background: 'linear-gradient(180deg, #2C1810 0%, #1a0f0a 100%)',
                    borderRadius: '50%',
                  }}
                  animate={getEyeStyle()}
                  transition={{ duration: 0.1 }}
                >
                  {/* Pupil & Sparkles */}
                  {!isBlinking && (
                    <>
                      {/* Main sparkle */}
                      <motion.div
                        className="absolute bg-primary-foreground rounded-full"
                        style={{
                          width: config.pupil * 0.6,
                          height: config.pupil * 0.6,
                          right: '15%',
                          top: '15%',
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      {/* Secondary sparkle */}
                      <div
                        className="absolute bg-primary-foreground/70 rounded-full"
                        style={{
                          width: config.pupil * 0.3,
                          height: config.pupil * 0.3,
                          left: '25%',
                          bottom: '25%',
                        }}
                      />
                    </>
                  )}
                </motion.div>

                {/* Right Eye */}
                <motion.div
                  className="absolute"
                  style={{
                    width: config.eye,
                    height: config.eye * 1.2,
                    right: '8%',
                    background: 'linear-gradient(180deg, #2C1810 0%, #1a0f0a 100%)',
                    borderRadius: '50%',
                  }}
                  animate={getEyeStyle()}
                  transition={{ duration: 0.1 }}
                >
                  {!isBlinking && (
                    <>
                      <motion.div
                        className="absolute bg-primary-foreground rounded-full"
                        style={{
                          width: config.pupil * 0.6,
                          height: config.pupil * 0.6,
                          right: '15%',
                          top: '15%',
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                      />
                      <div
                        className="absolute bg-primary-foreground/70 rounded-full"
                        style={{
                          width: config.pupil * 0.3,
                          height: config.pupil * 0.3,
                          left: '25%',
                          bottom: '25%',
                        }}
                      />
                    </>
                  )}
                </motion.div>

                {/* Cute Eyelashes */}
                {size !== 'sm' && (
                  <>
                    <div
                      className="absolute"
                      style={{
                        left: '5%',
                        top: '-20%',
                        width: config.eye * 0.15,
                        height: config.eye * 0.4,
                        background: '#2C1810',
                        borderRadius: '50%',
                        transform: 'rotate(-30deg)',
                      }}
                    />
                    <div
                      className="absolute"
                      style={{
                        right: '5%',
                        top: '-20%',
                        width: config.eye * 0.15,
                        height: config.eye * 0.4,
                        background: '#2C1810',
                        borderRadius: '50%',
                        transform: 'rotate(30deg)',
                      }}
                    />
                  </>
                )}

                {/* Thinking Eyebrows */}
                {currentMood === 'thinking' && (
                  <>
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: config.eye * 0.8,
                        height: 2,
                        left: '8%',
                        top: '-30%',
                        background: '#4A2040',
                      }}
                      animate={{ rotate: -10, y: [0, -1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute rounded-full"
                      style={{
                        width: config.eye * 0.8,
                        height: 2,
                        right: '8%',
                        top: '-30%',
                        background: '#4A2040',
                      }}
                      animate={{ rotate: 10, y: [0, -1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </>
                )}
              </div>

              {/* Rosy Cheeks */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: config.blush,
                  height: config.blush * 0.6,
                  left: '10%',
                  top: '55%',
                  background: 'radial-gradient(ellipse, rgba(255,105,180,0.5) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: currentMood === 'happy' || currentMood === 'excited' ? [0.5, 0.8, 0.5] : 0.4,
                  scale: currentMood === 'happy' ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: config.blush,
                  height: config.blush * 0.6,
                  right: '10%',
                  top: '55%',
                  background: 'radial-gradient(ellipse, rgba(255,105,180,0.5) 0%, transparent 70%)',
                }}
                animate={{
                  opacity: currentMood === 'happy' || currentMood === 'excited' ? [0.5, 0.8, 0.5] : 0.4,
                  scale: currentMood === 'happy' ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
              />

              {/* Cute Nose */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  width: config.container * 0.04,
                  height: config.container * 0.03,
                  top: '55%',
                  background: 'radial-gradient(ellipse, rgba(220,180,160,0.6) 0%, transparent 70%)',
                  borderRadius: '50%',
                }}
              />

              {/* Pretty Mouth */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: '65%', width: config.container * 0.2, height: config.container * 0.12 }}
              >
                {/* Smile variations */}
                {currentMood === 'idle' && !isTyping && (
                  <motion.div
                    className="absolute w-full rounded-b-full"
                    style={{
                      height: '60%',
                      borderBottom: `${size === 'xl' ? 3 : 2}px solid #D4737A`,
                      borderLeft: `${size === 'xl' ? 2 : 1}px solid transparent`,
                      borderRight: `${size === 'xl' ? 2 : 1}px solid transparent`,
                    }}
                  />
                )}

                {(currentMood === 'greeting' || currentMood === 'farewell') && !isTyping && (
                  <motion.div
                    className="absolute w-full rounded-b-full overflow-hidden"
                    style={{ height: '75%', background: '#D4737A' }}
                    animate={{ scaleY: [1, 1.08, 1], scaleX: [1, 1.05, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                      style={{ width: '45%', height: '35%', background: '#E85A6B' }}
                    />
                  </motion.div>
                )}

                {currentMood === 'happy' && (
                  <motion.div
                    className="absolute w-full rounded-b-full overflow-hidden"
                    style={{ height: '85%', background: '#D4737A' }}
                    animate={{ scaleY: [1, 1.08, 1], scaleX: [1, 1.05, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                      style={{ width: '50%', height: '40%', background: '#E85A6B' }}
                    />
                  </motion.div>
                )}

                {currentMood === 'excited' && (
                  <motion.div
                    className="absolute w-full rounded-full overflow-hidden"
                    style={{ height: '100%', background: '#D4737A' }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full"
                      style={{ width: '60%', height: '45%', background: '#E85A6B' }}
                    />
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2"
                      style={{ width: '55%', height: '25%', background: '#fff', borderRadius: '0 0 40% 40%' }}
                    />
                  </motion.div>
                )}

                {currentMood === 'thinking' && (
                  <motion.div
                    className="absolute rounded-full"
                    style={{ width: '35%', height: '50%', background: '#D4737A', left: '55%' }}
                    animate={{ x: [0, 3, 0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {isTyping && (
                  <motion.div
                    className="absolute w-full rounded-full overflow-hidden"
                    style={{ background: '#D4737A' }}
                    animate={{ height: ['35%', '70%', '45%', '60%', '35%'] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                      style={{ width: '45%', height: '40%', background: '#E85A6B' }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Sparkles for excited mood */}
              {currentMood === 'excited' && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        fontSize: size === 'xl' ? 14 : size === 'lg' ? 12 : 10,
                        left: `${15 + i * 18}%`,
                        top: `${5 + (i % 2) * 12}%`,
                        color: '#FFD700',
                      }}
                      animate={{
                        scale: [0, 1.2, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                    >
                      ✦
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Waving Hand */}
        <AnimatePresence>
          {(currentMood === 'greeting' || currentMood === 'farewell' || isHovered) && (
            <motion.div
              initial={{ opacity: 0, x: 15, scale: 0.5 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                rotate: [0, 20, -12, 20, -8, 15, 0],
              }}
              exit={{ opacity: 0, x: 15, scale: 0.5 }}
              transition={{
                duration: 0.25,
                rotate: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute"
              style={{
                right: '-12%',
                bottom: '18%',
                fontSize: size === 'xl' ? 28 : size === 'lg' ? 22 : 16,
              }}
            >
              👋
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thinking Bubbles */}
        <AnimatePresence>
          {currentMood === 'thinking' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-3 -right-1"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted-foreground) / 0.2))',
                    width: 5 + i * 4,
                    height: 5 + i * 4,
                    right: i * 7,
                    top: -i * 5,
                    border: '1px solid hsl(var(--border))',
                  }}
                  animate={{ y: [0, -2, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Typing Glow */}
        {isTyping && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid hsl(var(--primary))' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}

        {/* Hearts floating on happy/excited */}
        {(currentMood === 'happy' || currentMood === 'excited') && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-primary"
                style={{
                  fontSize: size === 'xl' ? 12 : 10,
                  left: `${20 + i * 30}%`,
                  bottom: '100%',
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, -20, -40],
                  opacity: [0, 1, 0],
                  x: [0, i % 2 === 0 ? 8 : -8, i % 2 === 0 ? 15 : -15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                💕
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
};
