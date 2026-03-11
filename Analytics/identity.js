const FINGERPRINT_KEY = 'teacup_fingerprint';

/**
 * Generate a unique fingerprint for the user
 * Uses canvas fingerprinting with fallback to random ID
 * @returns {string} User fingerprint
 */
export default function fingerprint() {
  // Check if fingerprint already exists in localStorage
  const existingFingerprint = localStorage.getItem(FINGERPRINT_KEY);

  if (existingFingerprint) {
    return existingFingerprint;
  }

  // Generate new fingerprint if not found
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.font = '14px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText('TeacupFingerprint', 10, 30);
      ctx.strokeStyle = '#000';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL();
      // Extract last 32 chars as fingerprint
      const newFingerprint = dataUrl.slice(-32);
      
      // Store in localStorage for future use
      localStorage.setItem(FINGERPRINT_KEY, newFingerprint);
      
      return newFingerprint;
    }
  } catch (error) {
    console.warn('Canvas fingerprinting failed, using fallback:', error);
  }

  // Fallback: generate random fingerprint
  const randomFingerprint = 'fp_' + Math.random().toString(36).substring(2, 18) + 
                            Date.now().toString(36);
  localStorage.setItem(FINGERPRINT_KEY, randomFingerprint);
  
  return randomFingerprint;
}
