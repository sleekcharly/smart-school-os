import { adminDb } from '@/lib/firebase-admin';
import { CreateSystemLogParams } from '@/utils/types';

export async function createSystemLog({
  level,
  service,
  message,
  metadata,
  requestId,
  schoolId,
  userId,
  stack,
  environment = process.env.NODE_ENV as
    | 'development'
    | 'staging'
    | 'production',
}: CreateSystemLogParams) {
  try {
    await adminDb.collection('system_logs').add({
      type: 'system',
      level,
      service,
      message,
      metadata: metadata || null,
      requestId: requestId || null,
      schoolId: schoolId || null,
      userId: userId || null,
      stack: stack || null,
      environment: environment,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to create system log: ', error);
  }
}
