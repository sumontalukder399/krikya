export const ROLES = ['master_admin', 'affiliate_manager', 'affiliate_agent', 'user'] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  master_admin: 'Master Admin',
  affiliate_manager: 'Affiliate Manager',
  affiliate_agent: 'Affiliate Agent',
  user: 'User',
};

export type Permission =
  | 'dashboard:view' | 'balance:transfer' | 'transactions:view'
  | 'admins:manage' | 'agents:manage' | 'users:view' | 'users:manage'
  | 'reports:view' | 'content:manage' | 'profile:manage' | 'chats:view'
  | 'analytics:view' | 'audit:view' | 'support:view' | 'notifications:view';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  master_admin: ['dashboard:view','balance:transfer','transactions:view','admins:manage','agents:manage','users:view','users:manage','reports:view','content:manage','profile:manage','chats:view','analytics:view','audit:view','support:view','notifications:view'],
  affiliate_manager: ['dashboard:view','balance:transfer','transactions:view','agents:manage','users:view','users:manage','reports:view','profile:manage','chats:view','support:view','notifications:view'],
  affiliate_agent: ['dashboard:view','transactions:view','users:view','reports:view','profile:manage','chats:view','support:view','notifications:view'],
  user: ['dashboard:view','transactions:view','profile:manage','chats:view','support:view','notifications:view'],
};

export const can = (role: Role, permission: Permission) => ROLE_PERMISSIONS[role]?.includes(permission) ?? false;

export const assignableRoles = (role: Role): Role[] => {
  if (role === 'master_admin') return ['master_admin', 'affiliate_manager', 'affiliate_agent', 'user'];
  if (role === 'affiliate_manager') return ['affiliate_agent', 'user'];
  if (role === 'affiliate_agent') return ['user'];
  return [];
};
