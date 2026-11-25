/**
 * =========================================================================
 * SMARToi Google Apps Script Backend (Web App)
 * Handles:
 *  1. Contact Form Submissions -> Saved to "Contact Submissions" sheet + Email notification
 *  2. Career Form Submissions -> Saved to "Career Applications" sheet + Resume uploaded to Google Drive + Email notification
 * =========================================================================
 */

// CONFIGURATION
const NOTIFICATION_EMAIL = "smartoillp@gmail.com"; // Email recipient
const RESUME_FOLDER_NAME = "SMARToi Career Resumes"; // Folder in Google Drive where resumes will be saved
const SPREADSHEET_NAME = "SMARToi Website Submissions";
// If this script is bound directly to your spreadsheet (Extensions > Apps Script), leave SPREADSHEET_ID empty "".
// If it's a standalone script, you can paste your Google Spreadsheet ID here (the id between /d/ and /edit in your sheet url).
const SPREADSHEET_ID = "";

/**
 * Setup or obtain the target Google Spreadsheet and specific Sheets
 */
function getOrCreateSheets() {
  let ss;
  try {
    if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
  } catch (e) {
    if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    } else {
      // If not bound to a sheet, try finding or creating by name
      const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
      if (files.hasNext()) {
        ss = SpreadsheetApp.open(files.next());
      } else {
        ss = SpreadsheetApp.create(SPREADSHEET_NAME);
      }
    }
  }

  // 1. Contact Submissions Sheet
  let contactSheet = ss.getSheetByName("Contact Submissions");
  if (!contactSheet) {
    contactSheet = ss.insertSheet("Contact Submissions");
    contactSheet.appendRow([
      "Timestamp",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Sector",
      "Service Option",
      "Message"
    ]);
    const headerRange = contactSheet.getRange(1, 1, 1, 7);
    headerRange.setBackground("#0B63CE");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    contactSheet.setFrozenRows(1);
  }

  // 2. Career Applications Sheet
  let careerSheet = ss.getSheetByName("Career Applications");
  if (!careerSheet) {
    careerSheet = ss.insertSheet("Career Applications");
    careerSheet.appendRow([
      "Timestamp",
      "Position Applied",
      "Applicant Name",
      "Email Address",
      "Phone Number",
      "Resume File Name",
      "Google Drive Resume Link"
    ]);
    const headerRange = careerSheet.getRange(1, 1, 1, 7);
    headerRange.setBackground("#10B981");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    careerSheet.setFrozenRows(1);
  }

  return { ss, contactSheet, careerSheet };
}

/**
 * Setup or obtain the Google Drive folder for resumes
 */
function getOrCreateResumeFolder() {
  const folders = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(RESUME_FOLDER_NAME);
}

/**
 * Handles HTTP GET (useful for health checks & tests)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "SMARToi Apps Script Webhook is active and running!"
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles HTTP POST form submissions from Contact & Career pages
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No post data received");
    }

    const payload = JSON.parse(e.postData.contents);
    const { formType } = payload;
    const { contactSheet, careerSheet } = getOrCreateSheets();
    const timestamp = new Date();

    // ----------------------------------------------------
    // FORM 1: CONTACT FORM
    // ----------------------------------------------------
    if (formType === "contact") {
      const { name, email, phone, sector, option, message } = payload;

      // 1. Append row to Contact Sheet
      contactSheet.appendRow([
        timestamp,
        name || "",
        email || "",
        phone || "",
        sector || "",
        option || "",
        message || ""
      ]);

      // 2. Send Email Notification
      const emailSubject = `🔔 New Contact Inquiry: ${name || "Visitor"} (${sector || "General"})`;
      const emailBody = `
You have received a new contact submission from the SMARToi website!

---------------------------------------------------------
DETAILS:
---------------------------------------------------------
• Timestamp: ${timestamp.toLocaleString()}
• Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Sector: ${sector}
• Service / Option: ${option || "N/A"}

---------------------------------------------------------
MESSAGE:
---------------------------------------------------------
${message}

---------------------------------------------------------
Submitted via SMARToi Website Contact Form.
      `.trim();

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: emailSubject,
        body: emailBody
      });

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Contact form submitted successfully!"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // ----------------------------------------------------
    // FORM 2: CAREER APPLICATION FORM
    // ----------------------------------------------------
    if (formType === "career") {
      const { role, name, email, phone, resumeData, resumeName, resumeType } = payload;

      let resumeFileUrl = "No file attached";

      // Upload resume to Google Drive if base64 file data is provided
      if (resumeData) {
        try {
          const folder = getOrCreateResumeFolder();
          const cleanBase64 = resumeData.replace(/^data:.*,/, '');
          const decodedBytes = Utilities.base64Decode(cleanBase64);
          const blob = Utilities.newBlob(decodedBytes, resumeType || "application/pdf", `${name || "Applicant"}_${resumeName || "Resume"}`);
          const file = folder.createFile(blob);
          
          // Make file viewable by anyone with link or within organization
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          resumeFileUrl = file.getUrl();
        } catch (uploadError) {
          resumeFileUrl = "Upload failed: " + uploadError.toString();
        }
      }

      // 1. Append row to Career Sheet
      careerSheet.appendRow([
        timestamp,
        role || "",
        name || "",
        email || "",
        phone || "",
        resumeName || "",
        resumeFileUrl
      ]);

      // 2. Send Email Notification
      const emailSubject = `💼 New Career Application: ${name || "Candidate"} - ${role || "Role"}`;
      const emailBody = `
You have received a new job application from the SMARToi Career Portal!

---------------------------------------------------------
APPLICANT DETAILS:
---------------------------------------------------------
• Timestamp: ${timestamp.toLocaleString()}
• Position: ${role}
• Full Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Resume File: ${resumeName || "N/A"}
• Google Drive Resume Link: ${resumeFileUrl}

---------------------------------------------------------
Submitted via SMARToi Website Career Page.
      `.trim();

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: emailSubject,
        body: emailBody
      });

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Career application submitted successfully!",
        resumeUrl: resumeFileUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }

    throw new Error("Invalid formType: " + formType);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
