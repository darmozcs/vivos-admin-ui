/** Store managed by the super admin, with the state of its admin account. */
export interface Store {
  id: string;
  name: string;
  active: boolean;
  adminUserId: string;
  adminEmail: string;
  adminEmailVerified: boolean;
  createdAt: string;
}
