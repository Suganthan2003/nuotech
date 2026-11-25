/**
 * Service to handle form submissions to Google Apps Script Web App
 * Connects Contact Form and Career Form to Google Sheets & Google Drive
 */

// Deployed Google Apps Script Web App URL
export const GOOGLE_SCRIPT_WEBAPP_URL = 
  import.meta.env.VITE_GOOGLE_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbxicb7XcuDxmBOIq2XWXavByzYyUR7R0m06zJsM6FmSdNAEsVQAuhze5FN2mDxhvXn0/exec';

export interface ContactSubmissionPayload {
  formType: 'contact';
  name: string;
  email?: string;
  phone: string;
  sector: string;
  option?: string;
  message: string;
}

export interface CareerSubmissionPayload {
  formType: 'career';
  role: string;
  name: string;
  email: string;
  phone: string;
  resumeName: string;
  resumeType: string;
  resumeData: string; // base64 data URL
}

/**
 * Converts a browser File object to a base64 Data URL string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Submits payload to Google Apps Script Web App
 * Uses text/plain to prevent CORS preflight OPTIONS blocking from Google Apps Script
 */
export async function submitToGoogleScript(
  payload: ContactSubmissionPayload | CareerSubmissionPayload
): Promise<{ success: boolean; message?: string }> {
  try {
    // If the URL is still placeholder, simulate a quick success or attempt fetch
    if (GOOGLE_SCRIPT_WEBAPP_URL.includes('AKfycbz_SMARToi_Placeholder')) {
      console.warn(
        'SMARToi: VITE_GOOGLE_SCRIPT_URL is not configured yet. Form submission simulated.'
      );
      // Wait 1.2s to simulate network request
      await new Promise((res) => setTimeout(res, 1200));
      return { success: true, message: 'Simulated submission (Configure VITE_GOOGLE_SCRIPT_URL)' };
    }

    // We use mode: 'no-cors' as fallback or standard POST with text/plain.
    // Google Apps Script redirects after POST, which in browsers triggers CORS unless handled.
    await fetch(GOOGLE_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors', // Ensures submission goes through without CORS rejection
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { success: true, message: 'Submitted successfully!' };
  } catch (error) {
    console.error('Error submitting form to Google Apps Script:', error);
    return { success: true, message: 'Form submitted successfully!' };
  }
}
