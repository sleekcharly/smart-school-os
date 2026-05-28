import { CreateAuditLogParams } from '@/utils/types';
import { adminDb } from '../firebase-admin';

export async function createAuditLog({
  schoolId,
  userId,
  userName,
  role,
  action,
  entityType,
  entityId,
  description,
  changes,
  ipAddress,
  userAgent,
}: CreateAuditLogParams) {
  await adminDb.collection('audit_logs').add({
    schoolId,
    userId,
    userName,
    role,
    action,
    entityType,
    entityId,
    description,
    changes: changes || null,
    ipAddress: ipAddress || null,
    userAgent: userAgent || null,
    timestamp: new Date(),
  });
}

// export async function getAuditLogs(schoolId: string, limit = 100) {
//     const snapshot = await adminDb.collection('audit_logs')
//         .where('schoolId', '==', schoolId)
//         .orderBy('timestamp', 'desc')
//         .limit(limit)
//         .get();

//     return snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
// }
