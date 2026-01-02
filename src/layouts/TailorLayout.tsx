import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, Settings, Package, ShoppingBag, Truck, DollarSign,
  LogOut, Menu, X, Scissors, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * TailorLayout - Dashboard layout for tailors
 */
const TailorLayout: React.FC = () => {
  const { user, profile, role, isDemoMode, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#8B1538]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  // Allow access if user is authenticated AND (is a tailor OR in demo mode)
  if (!isAuthenticated || (role !== 'tailor' && !isDemoMode)) {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { path: '/tailor', label: 'Overview', icon: Home },
    { path: '/tailor/profile', label: 'My Profile', icon: User },
    { path: '/tailor/orders', label: 'Order Requests', icon: Package },
    { path: '/tailor/marketplace', label: 'My Shop', icon: ShoppingBag },
    { path: '/tailor/delivery', label: 'Deliveries', icon: Truck },
    { path: '/tailor/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/tailor/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#8B1538] flex">
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-[#5A0A1F] to-[#6B0F2D] border-r border-[#FFD700]/20 transition-all duration-300 shadow-2xl",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#FFD700]/20">
          <Link to="/tailor" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <Scissors className="w-5 h-5 text-[#8B1538]" />
            </div>
            {sidebarOpen && (
              <div className="animate-slide-in-right">
                <span className="font-bold text-lg text-[#FFD700]">StitchMate</span>
                <p className="text-xs text-[#FFD700]/70">Tailor Portal</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-[#8B1538]/50 transition-colors text-[#FFD700]"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B1538] shadow-lg shadow-[#FFD700]/20 border border-[#FFD700]/50 font-bold"
                    : "text-[#FFD700]/80 hover:bg-[#8B1538]/50 hover:text-[#FFD700] hover:translate-x-1 hover:border hover:border-[#FFD700]/20"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#FFD700]/20">
          <div className={cn("flex items-center gap-3 p-3 rounded-xl bg-[#8B1538]/50 border border-[#FFD700]/20", !sidebarOpen && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center border border-[#FFD700]/50 shadow-lg">
              <Scissors className="w-5 h-5 text-[#8B1538]" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-[#FFD700]/70">Master Tailor</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className={cn("mt-3 text-[#FF6666] hover:text-[#FF4444] hover:bg-[#FF4444]/10 border border-[#FF6666]/30", sidebarOpen ? "w-full" : "w-full justify-center")}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TailorLayout;
