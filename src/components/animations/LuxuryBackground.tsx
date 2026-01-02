import { motion } from 'framer-motion';

export const LuxuryBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#8B1538]">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <linearGradient id="glow1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="radial1">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B1538" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.path
          d="M0,800 Q300,600 600,700 T1200,750 T1920,800 L1920,1080 L0,1080 Z"
          fill="#5A0A1F"
          animate={{
            d: [
              "M0,800 Q300,600 600,700 T1200,750 T1920,800 L1920,1080 L0,1080 Z",
              "M0,750 Q300,650 600,720 T1200,700 T1920,780 L1920,1080 L0,1080 Z",
              "M0,800 Q300,600 600,700 T1200,750 T1920,800 L1920,1080 L0,1080 Z"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0,600 Q400,400 800,550 T1600,600 T1920,650 L1920,1080 L0,1080 Z"
          fill="#6B0F2D"
          opacity="0.9"
          animate={{
            d: [
              "M0,600 Q400,400 800,550 T1600,600 T1920,650 L1920,1080 L0,1080 Z",
              "M0,650 Q400,450 800,600 T1600,650 T1920,700 L1920,1080 L0,1080 Z",
              "M0,600 Q400,400 800,550 T1600,600 T1920,650 L1920,1080 L0,1080 Z"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.path
          d="M0,450 Q500,250 1000,400 T2000,500 L1920,1080 L0,1080 Z"
          fill="#7D1432"
          opacity="0.85"
          animate={{
            d: [
              "M0,450 Q500,250 1000,400 T2000,500 L1920,1080 L0,1080 Z",
              "M0,500 Q500,300 1000,450 T2000,550 L1920,1080 L0,1080 Z",
              "M0,480 Q500,280 1000,420 T2000,520 L1920,1080 L0,1080 Z",
              "M0,450 Q500,250 1000,400 T2000,500 L1920,1080 L0,1080 Z"
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.ellipse
          cx="-200"
          cy="300"
          rx="600"
          ry="450"
          fill="url(#radial1)"
          animate={{
            cx: [-200, -100, -200],
            cy: [300, 350, 300],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.ellipse
          cx="2120"
          cy="700"
          rx="500"
          ry="400"
          fill="url(#radial1)"
          animate={{
            cx: [2120, 2020, 2120],
            cy: [700, 650, 700],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <motion.line
          x1="0"
          y1="200"
          x2="1920"
          y2="250"
          stroke="url(#glow1)"
          strokeWidth="2"
          opacity="0.3"
          animate={{
            y1: [200, 220, 200],
            y2: [250, 270, 250],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.line
          x1="0"
          y1="400"
          x2="1920"
          y2="380"
          stroke="url(#glow1)"
          strokeWidth="1.5"
          opacity="0.2"
          animate={{
            y1: [400, 420, 400],
            y2: [380, 400, 380],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      <div className="absolute top-20 left-20 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#C41E3A]/10 rounded-full blur-3xl animate-pulse"
           style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#FFD700]/8 rounded-full blur-2xl" />
    </div>
  );
};
