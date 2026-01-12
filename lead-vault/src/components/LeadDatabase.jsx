import { useState, useEffect } from 'react';
import { Trash2, Phone, Search, Filter } from 'lucide-react';
import { getLeads, updateLead, deleteLead } from '../utils/storage';
import { getPriorityColor, formatCurrency } from '../utils/leadParser';

const LeadDatabase = ({ refreshTrigger }) => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadLeads();
  }, [refreshTrigger]);

  const loadLeads = () => {
    const data = getLeads();
    setLeads(data);
  };

  const handleMarkAsCalled = (id) => {
    updateLead(id, { status: 'Called' });
    loadLeads();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this lead?')) {
      deleteLead(id);
      loadLeads();
    }
  };

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || lead.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vault-text mb-2">Lead Database</h1>
        <p className="text-vault-muted">Manage and track all leads</p>
      </div>

      {/* Filters */}
      <div className="bg-vault-surface border border-vault-border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-vault-muted text-sm mb-2">Search Address</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vault-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full bg-vault-bg border border-vault-border text-vault-text pl-10 pr-4 py-2 rounded-lg focus:border-vault-danger focus:ring-2 focus:ring-vault-danger/50"
              />
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-vault-muted text-sm mb-2">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full bg-vault-bg border border-vault-border text-vault-text px-4 py-2 rounded-lg focus:border-vault-danger focus:ring-2 focus:ring-vault-danger/50"
            >
              <option value="all">All Priorities</option>
              <option value="PLATINUM">PLATINUM</option>
              <option value="GOLD">GOLD</option>
              <option value="STANDARD">STANDARD</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-vault-muted text-sm mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-vault-bg border border-vault-border text-vault-text px-4 py-2 rounded-lg focus:border-vault-danger focus:ring-2 focus:ring-vault-danger/50"
            >
              <option value="all">All Status</option>
              <option value="New">New</option>
              <option value="Called">Called</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-vault-muted text-sm">
        Showing {filteredLeads.length} of {leads.length} leads
      </div>

      {/* Table */}
      <div className="bg-vault-surface border border-vault-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-vault-bg border-b border-vault-border">
              <tr>
                <th className="text-left text-vault-muted text-xs uppercase tracking-wider px-6 py-4 font-semibold">
                  Priority
                </th>
                <th className="text-left text-vault-muted text-xs uppercase tracking-wider px-6 py-4 font-semibold">
                  Address
                </th>
                <th className="text-left text-vault-muted text-xs uppercase tracking-wider px-6 py-4 font-semibold">
                  Valuation
                </th>
                <th className="text-left text-vault-muted text-xs uppercase tracking-wider px-6 py-4 font-semibold">
                  Type
                </th>
                <th className="text-left text-vault-muted text-xs uppercase tracking-wider px-6 py-4 font-semibold">
                  Status
                </th>
                <th className="text-left text-vault-muted text-xs uppercase tracking-wider px-6 py-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vault-border">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-vault-muted py-12">
                    No leads found. Start by ingesting data.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-vault-bg transition-colors">
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(
                          lead.priority
                        )}`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-vault-text font-medium">
                      {lead.address}
                    </td>
                    <td className="px-6 py-4 text-vault-text font-mono font-semibold">
                      {formatCurrency(lead.valuation)}
                    </td>
                    <td className="px-6 py-4 text-vault-muted">
                      {lead.type}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          lead.status === 'New'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-green-500/20 text-green-500'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {lead.status === 'New' && (
                          <button
                            onClick={() => handleMarkAsCalled(lead.id)}
                            className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-all"
                            title="Mark as Called"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 bg-vault-danger/10 hover:bg-vault-danger/20 text-vault-danger rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadDatabase;
