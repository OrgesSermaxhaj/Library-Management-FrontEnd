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
  extraField1?: string;
  extraField2?: string;
  version: number;
} 