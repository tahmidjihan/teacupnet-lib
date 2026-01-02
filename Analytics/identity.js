const FINGERPRINT_KEY = 'teacup_fingerprint';

export default function fingerprint() {
  // Check if fingerprint already exists in localStorage
  const existingFingerprint = localStorage.getItem(FINGERPRINT_KEY);

  if (existingFingerprint) {
    return existingFingerprint;
  }

  // Generate new fingerprint if not found
  const canvas = document.createElement('canvas');
  canvas.width = 20;
  canvas.height = 2220;
  const ctx = canvas.getContext('2d');
  ctx.fillText('Hello', 10, 10);

  const data = canvas.toDataURL();
  const newFingerprint = data.slice(-32);

  // Store in localStorage for future use
  localStorage.setItem(FINGERPRINT_KEY, newFingerprint);

  return newFingerprint;
}
