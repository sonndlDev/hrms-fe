// src/mocks/users.ts

export type UserRole = string;

export interface User {
  id?: number;
  username: string;
  role: UserRole;
}

export const fakeUsers: User[] = [
  { id: 1, username: 'adminUser', role: 'admin' },
  { id: 2, username: 'staffUser', role: 'staff' },
  { id: 3, username: 'anotherStaffUser', role: 'staff' },
];
