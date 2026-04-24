// ============================================================
// GOOGLE SHEETS FORM HANDLER — Setup Instructions
// ============================================================
//
// STEP 1: Open Google Sheets → Create a new spreadsheet
//         Name it: "MetroBrainAbacus Bookings"
//
// STEP 2: In Row 1, add these headers (one per column):
//         A1: Timestamp
//         B1: Parent Name
//         C1: Child Name
//         D1: Email
//         E1: Phone
//         F1: Child Age
//         G1: Program
//         H1: Message
//
// STEP 3: Go to Extensions → Apps Script
//         Delete any existing code and paste THIS ENTIRE FILE
//
// STEP 4: Click "Deploy" → "New deployment"
//         - Type: Web app
//         - Execute as: Me
//         - Who has access: Anyone
//         - Click "Deploy"
//
// STEP 5: Copy the Web App URL (looks like:
//         https://script.google.com/macros/s/XXXXX/exec)
//
// STEP 6: Paste that URL in your index.html where it says:
//         const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_SHEET_URL_HERE';
//
// That's it! Every form submission will now appear in your Google Sheet.
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.parentName,
      data.childName,
      data.email,
      data.phone,
      data.childAge + ' years',
      data.program,
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Saved to Google Sheet!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('MetroBrainAbacus form handler is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}
