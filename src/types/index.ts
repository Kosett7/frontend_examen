export interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  password?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}