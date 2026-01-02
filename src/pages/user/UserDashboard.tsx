import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Palette, Shirt, ShoppingBag, Package, ArrowRight, Sparkles, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent } from '@/components/ui/AnimatedCard';
import { useAuth } from '@/contexts/AuthContext';
import { LuxuryBackground } from '@/components/animations/LuxuryBackground';
import { motion } from 'framer-motion';

/**
 * UserDashboard - Main overview page for users
 */
const UserDashboard: React.FC = () => {
  const { user, profile } = useAuth();

  const features = [
    {
      icon: Upload,
      title: 'Upload Fabric',
      description: 'Scan and analyze your fabric with AI',
      path: '/dashboard/upload',
      gradient: 'from-[#C41E3A] to-[#8B1538]',
    },
    {
      icon: Palette,
      title: 'AI Design',
      description: 'Create stunning dress designs',
      path: '/dashboard/design',
      gradient: 'from-[#FFD700] to-[#FFA500]',
    },
    {
      icon: Shirt,
      title: 'Virtual Try-On',
      description: 'See how designs look on you',
      path: '/dashboard/tryon',
      gradient: 'from-[#C41E3A] to-[#A31D45]',
    },
    {
      icon: ShoppingBag,
      title: 'Accessories',
      description: 'Browse buttons, embroidery & more',
      path: '/dashboard/marketplace',
      gradient: 'from-[#FFD700] to-[#C41E3A]',
    },
  ];

  const recentOrders = [
    { id: 'ORD001', item: 'Embroidered Kameez', status: 'In Progress', progress: 60 },
    { id: 'ORD002', item: 'Wedding Lehenga', status: 'Cutting', progress: 25 },
  ];

  return (
    <>
      <LuxuryBackground />
      <div className="space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#A31D45]/90 via-[#8B1538]/80 to-[#6B0F2D]/90 p-8 md:p-12 backdrop-blur-sm border border-[#FFD700]/20 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C41E3A]/20 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="w-8 h-8 text-[#FFD700] animate-pulse" />
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Welcome back, <span className="text-[#FFD700]">{profile?.full_name || user?.email?.split('@')[0]}</span>!
              </h1>
            </div>
            <p className="text-[#FFD700]/90 text-lg md:text-xl mb-8 font-medium">
              Ready to create something extraordinary today?
            </p>
            <Link to="/dashboard/upload">
              <Button
                size="lg"
                className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B1538] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Designing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#FFD700]" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Link to={feature.path}>
                  <div className="group relative h-full cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/40 to-[#8B1538]/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative h-full bg-gradient-to-br from-[#A31D45]/90 to-[#6B0F2D]/90 backdrop-blur-sm border border-[#FFD700]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#FFD700]/60">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                      <p className="text-sm text-[#FFD700]/80">{feature.description}</p>
                      <ArrowRight className="w-5 h-5 mt-4 text-[#FFD700] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-[#FFD700]" />
            Recent Orders
          </h2>
          <Link to="/dashboard/orders">
            <Button
              size="sm"
              className="bg-transparent border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#C41E3A]/30 to-[#8B1538]/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-[#A31D45]/80 to-[#6B0F2D]/80 backdrop-blur-sm border border-[#FFD700]/20 rounded-xl p-5 shadow-lg hover:shadow-xl hover:border-[#FFD700]/40 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Package className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{order.item}</p>
                      <p className="text-sm text-[#FFD700]/70">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#FFD700]">{order.status}</span>
                    <div className="w-32 h-2.5 bg-[#8B1538]/50 rounded-full mt-2 overflow-hidden border border-[#FFD700]/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${order.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default UserDashboard;
