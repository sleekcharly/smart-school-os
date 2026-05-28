export type SystemLogLevel = 'info' | 'warn' | 'error' | 'critical';

export interface CreateSystemLogParams {
  level: SystemLogLevel;

  service: string;

  message: string;

  metadata?: Record<string, unknown>;

  requestId?: string;

  schoolId?: string;

  userId?: string;

  stack?: string;

  environment?: 'development' | 'staging' | 'production';
}

export interface CreateAuthLogParams {
  action:
    | 'login_success'
    | 'login_failed'
    | 'password_changed'
    | 'password_reset_requested'
    | 'password_reset_success'
    | 'password_reset_failed'
    | 'account_created'
    | 'account_deleted'
    | 'account_locked'
    | 'account_unlocked'
    | 'logout';
  email?: string;
  userId?: string;
  schoolId?: string;
  ipAddress?: string;
  userAgent?: string;
  reason?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

export interface CreateAuditLogParams {
  schoolId: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export interface CreatePaymentLogParams {
  action:
    | 'payment_initialized'
    | 'payment_success'
    | 'payment_failed'
    | 'payment_verified'
    | 'refund_processed'
    | 'webhook_received';

  provider: 'paystack' | 'flutterwave';

  amount?: number;

  currency?: string;

  reference?: string;

  transactionId?: string;

  schoolId?: string;

  studentId?: string;

  userId?: string;

  requestId?: string;

  status?: string;

  metadata?: Record<string, unknown>;

  rawPayload?: Record<string, unknown>;
}
