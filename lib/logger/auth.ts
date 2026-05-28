import { adminDb } from '@/lib/firebase-admin';
import { CreateAuthLogParams } from '@/utils/types';

export async function createAuthLog({
  action,
  email,
  userId,
  schoolId,
  ipAddress,
  userAgent,
  reason,
  requestId,
  metadata,
}: CreateAuthLogParams) {
  try {
    await adminDb.collection('auth_logs').add({
      type: 'auth',
      action,
      email: email || null,
      userid: userId || null,
      schoolId: schoolId || null,
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
      reason: reason || null,
      requestId: requestId || null,
      metadata: metadata || null,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('failed to create auth log:', error);
  }
}
