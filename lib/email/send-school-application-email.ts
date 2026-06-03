import { SchoolApplicationEmail } from './templates/SendApplicationEmail';
import { ApplicationEmailProps } from '@/utils/types';
import { resend } from './resend';
import { ErrorResponse } from 'resend';

export async function sendSchoolApplicationEmail({
  adminName,
  adminEmail,
  schoolName,
  plan,
  websiteUrl,
  dashboardPreviewUrl,
}: ApplicationEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Rektora <onboarding@resend.dev>',
      to: [adminEmail] as string[],
      subject: 'Welcome to Rektora -- Your school application is under review',
      react: SchoolApplicationEmail({
        adminName,
        schoolName,
        plan,
        websiteUrl,
        dashboardPreviewUrl,
      }),
    });

    return { message: 'Email sent successfully', data, error };
  } catch (error: unknown) {
    console.error('Error sending school application email:', error);
    const errorResponse = error as ErrorResponse;
    return {
      errorResponse,
    };
  }
}
