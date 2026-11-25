# Google Apps Script Setup Guide for SMARToi Website Forms

This backend handles **Contact Form** and **Career Form** submissions, stores data in Google Sheets, uploads applicant resumes to Google Drive, and sends instant email notifications.

---

### Step 1: Create a Google Spreadsheet & Open Apps Script
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name the spreadsheet: **`SMARToi Website Submissions`**.
3. In the top menu, click **Extensions** > **Apps Script**.
4. Rename the script project to **`SMARToi Form Backend`**.

---

### Step 2: Paste the Apps Script Code
1. Erase any code inside `Code.gs`.
2. Copy and paste all the code from `google-apps-script/Code.gs` into `Code.gs`.
3. Check line 11:
   ```javascript
   const NOTIFICATION_EMAIL = "info@smartoi.in";
   ```
   *(Change this if you want notifications to go to a specific inbox or comma-separated emails like `"info@smartoi.in, yourname@gmail.com"`).*
4. Click the **Save** (disk) icon or press `Ctrl + S`.

---

### Step 3: Run Setup Once (Authorize Permissions)
1. In the Apps Script toolbar dropdown (where it says `doGet` or `Select function`), choose **`getOrCreateSheets`**.
2. Click **Run**.
3. A popup will ask for permissions. Click **Review permissions**.
4. Select your Google account.
5. If Google shows *"Google hasn't verified this app"*, click **Advanced** (bottom left), then click **Go to SMARToi Form Backend (unsafe)**.
6. Click **Allow** (Grants access to Google Drive, Gmail, and Google Sheets).
7. Notice that two formatted sheets have now been created automatically in your spreadsheet:
   - **`Contact Submissions`**
   - **`Career Applications`**
   And a folder named **`SMARToi Career Resumes`** in your Google Drive.

---

### Step 4: Deploy as a Web App
1. In the top right corner, click **Deploy** > **New deployment**.
2. Click the gear icon ⚙️ next to *Select type* and select **Web app**.
3. Fill in the deployment details:
   - **Description**: `SMARToi Website Form Backend`
   - **Execute as**: **`Me (your Google email)`**
   - **Who has access**: **`Anyone`** *(⚠️ IMPORTANT: Must be "Anyone" so the website can submit without requiring visitors to sign in).*
4. Click **Deploy**.
5. Copy the generated **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Step 5: Connect URL to Website
You can configure the URL in either of two ways:

#### Option A: Using `.env` file (Recommended)
Create or edit `.env` in the project root:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

#### Option B: In `src/services/formService.ts`
Replace the fallback URL in `src/services/formService.ts` with your deployment URL.
