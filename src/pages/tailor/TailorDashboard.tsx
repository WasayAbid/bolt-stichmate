import React from 'react';
import { Link } from 'react-router-dom';
import { Package, DollarSign, Star, TrendingUp, ArrowRight, Clock, AlertTriangle, CheckCircle, Scissors, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LuxuryBackground } from '@/components/animations/LuxuryBackground';
import { motion } from 'framer-motion';

/**
 * TailorDashboard - Main overview page for tailors
 */
const TailorDashboard: React.FC = () => {
  const { user, profile, isDemoMode, tailorApplication, role } = useAuth();

  const stats = [
    { label: 'Pending Orders', value: 12, icon: Package, gradient: 'from-[#C41E3A] to-[#8B1538]', trend: '+3', bg: 'bg-[#C41E3A]/20' },
    { label: 'This Month', value: 'Rs. 45,000', icon: DollarSign, gradient: 'from-[#FFD700] to-[#FFA500]', trend: '+12%', bg: 'bg-[#FFD700]/20' },
    { label: 'Rating', value: '4.9', icon: Star, gradient: 'from-[#FFD700] to-[#C41E3A]', trend: '+0.2', bg: 'bg-[#FFD700]/20' },
    { label: 'Completed', value: 156, icon: TrendingUp, gradient: 'from-[#A31D45] to-[#6B0F2D]', trend: '+8', bg: 'bg-[#A31D45]/20' },
  ];

  const pendingOrders = [
    { id: 'ORD-101', customer: 'Sarah Ahmed', item: 'Bridal Lehenga', dueDate: '28 Dec', priority: 'high' },
    { id: 'ORD-102', customer: 'Fatima Khan', item: 'Silk Kameez', dueDate: '30 Dec', priority: 'medium' },
    { id: 'ORD-103', customer: 'Ayesha Ali', item: 'Party Gown', dueDate: '2 Jan', priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-[#FF4444]/20 text-[#FF6666] border border-[#FF4444]/40',
      medium: 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40',
      low: 'bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/40',
    };
    return colors[priority] || 'bg-muted';
  };

  return (
    <>
      <LuxuryBackground />
      <div className="space-y-8 relative z-10">
        {isDemoMode && tailorApplication && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="bg-[#FFA500]/20 border-[#FFD700]/40 backdrop-blur-sm">
              <AlertTriangle className="h-5 w-5 text-[#FFD700]" />
              <AlertTitle className="text-lg font-bold text-white">Demo Mode Active</AlertTitle>
              <AlertDescription className="text-[#FFD700]/90 mt-2 font-medium">
                You are currently viewing the Tailor Dashboard in demo mode. Your application is <span className="font-bold text-[#FFD700]">under review</span> by our admin team. Full features and real order management will be activated once your application is approved.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {role === 'tailor' && tailorApplication?.status === 'approved' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="bg-[#4CAF50]/20 border-[#4CAF50]/40 backdrop-blur-sm">
              <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
              <AlertTitle className="text-lg font-bold text-white">Account Approved</AlertTitle>
              <AlertDescription className="text-[#4CAF50]/90 mt-2 font-medium">
                Congratulations! Your tailor application has been approved. You now have full access to all features and can start accepting orders.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6B0F2D]/90 via-[#8B1538]/80 to-[#A31D45]/90 p-8 md:p-12 backdrop-blur-sm border border-[#FFD700]/20 shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-[#C41E3A]/20 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Scissors className="w-8 h-8 text-[#FFD700] animate-pulse" />
                <Award className="w-8 h-8 text-[#FFD700] animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Hello, <span className="text-[#FFD700]">{profile?.full_name || 'Master Tailor'}</span>!
              </h1>
              <p className="text-[#FFD700]/90 text-lg md:text-xl mb-6 font-medium">
                You have <span className="font-bold text-white">12 pending orders</span> to work on today
              </p>
              <Link to="/tailor/orders">
                <Button
                  size="lg"
                  className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B1538] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Package className="w-5 h-5 mr-2" />
                  View All Orders
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/40 to-[#8B1538]/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-[#A31D45]/90 to-[#6B0F2D]/90 backdrop-blur-sm border border-[#FFD700]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#FFD700]/60">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-xs font-bold ${stat.bg} text-white px-3 py-1.5 rounded-full border border-[#FFD700]/30`}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-[#FFD700]/80 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#C41E3A]/20 to-[#8B1538]/20 rounded-2xl blur-2xl" />
          <div className="relative bg-gradient-to-br from-[#A31D45]/80 to-[#6B0F2D]/80 backdrop-blur-sm border border-[#FFD700]/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Clock className="w-6 h-6 text-[#FFD700]" />
                Pending Orders
              </h2>
              <Link to="/tailor/orders">
                <Button
                  size="sm"
                  className="bg-transparent border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300"
                >
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {pendingOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-[#8B1538]/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center justify-between p-5 bg-gradient-to-r from-[#8B1538]/60 to-[#6B0F2D]/60 rounded-xl border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Package className="w-6 h-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{order.item}</p>
                        <p className="text-sm text-[#FFD700]/70">{order.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                      <span className="text-sm font-medium text-[#FFD700]/90 min-w-[60px]">{order.dueDate}</span>
                      <Button
                        size="sm"
                        className="bg-[#FFD700] hover:bg-[#FFA500] text-[#8B1538] font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default TailorDashboard;
