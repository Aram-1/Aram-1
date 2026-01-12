import { useState } from 'react';
import LockScreen from './components/LockScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleLogout = () => {
    setIsUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-vault-bg">
      {!isUnlocked ? (
        <LockScreen onUnlock={handleUnlock} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
