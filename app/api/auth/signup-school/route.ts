import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { randomUUID } from 'crypto';
import { createAuditLog } from '@/lib/logger/audit';
// import {sendEmail} from '@/lib/email';
import { createSystemLog } from '@/lib/logger/system';
import { sendSchoolApplicationEmail } from '@/lib/email/send-school-application-email';

export async function POST(req: NextRequest) {
  const requestId = `sch-signup-${randomUUID()}`;

  try {
    const body = await req.json();

    const {
      school_name,
      address,
      state,
      level,
      admin_name,
      admin_email,
      admin_phone,
      student_count,
      plan,
    } = body;

    // basic validation
    if (!school_name || !address || !state || !admin_name || !admin_email) {
      return NextResponse.json(
        {
          message: 'Missing required fields',
        },
        { status: 400 },
      );
    }

    // Prevent duplicate applications
    const existingApplication = await adminDb
      .collection('school_applications')
      .where('admin_email', '==', admin_email)
      .limit(1)
      .get();

    if (!existingApplication.empty) {
      return NextResponse.json(
        {
          message:
            'An application with this email already exists. We will review it and get back to you.',
          type: 'existing_application',
        },
        { status: 400 },
      );
    }

    // create application record
    const applicationRef = await adminDb.collection('school_applications').add({
      school_name,
      address,
      state,
      level,
      admin_name,
      admin_email,
      admin_phone,
      student_count,
      plan,
      status: 'pending',
      approved: 'false',
      requestId,
      createdAt: new Date(),
      reviewedAt: null,
      reviewedBy: null,
    });

    // Audit log
    await createAuditLog({
      schoolId: null,
      userId: null,
      userName: admin_name,
      role: 'school_owner',
      action: 'school_application_created',
      entityType: 'school_application',
      entityId: applicationRef.id,
      description: `School application created for ${school_name} by ${admin_email}`,
      changes: null,
      ipAddress: req.headers.get('x-forwarded-for') || null,
      userAgent: req.headers.get('user-agent') || null,
    });

    // System log
    await createSystemLog({
      level: 'info',
      service: 'school-onboarding',
      message: 'New school application submitted',
      requestId,
      metadata: { applicationId: applicationRef.id, school_name, admin_email },
    });

    // TODO:
    try {
      const { data, error } = await sendSchoolApplicationEmail({
        adminName: admin_name,
        adminEmail: admin_email,
        schoolName: school_name,
        plan: plan,
        websiteUrl: 'https://rektora.com',
        dashboardPreviewUrl:
          'https://firebasestorage.googleapis.com/v0/b/rektora-live.firebasestorage.app/o/app%2Fmarketing%2Fog-image.png?alt=media&token=870bec98-31bd-41c3-90a8-bf0b9d5c98c0',
      });

      if (error) {
        console.error('Error sending school application email:', error);
        await createSystemLog({
          level: 'error',
          service: 'email-service',
          message: 'Failed to send school application email',
          requestId,
          metadata: {
            applicationId: applicationRef.id,
            school_name,
            recipient: admin_email,
            error: (error as Error).message,
          },
        });
      }

      console.log('Email send result:', { data });

      await adminDb.collection('email_logs').add({
        type: 'school_application',
        recipient: admin_email,
        status: 'sent',
        requestId,
        applicationId: applicationRef.id,
        emailId: data?.id || null,
        createdAt: new Date(),
      });

      await adminDb.collection('notifications').add({
        type: 'school_application',
        title: 'New School Application',
        message: `A new school application has been submitted for ${school_name}.`,
        metadata: {
          applicationId: applicationRef.id,
        },
        read: false,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error sending school application email:', error);
      await createSystemLog({
        level: 'error',
        service: 'email-service',
        message: 'Failed to send school application email',
        requestId,
        metadata: {
          applicationId: applicationRef.id,
          school_name,
          recipient: admin_email,
          error: (error as Error).message,
        },
      });
    }

    // Notify super admin

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      requestId,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('Error processing school application:', error);

    await createSystemLog({
      level: 'error',
      service: 'school-onboarding',
      message: errorMessage,
      stack: errorStack,
    });
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 },
    );
  }
}
