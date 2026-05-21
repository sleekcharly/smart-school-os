/**
 * @file lib/permissions.ts
 * @description Role-Based Access Control (RBAC) mapping system.
 * Configures the authorized routes that different user profiles can load.
 * This is used by middleware or client-side routers to restrict dashboard page rendering.
 */

/**
 * Whitelist routing index for Eduvia users.
 * Maps literal user roles to their corresponding authorized path sub-trees.
 */
export const roleRoutes = {
  // Superadmin: Overall platform owner, registers new schools, manages system global options
  superadmin: ['/dashboard', '/super-admin/settings'],

  // Admin: School owner or principal, configures classes, monitors payments, registers accounts
  admin: [
    '/dashboard',
    '/classes',
    '/students',
    '/fees',
    '/results',
    '/sessions',
    '/subjects',
  ],

  // Teacher: Classroom instructors, enters grades/results, registers daily class activity
  teacher: [
    '/dashboard',
    '/classes',
    '/students',
    '/fees',
    '/results',
    '/sessions',
    '/subjects',
    '/parent-portal',
  ],

  // Parent: Monitors registered ward's results, views fee breakdown bills, pays fees
  parent: ['/dashboard', '/parent-portal'],

  // Student: Views report cards/results and personal course sheets
  student: ['/dashboard', '/student'],
};

