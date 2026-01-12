import { LayoutDashboard, Upload, Database, Settings, LogOut, Shield } from 'lucide-react';

const Sidebar = ({ currentView, onViewChange, onLogout }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'ingest', label: 'Ingest Data', icon: Upload },
    { id: 'database', label: 'Lead Database', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-vault-surface border-r border-vault-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-vault-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-vault-danger rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-vault-text font-bold text-sm">LEAD VAULT</h2>
            <p className="text-vault-muted text-xs font-mono">BLACK OPS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-vault-danger text-white'
                      : 'text-vault-muted hover:text-vault-text hover:bg-vault-bg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-vault-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-vault-muted hover:text-vault-danger hover:bg-vault-bg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Lock Vault</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
