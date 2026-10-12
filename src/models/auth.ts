export interface AuthPermission {
  service: string;
  method: string;
  path: string;
}

export interface AuthResponse {
  userId: string;
  email: string;
  roles: string[];
  permissions: AuthPermission[];
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  emailVerified: boolean;
  unverifiedLoginLimit: number;
  unverifiedLoginCount: number;
}

export interface VerifyResponse {
  valid: boolean;
  userId: string | null;
  email: string | null;
  roles: string[] | null;
  permissions: AuthPermission[] | null;
  expiresAt: string | null;
  reason: string | null;
}
