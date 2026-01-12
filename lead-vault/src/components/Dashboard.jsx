import { useState } from 'react';
import Sidebar from './Sidebar';
import Overview from './Overview';
import IngestData from './IngestData';
import LeadDatabase from './LeadDatabase';
import Settings from './Settings';

const Dashboard = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState('overview');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleDataChange = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Overview key={refreshTrigger} />;
      case 'ingest':
        return <IngestData onDataIngested={handleDataChange} />;
      case 'database':
        return <LeadDatabase refreshTrigger={refreshTrigger} />;
      case 'settings':
        return <Settings onDataCleared={handleDataChange} />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-vault-bg">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onLogout={onLogout}
      />
      <div className="flex-1 overflow-y-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default Dashboard;
