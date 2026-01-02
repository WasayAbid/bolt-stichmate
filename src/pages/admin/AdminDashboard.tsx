import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingBag, TrendingUp, CheckCircle, XCircle, Clock, Mail, Phone, Briefcase, Store, MapPin, Eye, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LuxuryBackground } from '@/components/animations/LuxuryBackground';
import { motion } from 'framer-motion';

interface TailorApplication {
  id: string;
  user_id: string;
  shop_name: string;
  shop_address: string;
  years_experience: number;
  specializations: string[];
  portfolio_url: string | null;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  profiles: {
    full_name: string;
    user_id: string;
  };
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<TailorApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<TailorApplication | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const stats = [
    { label: 'Total Users', value: '2,456', icon: Users, gradient: 'from-[#C41E3A] to-[#8B1538]', change: '+12%' },
    { label: 'Active Orders', value: '189', icon: Package, gradient: 'from-[#FFD700] to-[#FFA500]', change: '+8%' },
    { label: 'Pending Applications', value: applications.filter(a => a.status === 'pending').length.toString(), icon: Clock, gradient: 'from-[#FFA500] to-[#FFD700]', change: '' },
    { label: 'Active Tailors', value: applications.filter(a => a.status === 'approved').length.toString(), icon: ShoppingBag, gradient: 'from-[#A31D45] to-[#C41E3A]', change: '+5%' },
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tailor_applications')
        .select(`
          *,
          profiles!inner(full_name, user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        toast.error('Failed to load applications');
        return;
      }

      setApplications(data as TailorApplication[]);
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (applicationId: string) => {
    if (!user) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase.rpc('approve_tailor_application', {
        application_id: applicationId,
        admin_id: user.id,
      });

      if (error) {
        console.error('Approval error:', error);
        toast.error('Failed to approve application');
        return;
      }

      toast.success('Application approved successfully!');
      fetchApplications();
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (applicationId: string) => {
    if (!user) return;

    setIsProcessing(true);
    try {
      const { error } = await supabase.rpc('reject_tailor_application', {
        application_id: applicationId,
        admin_id: user.id,
        notes: rejectNotes || null,
      });

      if (error) {
        console.error('Rejection error:', error);
        toast.error('Failed to reject application');
        return;
      }

      toast.success('Application rejected');
      setRejectNotes('');
      setSelectedApp(null);
      fetchApplications();
    } catch (err) {
      console.error('Error:', err);
      toast.error('An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <>
      <LuxuryBackground />
      <div className="space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6B0F2D]/90 via-[#8B1538]/80 to-[#A31D45]/90 p-8 md:p-12 backdrop-blur-sm border border-[#FFD700]/20 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C41E3A]/20 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-center gap-4">
            <Shield className="w-12 h-12 text-[#FFD700] animate-pulse" />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-[#FFD700]/90 text-lg font-medium">Manage StitchMate platform and tailor applications</p>
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
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#FFD700]/80 font-medium">{stat.label}</p>
                    {stat.change && <span className="text-xs font-bold text-[#4CAF50]">{stat.change}</span>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[#FFD700]" />
              Tailor Applications
            </h2>
            <Button
              onClick={fetchApplications}
              disabled={isLoading}
              className="bg-transparent border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300"
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>

          {pendingApplications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 bg-[#FFA500]/20 border border-[#FFD700]/30 rounded-xl p-4">
                <Clock className="w-5 h-5 text-[#FFD700]" />
                Pending Applications ({pendingApplications.length})
              </h3>
            <div className="grid gap-4">
              {pendingApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onApprove={handleApprove}
                  onReject={() => setSelectedApp(app)}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          </div>
        )}

          {approvedApplications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 bg-[#4CAF50]/20 border border-[#4CAF50]/30 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                Approved Tailors ({approvedApplications.length})
              </h3>
            <div className="grid gap-4">
              {approvedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} readonly />
              ))}
            </div>
          </div>
        )}

          {rejectedApplications.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 bg-[#FF4444]/20 border border-[#FF6666]/30 rounded-xl p-4">
                <XCircle className="w-5 h-5 text-[#FF6666]" />
                Rejected Applications ({rejectedApplications.length})
              </h3>
            <div className="grid gap-4">
              {rejectedApplications.map((app) => (
                <ApplicationCard key={app.id} application={app} readonly />
              ))}
            </div>
          </div>
        )}

          {!isLoading && applications.length === 0 && (
            <div className="text-center py-12 bg-[#8B1538]/50 rounded-2xl border border-[#FFD700]/20">
              <p className="text-[#FFD700]/80 font-medium">No tailor applications yet</p>
            </div>
          )}
        </motion.div>

        <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
          <DialogContent className="bg-gradient-to-br from-[#6B0F2D] to-[#8B1538] border-[#FFD700]/30">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">Reject Application</DialogTitle>
              <DialogDescription className="text-[#FFD700]/80">
                Are you sure you want to reject this application? You can optionally provide a reason.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="notes" className="text-[#FFD700]">Rejection Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Provide feedback for the applicant..."
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  rows={4}
                  className="bg-[#8B1538]/50 border-[#FFD700]/30 text-white placeholder:text-[#FFD700]/50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setSelectedApp(null)}
                disabled={isProcessing}
                className="bg-transparent border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => selectedApp && handleReject(selectedApp.id)}
                disabled={isProcessing}
                className="bg-[#FF4444] hover:bg-[#FF6666] text-white"
              >
                {isProcessing ? 'Rejecting...' : 'Reject Application'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

interface ApplicationCardProps {
  application: TailorApplication;
  onApprove?: (id: string) => void;
  onReject?: () => void;
  isProcessing?: boolean;
  readonly?: boolean;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onApprove,
  onReject,
  isProcessing,
  readonly,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    pending: 'bg-[#FFA500]/20 text-[#FFD700] border-[#FFD700]/40',
    approved: 'bg-[#4CAF50]/20 text-[#4CAF50] border-[#4CAF50]/40',
    rejected: 'bg-[#FF4444]/20 text-[#FF6666] border-[#FF6666]/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#C41E3A]/20 to-[#8B1538]/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
      <div className="relative bg-gradient-to-br from-[#A31D45]/80 to-[#6B0F2D]/80 backdrop-blur-sm border border-[#FFD700]/20 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-[#FFD700]/40 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-lg font-bold text-white">{application.profiles.full_name}</h4>
              <Badge className={statusColors[application.status]}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-[#FFD700]/80">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>{application.shop_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{application.years_experience} years experience</span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="bg-[#FFD700]/20 hover:bg-[#FFD700]/30 text-[#FFD700] border border-[#FFD700]/30"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {showDetails && (
          <div className="mb-4 p-4 bg-[#8B1538]/50 rounded-lg space-y-2 text-sm border border-[#FFD700]/20">
            <div className="flex items-start gap-2 text-[#FFD700]/90">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{application.shop_address}</span>
            </div>
            <div className="flex items-center gap-2 text-[#FFD700]/90">
              <Phone className="w-4 h-4" />
              <span>{application.phone}</span>
            </div>
            {application.specializations && application.specializations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {application.specializations.map((spec, idx) => (
                  <Badge key={idx} className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            )}
            {application.portfolio_url && (
              <a
                href={application.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FFD700] hover:text-[#FFA500] hover:underline block font-medium"
              >
                View Portfolio
              </a>
            )}
            <p className="text-xs text-[#FFD700]/60 mt-2">
              Applied: {new Date(application.created_at).toLocaleDateString()}
            </p>
          </div>
        )}

        {!readonly && application.status === 'pending' && (
          <div className="flex gap-3">
            <Button
              onClick={() => onApprove?.(application.id)}
              disabled={isProcessing}
              className="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={onReject}
              disabled={isProcessing}
              className="flex-1 bg-[#FF4444] hover:bg-[#FF6666] text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
