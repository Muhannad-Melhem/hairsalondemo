/**
 * Email service for transactional emails.
 * Uses Resend for delivery.
 *
 * Required env vars:
 *   RESEND_API_KEY      — API key from Resend
 *   EMAIL_FROM          — sender email address (defaults to onboarding@resend.dev)
 *   ADMIN_EMAIL         — admin notification recipient
 */

import { Resend } from "resend";
import { SITE } from "./constants";

const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

const FROM =
  process.env.EMAIL_FROM ?? "onboarding@resend.dev";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@luxehairstudio.com";

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  stylistName?: string;
  date: string;
  time: string;
  notes?: string;
}

/**
 * Send booking confirmation to the customer.
 */
export async function sendBookingConfirmation(data: BookingEmailData) {
  const { customerName, customerEmail, serviceName, stylistName, date, time, notes } = data;

  const formattedDate = formatDate(date);
  const timeFormatted = formatTime(time);

  try {
    await resend.emails.send({
      from: `${SITE.name} <${FROM}>`,
      to: customerEmail,
      subject: `Booking Confirmed — ${serviceName} at ${SITE.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Inter, sans-serif; background: #f9f9f9; padding: 24px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 24px; margin: 0 0 8px;">Your appointment is confirmed</h1>
            <p style="color: #666; margin: 0 0 24px;">Thank you for booking with ${SITE.name}. Here are your details:</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Service</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${serviceName}</td>
              </tr>
              ${stylistName ? `
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Stylist</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${stylistName}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Date</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Time</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${timeFormatted}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Client</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${customerName}</td>
              </tr>
            </table>

            ${notes ? `<p style="margin-top: 16px; font-size: 14px; color: #666;"><strong>Notes:</strong> ${notes}</p>` : ""}

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #999;">
              <p><strong>${SITE.name}</strong></p>
              <p>${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}</p>
              <p>${SITE.phone}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`[Email] Confirmation sent to ${customerEmail}`);
  } catch (error) {
    console.error("[Email] Failed to send confirmation:", error);
    // Don't throw — booking should succeed even if email fails
  }
}

/**
 * Send admin notification about a new booking.
 */
export async function sendAdminBookingNotification(data: BookingEmailData) {
  const { customerName, customerEmail, serviceName, stylistName, date, time, notes } = data;

  const formattedDate = formatDate(date);
  const timeFormatted = formatTime(time);

  try {
    await resend.emails.send({
      from: `${SITE.name} <${FROM}>`,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${customerName} — ${serviceName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Inter, sans-serif; background: #f9f9f9; padding: 24px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 24px; margin: 0 0 8px;">New Booking Received</h1>
            <p style="color: #666; margin: 0 0 24px;">A new appointment has been booked:</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Client</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Service</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${serviceName}</td>
              </tr>
              ${stylistName ? `
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Stylist</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${stylistName}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Date</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Time</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${timeFormatted}</td>
              </tr>
            </table>

            ${notes ? `<p style="margin-top: 16px; font-size: 14px; color: #666;"><strong>Notes:</strong> ${notes}</p>` : ""}

            <p style="margin-top: 24px; font-size: 13px; color: #999;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/admin/bookings" style="color: #000;">View in Admin Dashboard</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`[Email] Admin notification sent for ${customerEmail}`);
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
  }
}

/**
 * Send booking status update email to customer.
 */
export async function sendBookingStatusUpdate(
  data: BookingEmailData & { status: string },
) {
  const { customerName, customerEmail, serviceName, date, time, status } = data;

  const formattedDate = formatDate(date);
  const timeFormatted = formatTime(time);

  const statusLabels: Record<string, string> = {
    confirmed: "Your booking has been confirmed",
    cancelled: "Your booking has been cancelled",
    completed: "Your appointment is complete — thank you!",
  };

  const subjectLabel = statusLabels[status] ?? `Booking status: ${status}`;

  try {
    await resend.emails.send({
      from: `${SITE.name} <${FROM}>`,
      to: customerEmail,
      subject: `${subjectLabel} — ${SITE.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: Inter, sans-serif; background: #f9f9f9; padding: 24px;">
          <div style="max-width: 480px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 24px; margin: 0 0 8px;">${subjectLabel}</h1>
            <p style="color: #666; margin: 0 0 24px;">Hi ${customerName},</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Service</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Date</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Time</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600;">${timeFormatted}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #999; font-size: 14px;">Status</td>
                <td style="padding: 8px 0; text-align: right; font-weight: 600; text-transform: capitalize;">${status}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #999;">
              <p><strong>${SITE.name}</strong></p>
              <p>${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}</p>
              <p>${SITE.phone}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`[Email] Status update sent to ${customerEmail}: ${status}`);
  } catch (error) {
    console.error("[Email] Failed to send status update:", error);
  }
}

// ── Helpers ──────────────────────────────────────────────

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + "T12:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string): string {
  try {
    const [h, m] = timeStr.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
  } catch {
    return timeStr;
  }
}
