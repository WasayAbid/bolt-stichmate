import React from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shirt, ShoppingBag, Package,
  LogOut, User, Menu, X, Home, Sparkles, MessageCircle, Gavel, Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChatWidget } from '@/components/chatbot/ChatWidget';

/**
 * UserLayout - Dashboard layout for regular users
 * Features animated sidebar with navigation
 */
const UserLayout: React.FC = () => {
  const { user, profile, role, isAuthenticated, isLoading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#8B1538]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  if (!isAuthenticated || role !== 'user') {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: Home },
    { path: '/dashboard/studio', label: 'Design Studio', icon: Wand2 },
    { path: '/dashboard/tryon', label: 'Virtual Try-On', icon: Shirt },
    { path: '/dashboard/marketplace', label: 'Accessories', icon: ShoppingBag },
    { path: '/dashboard/bidding', label: 'Post Order', icon: Gavel },
    { path: '/dashboard/orders', label: 'My Orders', icon: Package },
    { path: '/dashboard/chatbot', label: 'AI Assistant', icon: MessageCircle },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#8B1538] flex">
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-[#6B0F2D] to-[#5A0A1F] border-r border-[#FFD700]/20 transition-all duration-300 shadow-2xl",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#FFD700]/20">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C41E3A] to-[#FFD700] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg text-[#FFD700] animate-slide-in-right">StitchMate</span>
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
                    ? "bg-gradient-to-r from-[#C41E3A] to-[#A31D45] text-white shadow-lg shadow-[#FFD700]/20 border border-[#FFD700]/30"
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
            <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center border border-[#FFD700]/30">
              <User className="w-5 h-5 text-[#FFD700]" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-[#FFD700]/70 truncate">{user?.email}</p>
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

      {/* Floating Chat Widget - hidden on chatbot page */}
      {location.pathname !== '/dashboard/chatbot' && <ChatWidget />}
    </div>
  );
};

export default UserLayout;
