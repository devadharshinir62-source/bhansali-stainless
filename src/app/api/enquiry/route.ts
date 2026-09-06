import { NextRequest, NextResponse } from 'next/server';
import { EnquiryFormData, EnquirySubmissionResponse } from '@/lib/types';

/**
 * Lead Capture API Endpoint for Bhansali Stainless RFQ Inquiries
 *
 * HOW TO CONNECT A REAL CRM / GOOGLE SHEETS / WEBHOOK:
 * 1. To send leads to HubSpot / Salesforce:
 *    Uncomment the integration block below and provide your CRM API Key or Webhook URL in .env.local:
 *    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
 *    if (CRM_WEBHOOK_URL) {
 *      await fetch(CRM_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(leadData) });
 *    }
 * 2. To send to a Google Sheet:
 *    Use Google Apps Script Web App URL or service account credentials.
 * 3. To send real transactional email notification (SendGrid/Resend/AWS SES):
 *    Trigger your email client using the parsed enquiry payload.
 */

export async function POST(request: NextRequest) {
  try {
    const data: EnquiryFormData = await request.json();

    // 1. Server-side validation check
    if (!data.fullName || !data.businessEmail || !data.phone) {
      return NextResponse.json<EnquirySubmissionResponse>(
        {
          success: false,
          message: 'Missing required inquiry parameters: Name, Business Email, and Phone are mandatory.',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.businessEmail)) {
      return NextResponse.json<EnquirySubmissionResponse>(
        {
          success: false,
          message: 'Invalid email address format provided.',
        },
        { status: 400 }
      );
    }

    // Generate unique verifiable quotation reference number
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const enquiryId = `BS-RFQ-${timestamp}-${randomSuffix}`;
    const submittedAt = new Date().toISOString();

    // 2. Structured B2B Quotation Log in Server Console
    console.log('\n======================================================');
    console.log('📌 [BHANSALI STAINLESS] NEW B2B RFQ ENQUIRY RECEIVED');
    console.log('======================================================');
    console.log(`Reference ID : ${enquiryId}`);
    console.log(`Received At  : ${submittedAt}`);
    console.log(`Full Name    : ${data.fullName}`);
    console.log(`Email        : ${data.businessEmail}`);
    console.log(`Phone        : ${data.phone}`);
    console.log(`Company      : ${data.companyName || 'Not specified'}`);
    console.log(`Destination  : ${data.destinationCountry || 'Middle East / GCC'}`);
    console.log(`Grade        : ${data.productGrade || 'Stainless Steel 316L'}`);
    console.log(`Flange Type  : ${data.flangeType || 'Weld Neck Flange'}`);
    console.log(`Pressure/Size: ${data.pressureClass || 'Class 150'} | ${data.sizeRange || 'NPS 2'}`);
    console.log(`Quantity     : ${data.estimatedQuantity || 'Not specified'}`);
    console.log(`Timeline     : ${data.projectTimeline || 'Standard project schedule'}`);
    console.log(`Specs/Notes  : ${data.additionalSpecifications || 'None'}`);
    console.log('======================================================\n');

    /*
    // OPTIONAL CRM WEBHOOK DISPATCH (Plug in your real endpoint here):
    if (process.env.CRM_WEBHOOK_URL) {
      try {
        await fetch(process.env.CRM_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enquiryId, submittedAt, ...data }),
        });
      } catch (crmErr) {
        console.error('CRM forwarding warning:', crmErr);
      }
    }
    */

    return NextResponse.json<EnquirySubmissionResponse>({
      success: true,
      message: 'Quotation request successfully logged and queued for engineering review.',
      enquiryId,
      submittedAt,
      data,
    });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json<EnquirySubmissionResponse>(
      {
        success: false,
        message: 'Internal server error while processing quotation request.',
      },
      { status: 500 }
    );
  }
}
