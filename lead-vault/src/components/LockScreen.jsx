import { useState } from 'react';
import { Lock, Mail, Shield, AlertTriangle } from 'lucide-react';
import { generateDailyPIN, validatePIN, getFormattedDate } from '../utils/pinGenerator';

const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    if (validatePIN(pin)) {
      onUnlock();
    } else {
      setError('INVALID PIN - ACCESS DENIED');
      setPin('');
    }
  };

  const handleEmailDispatch = () => {
    const dailyPIN = generateDailyPIN();
    const email = 'aramgrullonbritog@gmail.com';
    const subject = 'Security Alert: Lead Intelligence Vault Access';
    const body = `Security Alert: Your access PIN for today is ${dailyPIN}. You have pending leads to review.`;
    
    // Open mailto link
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success notification
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-vault-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-vault-surface border-2 border-vault-danger rounded-full mb-4">
            <Shield className="w-10 h-10 text-vault-danger" />
          </div>
          <h1 className="text-3xl font-bold text-vault-text mb-2">
            LEAD INTELLIGENCE VAULT
          </h1>
          <p className="text-vault-muted text-sm font-mono">
            CLASSIFIED ACCESS SYSTEM
          </p>
        </div>

        {/* Lock Screen Card */}
        <div className="bg-vault-surface border border-vault-border rounded-lg p-8 shadow-2xl">
          {/* Date Display */}
          <div className="text-center mb-6 pb-6 border-b border-vault-border">
            <p className="text-vault-muted text-xs uppercase tracking-wider mb-1">
              System Date
            </p>
            <p className="text-vault-text font-mono text-sm">
              {getFormattedDate()}
            </p>
          </div>

          {/* PIN Input Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <label className="block text-vault-muted text-xs uppercase tracking-wider mb-3">
              <Lock className="inline w-3 h-3 mr-1" />
              Enter Security PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              placeholder="••••"
              maxLength={4}
              className="w-full bg-vault-bg border border-vault-border text-vault-text text-center text-2xl font-mono tracking-widest py-4 px-4 rounded-lg focus:border-vault-danger focus:ring-2 focus:ring-vault-danger/50 transition-all"
              autoFocus
            />
            
            {error && (
              <div className="mt-3 flex items-center gap-2 text-vault-danger text-sm bg-vault-danger/10 border border-vault-danger/30 rounded px-3 py-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span className="font-mono">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-vault-danger hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              UNLOCK VAULT
            </button>
          </form>

          {/* Email Dispatch */}
          <div className="pt-6 border-t border-vault-border">
            <button
              type="button"
              onClick={handleEmailDispatch}
              className="w-full bg-vault-bg hover:bg-zinc-800 border border-vault-border text-vault-text font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Simulate Email Dispatch
            </button>
            
            {emailSent && (
              <div className="mt-3 text-center text-green-500 text-sm font-mono bg-green-500/10 border border-green-500/30 rounded px-3 py-2">
                ✓ Encryption Key Sent
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-vault-muted text-xs font-mono">
          <p>SECURE SYSTEM v2.0 | BLACK OPS PROTOCOL</p>
          <p className="mt-1">Unauthorized access is prohibited</p>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
