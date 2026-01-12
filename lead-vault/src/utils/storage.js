const STORAGE_KEY = 'lead_vault_data';

/**
 * Get all leads from localStorage
 */
export const getLeads = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/**
 * Save leads to localStorage
 */
export const saveLeads = (leads) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Add a new lead
 */
export const addLead = (lead) => {
  const leads = getLeads();
  const newLead = {
    ...lead,
    id: Date.now() + Math.random(),
    createdAt: new Date().toISOString(),
    status: lead.status || 'New',
  };
  leads.push(newLead);
  saveLeads(leads);
  return newLead;
};

/**
 * Add multiple leads
 */
export const addLeads = (newLeads) => {
  const leads = getLeads();
  const updatedLeads = [...leads, ...newLeads];
  saveLeads(updatedLeads);
  return updatedLeads;
};

/**
 * Update a lead
 */
export const updateLead = (id, updates) => {
  const leads = getLeads();
  const index = leads.findIndex(lead => lead.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...updates };
    saveLeads(leads);
    return leads[index];
  }
  return null;
};

/**
 * Delete a lead
 */
export const deleteLead = (id) => {
  const leads = getLeads();
  const filtered = leads.filter(lead => lead.id !== id);
  saveLeads(filtered);
  return filtered;
};

/**
 * Get statistics
 */
export const getStats = () => {
  const leads = getLeads();
  
  const totalValue = leads.reduce((sum, lead) => sum + (lead.valuation || 0), 0);
  const platinumCount = leads.filter(lead => lead.priority === 'PLATINUM').length;
  const pendingCount = leads.filter(lead => lead.status === 'New').length;
  
  return {
    totalValue,
    platinumCount,
    pendingCount,
    totalLeads: leads.length,
  };
};

/**
 * Clear all data
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
