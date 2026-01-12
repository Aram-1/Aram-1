import { useEffect, useState } from 'react';
import { DollarSign, Award, AlertCircle, TrendingUp } from 'lucide-react';
import { getStats } from '../utils/storage';
import { formatCurrency } from '../utils/leadParser';

const Overview = () => {
  const [stats, setStats] = useState({
    totalValue: 0,
    platinumCount: 0,
    pendingCount: 0,
    totalLeads: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const data = getStats();
    setStats(data);
  };

  const kpiCards = [
    {
      title: 'Total Value',
      value: formatCurrency(stats.totalValue),
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      title: 'Platinum Leads',
      value: stats.platinumCount,
      icon: Award,
      color: 'text-vault-danger',
      bgColor: 'bg-vault-danger/10',
      borderColor: 'border-vault-danger/30',
    },
    {
      title: 'Pending Actions',
      value: stats.pendingCount,
      icon: AlertCircle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vault-text mb-2">Overview</h1>
        <p className="text-vault-muted">Intelligence dashboard and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`bg-vault-surface border ${card.borderColor} rounded-lg p-6 ${card.bgColor}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <p className="text-vault-muted text-sm mb-1">{card.title}</p>
              <p className={`text-3xl font-bold font-mono ${card.color}`}>
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Status Panel */}
      <div className="bg-vault-surface border border-vault-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-vault-text mb-4">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-vault-border">
            <span className="text-vault-muted">Data Storage</span>
            <span className="text-green-500 font-mono text-sm">● OPERATIONAL</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-vault-border">
            <span className="text-vault-muted">Security Protocol</span>
            <span className="text-green-500 font-mono text-sm">● ACTIVE</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-vault-muted">Parser Engine</span>
            <span className="text-green-500 font-mono text-sm">● READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
