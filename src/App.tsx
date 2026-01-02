import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DesignProvider } from "@/contexts/DesignContext";

// Pages
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

// Auth Pages
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import TailorApplyPage from "./pages/auth/TailorApplyPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage";

// User Dashboard
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import FabricToDesignStudio from "./pages/user/FabricToDesignStudio";
import VirtualTryOn from "./pages/user/VirtualTryOn";
import AccessoriesMarketplace from "./pages/user/AccessoriesMarketplace";
import MyOrders from "./pages/user/MyOrders";
import ChatbotAssistant from "./pages/user/ChatbotAssistant";
import UserProfile from "./pages/user/UserProfile";
import MarketplaceBidding from "./pages/user/MarketplaceBidding";

// Tailor Dashboard
import TailorLayout from "./layouts/TailorLayout";
import TailorDashboard from "./pages/tailor/TailorDashboard";
import TailorProfile from "./pages/tailor/TailorProfile";
import TailorOrders from "./pages/tailor/TailorOrders";
import TailorBidding from "./pages/tailor/TailorBidding";
import TailorShop from "./pages/tailor/TailorShop";
import TailorDelivery from "./pages/tailor/TailorDelivery";
import TailorEarnings from "./pages/tailor/TailorEarnings";

// Admin Dashboard
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DesignProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/tailor-apply" element={<TailorApplyPage />} />
              <Route path="/auth/admin" element={<AdminLoginPage />} />
              
              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<UserLayout />}>
                <Route index element={<UserDashboard />} />
                <Route path="studio" element={<FabricToDesignStudio />} />
                <Route path="tryon" element={<VirtualTryOn />} />
                <Route path="marketplace" element={<AccessoriesMarketplace />} />
                <Route path="orders" element={<MyOrders />} />
                <Route path="chatbot" element={<ChatbotAssistant />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="bidding" element={<MarketplaceBidding />} />
              </Route>

              {/* Tailor Dashboard Routes */}
              <Route path="/tailor" element={<TailorLayout />}>
                <Route index element={<TailorDashboard />} />
                <Route path="profile" element={<TailorProfile />} />
                <Route path="orders" element={<TailorOrders />} />
                <Route path="bidding" element={<TailorBidding />} />
                <Route path="marketplace" element={<TailorShop />} />
                <Route path="delivery" element={<TailorDelivery />} />
                <Route path="earnings" element={<TailorEarnings />} />
              </Route>

              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DesignProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
