import { useState } from 'react';
import { Trash, Shield, Database, AlertTriangle } from 'lucide-react';
import { clearAllData, getLeads } from '../utils/storage';
import { generateDailyPIN } from '../utils/pinGenerator';

const Settings = ({ onDataCleared }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    clearAllData();
    setShowConfirm(false);
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
    if (onDataCleared) {
      onDataCleared();
    }
  };

  const leads = getLeads();
  const dailyPIN = generateDailyPIN();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vault-text mb-2">Settings</h1>
        <p className="text-vault-muted">System configuration and management</p>
      </div>

      {/* Security Info */}
      <div className="bg-vault-surface border border-vault-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-vault-danger flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-vault-text font-semibold mb-2">Security Information</h3>
            <p className="text-vault-muted text-sm mb-4">
              Your vault uses rotating PIN authentication based on the current date.
            </p>
          </div>
        </div>
        <div className="bg-vault-bg border border-vault-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-vault-muted text-sm">Today's PIN:</span>
            <span className="text-vault-danger font-mono font-bold text-xl tracking-widest">
              {dailyPIN}
            </span>
          </div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-vault-surface border border-vault-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Database className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-vault-text font-semibold mb-2">Data Storage</h3>
            <p className="text-vault-muted text-sm">
              All data is stored locally in your browser's localStorage.
            </p>
          </div>
        </div>
        <div className="bg-vault-bg border border-vault-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-vault-muted text-sm">Total Leads Stored:</span>
            <span className="text-vault-text font-mono font-bold text-xl">
              {leads.length}
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-vault-danger/5 border border-vault-danger/30 rounded-lg p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-vault-danger flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-vault-danger font-semibold mb-2">Danger Zone</h3>
            <p className="text-vault-muted text-sm">
              Permanently delete all lead data from local storage. This action cannot be undone.
            </p>
          </div>
        </div>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-vault-danger hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Trash className="w-5 h-5" />
            Clear All Data
          </button>
        ) : (
          <div className="bg-vault-bg border border-vault-danger rounded-lg p-4">
            <p className="text-vault-text font-semibold mb-4">
              Are you sure? This will delete all {leads.length} lead(s).
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClearData}
                className="bg-vault-danger hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
              >
                Yes, Delete All
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-vault-bg hover:bg-zinc-800 border border-vault-border text-vault-text font-medium py-2 px-6 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {cleared && (
          <div className="mt-4 text-green-500 text-sm font-mono bg-green-500/10 border border-green-500/30 rounded px-4 py-2">
            ✓ All data cleared successfully
          </div>
        )}
      </div>

      {/* System Info */}
      <div className="mt-6 bg-vault-surface border border-vault-border rounded-lg p-6">
        <h3 className="text-vault-text font-semibold mb-4">System Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-vault-border">
            <span className="text-vault-muted">Version</span>
            <span className="text-vault-text font-mono">2.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-vault-border">
            <span className="text-vault-muted">Protocol</span>
            <span className="text-vault-text font-mono">BLACK OPS</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-vault-muted">Storage Type</span>
            <span className="text-vault-text font-mono">LocalStorage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
