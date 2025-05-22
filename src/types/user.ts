export enum UserRole {
  MEMBER = "MEMBER",
  LIBRARIAN = "LIBRARIAN",
  ADMIN = "ADMIN"
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  role: UserRole;
  address: string;
  phoneNumber: string;
  adminCode?: string;
  department?: string;
  employeeNumber?: string;
  version: number;
} 