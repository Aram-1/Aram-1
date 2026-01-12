import { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { parseLeadData } from '../utils/leadParser';
import { addLeads } from '../utils/storage';

const IngestData = ({ onDataIngested }) => {
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState(null);
  const [parsedCount, setParsedCount] = useState(0);

  const handleParse = () => {
    if (!inputText.trim()) {
      setStatus({ type: 'error', message: 'Please paste data to parse' });
      return;
    }

    try {
      const leads = parseLeadData(inputText);
      
      if (leads.length === 0) {
        setStatus({ 
          type: 'error', 
          message: 'No valid leads found. Check data format.' 
        });
        return;
      }

      addLeads(leads);
      setParsedCount(leads.length);
      setStatus({ 
        type: 'success', 
        message: `Successfully parsed and saved ${leads.length} lead(s)` 
      });
      setInputText('');
      
      if (onDataIngested) {
        onDataIngested();
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Parsing error: ' + error.message 
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setStatus(null);
    setParsedCount(0);
  };

  const sampleData = `Construction Monitor Report
544 Robie Creek Rd
Valuation: $521,096
Type: New Home

1234 Mountain View Dr
Valuation: $425,000
Type: Remodel

789 Valley Street
Valuation: $180,500
Type: Addition`;

  const loadSample = () => {
    setInputText(sampleData);
    setStatus(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vault-text mb-2">Ingest Data</h1>
        <p className="text-vault-muted">Parse Construction Monitor PDF text</p>
      </div>

      {/* Instructions */}
      <div className="bg-vault-surface border border-vault-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-vault-danger flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-vault-text font-semibold mb-2">Parser Instructions</h3>
            <ul className="text-vault-muted text-sm space-y-1">
              <li>• Paste text from Construction Monitor PDF reports</li>
              <li>• Parser extracts: Address, Valuation, Type</li>
              <li>• Auto-tags: PLATINUM (&gt;$400k), GOLD (&gt;$150k)</li>
              <li>• Data saved to secure local storage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-vault-surface border border-vault-border rounded-lg p-6 mb-6">
        <label className="block text-vault-text font-semibold mb-3">
          Paste Construction Monitor Data
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your Construction Monitor PDF text here...&#10;&#10;Example:&#10;544 Robie Creek Rd&#10;Valuation: $521,096&#10;Type: New Home"
          className="w-full h-64 bg-vault-bg border border-vault-border text-vault-text font-mono text-sm p-4 rounded-lg focus:border-vault-danger focus:ring-2 focus:ring-vault-danger/50 resize-none"
        />

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleParse}
            className="flex-1 bg-vault-danger hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Parse & Ingest Data
          </button>
          <button
            onClick={handleClear}
            className="bg-vault-bg hover:bg-zinc-800 border border-vault-border text-vault-text font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            Clear
          </button>
          <button
            onClick={loadSample}
            className="bg-vault-bg hover:bg-zinc-800 border border-vault-border text-vault-text font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            Load Sample
          </button>
        </div>
      </div>

      {/* Status Message */}
      {status && (
        <div
          className={`border rounded-lg p-4 flex items-center gap-3 ${
            status.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-500'
              : 'bg-vault-danger/10 border-vault-danger/30 text-vault-danger'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-mono text-sm">{status.message}</span>
        </div>
      )}

      {/* Parsing Stats */}
      {parsedCount > 0 && (
        <div className="mt-6 bg-vault-surface border border-vault-border rounded-lg p-6">
          <h3 className="text-vault-text font-semibold mb-3">Last Ingestion</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold font-mono text-vault-danger">{parsedCount}</p>
              <p className="text-vault-muted text-sm mt-1">Leads Parsed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngestData;
