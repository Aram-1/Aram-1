/**
 * Parse Construction Monitor PDF text to extract lead data
 */
export const parseLeadData = (text) => {
  const leads = [];
  
  // Split by lines and process
  const lines = text.split('\n').filter(line => line.trim());
  
  // Regex patterns
  const valuationPattern = /\$[\d,]+/g;
  const addressPattern = /\d+\s+[A-Za-z\s]+(?:Rd|Road|St|Street|Ave|Avenue|Dr|Drive|Ln|Lane|Blvd|Boulevard|Way|Ct|Court|Pl|Place|Creek)/gi;
  const typePattern = /\b(New Home|Remodel|Addition|Renovation|Commercial|Residential)\b/gi;
  
  // Try to extract structured data
  let currentLead = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Extract valuation
    const valuationMatch = line.match(valuationPattern);
    if (valuationMatch) {
      const valuation = valuationMatch[0].replace(/[$,]/g, '');
      currentLead.valuation = parseInt(valuation, 10);
      currentLead.valuationDisplay = valuationMatch[0];
    }
    
    // Extract address
    const addressMatch = line.match(addressPattern);
    if (addressMatch) {
      currentLead.address = addressMatch[0].trim();
    }
    
    // Extract type
    const typeMatch = line.match(typePattern);
    if (typeMatch) {
      currentLead.type = typeMatch[0];
    }
    
    // If we have enough data, save the lead
    if (currentLead.valuation && currentLead.address) {
      leads.push({
        id: Date.now() + Math.random(),
        address: currentLead.address,
        valuation: currentLead.valuation,
        valuationDisplay: currentLead.valuationDisplay || `$${currentLead.valuation.toLocaleString()}`,
        type: currentLead.type || 'Unknown',
        priority: getPriority(currentLead.valuation),
        status: 'New',
        createdAt: new Date().toISOString(),
      });
      currentLead = {};
    }
  }
  
  return leads;
};

/**
 * Determine priority based on valuation
 */
export const getPriority = (valuation) => {
  if (valuation > 400000) return 'PLATINUM';
  if (valuation > 150000) return 'GOLD';
  return 'STANDARD';
};

/**
 * Get priority badge color
 */
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'PLATINUM':
      return 'bg-red-500 text-white';
    case 'GOLD':
      return 'bg-yellow-500 text-black';
    default:
      return 'bg-zinc-600 text-white';
  }
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
