/**
 * Analytics & Tag Management Abstraction Layer for Bhansali Stainless
 *
 * CONFIGURATION INSTRUCTIONS:
 * 1. Replace GTM_CONTAINER_ID with your actual Google Tag Manager container ID (e.g., 'GTM-XXXXXXX')
 *    or provide process.env.NEXT_PUBLIC_GTM_ID in your .env.local file.
 * 2. Replace GA_MEASUREMENT_ID with your Google Analytics 4 Measurement ID (e.g., 'G-XXXXXXXXXX')
 *    or provide process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.
 */

export const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | 'enquiry_form_submitted'
  | 'rfq_initiated'
  | 'whatsapp_contact_clicked'
  | 'phone_contact_clicked'
  | 'spec_download_clicked'
  | 'grade_tab_selected';

export interface AnalyticsEventParams {
  [key: string]: string | number | boolean | undefined | null;
}

/**
 * Dispatches an event to Google Tag Manager dataLayer and GA4 gtag if available.
 * If running in development or placeholder mode, logs cleanly to console.
 */
export function trackEvent(eventName: AnalyticsEventName, params?: AnalyticsEventParams): void {
  const timestamp = new Date().toISOString();
  const eventPayload = {
    event: eventName,
    event_category: 'B2B_Industrial_Lead',
    timestamp,
    ...params,
  };

  // 1. Dispatch to window.dataLayer for GTM
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventPayload);

    // 2. Dispatch to GA4 gtag if defined
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  }

  // 3. Clear audit logging for developer verification
  if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
    console.groupCollapsed(`📊 [Analytics Event] ${eventName}`);
    console.log('Timestamp:', timestamp);
    console.log('Payload:', eventPayload);
    console.log('GTM Container ID:', GTM_CONTAINER_ID);
    console.log('GA4 ID:', GA_MEASUREMENT_ID);
    console.groupEnd();
  }
}

/**
 * Specifically tracks successful B2B enquiry submission
 */
export function trackEnquirySubmit(details: {
  enquiryId: string;
  destinationCountry: string;
  productGrade: string;
  flangeType: string;
  quantity: string;
}): void {
  trackEvent('enquiry_form_submitted', {
    enquiry_id: details.enquiryId,
    destination_country: details.destinationCountry,
    product_grade: details.productGrade,
    flange_type: details.flangeType,
    estimated_quantity: details.quantity,
    value_currency: 'USD',
  });
}

/**
 * Tracks WhatsApp click-through
 */
export function trackWhatsAppClick(sourceSection: string): void {
  trackEvent('whatsapp_contact_clicked', {
    source_section: sourceSection,
    channel: 'WhatsApp Business',
  });
}

/**
 * Tracks Phone click-through
 */
export function trackPhoneClick(sourceSection: string): void {
  trackEvent('phone_contact_clicked', {
    source_section: sourceSection,
    channel: 'Direct Phone',
  });
}
