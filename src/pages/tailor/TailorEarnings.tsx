import React from 'react';
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';

/**
 * TailorEarnings - Earnings dashboard for tailors
 */
const TailorEarnings: React.FC = () => {
  const monthlyData = [
    { month: 'Jul', earnings: 32000 },
    { month: 'Aug', earnings: 38000 },
    { month: 'Sep', earnings: 35000 },
    { month: 'Oct', earnings: 42000 },
    { month: 'Nov', earnings: 48000 },
    { month: 'Dec', earnings: 45000 },
  ];

  const maxEarnings = Math.max(...monthlyData.map(d => d.earnings));

  const recentTransactions = [
    { id: 1, type: 'credit', description: 'Bridal Lehenga - Sarah Ahmed', amount: 45000, date: '20 Dec' },
    { id: 2, type: 'credit', description: 'Silk Kameez - Fatima Khan', amount: 8500, date: '18 Dec' },
    { id: 3, type: 'debit', description: 'Fabric Purchase', amount: -5000, date: '15 Dec' },
    { id: 4, type: 'credit', description: 'Party Gown - Ayesha Ali', amount: 15000, date: '12 Dec' },
    { id: 5, type: 'debit', description: 'Accessories Stock', amount: -3500, date: '10 Dec' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-gold" />
            Earnings
          </h1>
          <p className="text-muted-foreground">Track your income and expenses</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <AnimatedCard variant="glass" hoverEffect="glow" className="bg-gradient-to-br from-gold/10 to-coral/10">
          <AnimatedCardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold mt-1">Rs. 45,000</p>
              </div>
              <div className="flex items-center gap-1 text-mint text-sm">
                <ArrowUpRight className="w-4 h-4" />
                +12%
              </div>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
        <AnimatedCard variant="glass" hoverEffect="glow" className="bg-gradient-to-br from-mint/10 to-secondary/10">
          <AnimatedCardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-3xl font-bold mt-1">Rs. 2,40,000</p>
              </div>
              <TrendingUp className="w-8 h-8 text-mint" />
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
        <AnimatedCard variant="glass" hoverEffect="glow" className="bg-gradient-to-br from-lavender/10 to-primary/10">
          <AnimatedCardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-3xl font-bold mt-1">Rs. 25,000</p>
              </div>
              <Calendar className="w-8 h-8 text-lavender" />
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
      </div>

      {/* Chart */}
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader>
          <AnimatedCardTitle>Monthly Earnings</AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full bg-gradient-to-t from-primary to-mint rounded-t-lg transition-all duration-500 hover:from-gold hover:to-coral animate-slide-up stagger-${index + 1}`}
                  style={{ height: `${(data.earnings / maxEarnings) * 100}%`, minHeight: '20px' }}
                />
                <p className="text-sm font-medium mt-2">{data.month}</p>
                <p className="text-xs text-muted-foreground">Rs. {(data.earnings / 1000).toFixed(0)}k</p>
              </div>
            ))}
          </div>
        </AnimatedCardContent>
      </AnimatedCard>

      {/* Recent Transactions */}
      <AnimatedCard variant="bordered">
        <AnimatedCardHeader>
          <AnimatedCardTitle>Recent Transactions</AnimatedCardTitle>
        </AnimatedCardHeader>
        <AnimatedCardContent>
          <div className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between p-3 bg-muted/30 rounded-xl animate-slide-up stagger-${index + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-mint/20' : 'bg-destructive/20'
                  }`}>
                    {tx.type === 'credit' ? (
                      <ArrowDownRight className="w-5 h-5 text-mint" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${tx.type === 'credit' ? 'text-mint' : 'text-destructive'}`}>
                  {tx.type === 'credit' ? '+' : ''}Rs. {Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );
};

export default TailorEarnings;
