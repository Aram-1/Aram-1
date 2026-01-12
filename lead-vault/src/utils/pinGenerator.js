/**
 * Generate rotating PIN based on current date
 * Formula: (parseInt(YYYYMMDD) * 3).toString().slice(-4)
 */
export const generateDailyPIN = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  const dateString = `${year}${month}${day}`;
  const dateNumber = parseInt(dateString, 10);
  const multiplied = dateNumber * 3;
  const pin = multiplied.toString().slice(-4);
  
  return pin;
};

/**
 * Validate entered PIN against today's generated PIN
 */
export const validatePIN = (enteredPIN) => {
  const correctPIN = generateDailyPIN();
  return enteredPIN === correctPIN;
};

/**
 * Get formatted date for display
 */
export const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
