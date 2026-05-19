export const roleRoutes = {
  superadmin: ['/dashboard', '/super-admin/settings'],
  admin: [
    '/dashboard',
    '/classes',
    '/students',
    '/fees',
    '/results',
    '/sessions',
    '/subjects',
  ],
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
  parent: ['/dashboard', '/parent-portal'],
  student: ['/dashboard', '/student'],
};
