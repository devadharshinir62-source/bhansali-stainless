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
    const rawData = await request.json();

    // Normalize and ensure exact required property names:
    // fullName, businessEmail, phone, company, destination, grade, flangeType, pressureRating, quantity, notes
    const fullName = typeof rawData.fullName === 'string' ? rawData.fullName.trim() : '';
    const businessEmail = typeof rawData.businessEmail === 'string' ? rawData.businessEmail.trim() : '';
    const phone = typeof rawData.phone === 'string' ? rawData.phone.trim() : '';
    const company = typeof (rawData.company ?? rawData.companyName) === 'string' ? (rawData.company ?? rawData.companyName).trim() : '';
    const destination = typeof (rawData.destination ?? rawData.destinationCountry) === 'string' ? (rawData.destination ?? rawData.destinationCountry).trim() : '';
    const grade = typeof (rawData.grade ?? rawData.productGrade) === 'string' ? (rawData.grade ?? rawData.productGrade).trim() : '';
    const flangeType = typeof rawData.flangeType === 'string' ? rawData.flangeType.trim() : '';
    const pressureRating = typeof (rawData.pressureRating ?? rawData.pressureClass) === 'string' ? (rawData.pressureRating ?? rawData.pressureClass).trim() : '';
    const quantity = typeof (rawData.quantity ?? rawData.estimatedQuantity) === 'string' ? (rawData.quantity ?? rawData.estimatedQuantity).trim() : '';
    const notes = typeof (rawData.notes ?? rawData.additionalSpecifications) === 'string' ? (rawData.notes ?? rawData.additionalSpecifications).trim() : '';

    const data: EnquiryFormData = {
      fullName,
      businessEmail,
      phone,
      company,
      destination,
      grade,
      flangeType,
      pressureRating,
      quantity,
      notes,
      // Backward compatibility aliases
      companyName: company,
      destinationCountry: destination,
      productGrade: grade,
      pressureClass: pressureRating,
      estimatedQuantity: quantity,
      additionalSpecifications: notes,
      sizeRange: rawData.sizeRange,
      projectTimeline: rawData.projectTimeline,
    };

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
    console.log(`Company      : ${data.company || 'Not specified'}`);
    console.log(`Destination  : ${data.destination || 'Middle East / GCC'}`);
    console.log(`Grade        : ${data.grade || 'Stainless Steel 316L'}`);
    console.log(`Flange Type  : ${data.flangeType || 'Weld Neck Flange'}`);
    console.log(`Pressure/Size: ${data.pressureRating || 'Class 150'} | ${data.sizeRange || ''}`);
    console.log(`Quantity     : ${data.quantity || 'Not specified'}`);
    console.log(`Timeline     : ${data.projectTimeline || 'Standard project schedule'}`);
    console.log(`Specs/Notes  : ${data.notes || 'None'}`);
    console.log('======================================================\n');

    // 3. Dispatch to CRM / Google Sheets Webhook
    const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
    if (!crmWebhookUrl) {
      console.error('[Bhansali RFQ] CRM_WEBHOOK_URL environment variable is not configured.');
      return NextResponse.json<EnquirySubmissionResponse>(
        {
          success: false,
          message: 'CRM integration is not configured. Quotation request could not be stored.',
        },
        { status: 503 }
      );
    }

    const webhookPayload = {
      enquiryId,
      submittedAt,
      fullName: data.fullName,
      businessEmail: data.businessEmail,
      phone: data.phone,
      company: data.company,
      destination: data.destination,
      grade: data.grade,
      flangeType: data.flangeType,
      pressureRating: data.pressureRating,
      quantity: data.quantity,
      notes: data.notes,
      // Backward compatibility aliases
      companyName: data.company,
      destinationCountry: data.destination,
      productGrade: data.grade,
      pressureClass: data.pressureRating,
      estimatedQuantity: data.quantity,
      additionalSpecifications: data.notes,
    };

    let webhookResponse: Response;
    try {
      webhookResponse = await fetch(crmWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });
    } catch (networkError) {
      console.error('[Bhansali RFQ] Network error dispatching to CRM webhook:', networkError);
      return NextResponse.json<EnquirySubmissionResponse>(
        {
          success: false,
          message: 'Failed to communicate with CRM webhook endpoint. Quotation request could not be stored.',
        },
        { status: 502 }
      );
    }

    if (!webhookResponse.ok) {
      console.error(`[Bhansali RFQ] CRM webhook returned failure status: ${webhookResponse.status} ${webhookResponse.statusText}`);
      return NextResponse.json<EnquirySubmissionResponse>(
        {
          success: false,
          message: `CRM webhook rejected the quotation request (status ${webhookResponse.status}). Request was not stored.`,
        },
        { status: 502 }
      );
    }

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
