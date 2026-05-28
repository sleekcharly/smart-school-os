import { CreatePaymentLogParams } from '@/utils/types';
import { adminDb } from '../firebase-admin';

export async function createPaymentLog({
  action,
  provider,
  amount,
  currency = 'NGN',
  reference,
  transactionId,
  schoolId,
  studentId,
  userId,
  requestId,
  status,
  metadata,
  rawPayload,
}: CreatePaymentLogParams) {
  try {
    await adminDb.collection('payment_logs').add({
      type: 'payment',

      action,

      provider,

      amount: amount || null,

      currency,

      reference: reference || null,

      transactionId: transactionId || null,

      schoolId: schoolId || null,

      studentId: studentId || null,

      userId: userId || null,

      requestId: requestId || null,

      status: status || null,

      metadata: metadata || null,

      rawPayload: rawPayload || null,

      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to create payment log:', error);
  }
}
