// authProvider removed (Refine-specific). Keep a minimal stub in case imported.
export const authProvider = {
  async check() {
    return { authenticated: false, redirectTo: '/login' };
  },
  async getIdentity() { return null; },
  async login() { return { success: true, redirectTo: '/dashboard' }; },
  async logout() { return { success: true, redirectTo: '/login' }; },
  async onError() { return {}; },
  async getPermissions() { return 'inscripto'; },
};
