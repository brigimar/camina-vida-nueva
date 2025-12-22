-- =====================================================
-- MIGRATION: Create Audit Tables
-- Date: 2024-01-01
-- Description: Create tables for security and role auditing
-- =====================================================

-- 1. Create role_audit table
-- Tracks all changes to user roles
CREATE TABLE IF NOT EXISTS role_audit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  old_role TEXT,
  new_role TEXT NOT NULL,
  changed_by UUID NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  source TEXT DEFAULT 'api',
  notes TEXT,

  -- Constraints
  CONSTRAINT valid_roles CHECK (
    old_role IN ('admin', 'coordinador', 'usuario', 'none', NULL) AND
    new_role IN ('admin', 'coordinador', 'usuario', 'none')
  ),
  CONSTRAINT valid_source CHECK (
    source IN ('api', 'edge_function', 'dashboard', 'cli', 'migration')
  )
);

-- Indexes for role_audit
CREATE INDEX idx_role_audit_user_id ON role_audit(user_id);
CREATE INDEX idx_role_audit_changed_by ON role_audit(changed_by);
CREATE INDEX idx_role_audit_timestamp ON role_audit(timestamp DESC);
CREATE INDEX idx_role_audit_new_role ON role_audit(new_role);

-- Comments for documentation
COMMENT ON TABLE role_audit IS 'Audit log of all user role changes';
COMMENT ON COLUMN role_audit.user_id IS 'User whose role was changed';
COMMENT ON COLUMN role_audit.old_role IS 'Previous role (null if first assignment)';
COMMENT ON COLUMN role_audit.new_role IS 'New role assigned';
COMMENT ON COLUMN role_audit.changed_by IS 'User who performed the change';
COMMENT ON COLUMN role_audit.source IS 'Origin of the change (api, edge_function, etc)';

-- 2. Create security_audit table
-- Tracks security events (unauthorized access attempts, etc)
CREATE TABLE IF NOT EXISTS security_audit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  event_type TEXT NOT NULL,
  user_role TEXT,
  required_roles TEXT[],
  resource TEXT,
  action TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_address INET,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Constraints
  CONSTRAINT valid_event_types CHECK (
    event_type IN (
      'unauthorized_access_attempt',
      'forbidden_access_attempt',
      'role_change',
      'sensitive_data_access',
      'login_attempt',
      'logout',
      'password_reset',
      'api_key_used',
      'suspicious_activity'
    )
  )
);

-- Indexes for security_audit
CREATE INDEX idx_security_audit_user_id ON security_audit(user_id);
CREATE INDEX idx_security_audit_event_type ON security_audit(event_type);
CREATE INDEX idx_security_audit_timestamp ON security_audit(timestamp DESC);
CREATE INDEX idx_security_audit_ip_address ON security_audit(ip_address);

-- Comments for documentation
COMMENT ON TABLE security_audit IS 'Security audit log for all security-related events';
COMMENT ON COLUMN security_audit.user_id IS 'User involved in the event (null for anonymous)';
COMMENT ON COLUMN security_audit.event_type IS 'Type of security event';
COMMENT ON COLUMN security_audit.user_role IS 'Role of the user at the time of the event';
COMMENT ON COLUMN security_audit.required_roles IS 'Roles that were required for the action';
COMMENT ON COLUMN security_audit.resource IS 'Resource being accessed';
COMMENT ON COLUMN security_audit.action IS 'Action being performed';
COMMENT ON COLUMN security_audit.metadata IS 'Additional context as JSON';

-- 3. Create profiles table if not exists
-- Used to store user profile information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for profiles
CREATE INDEX idx_profiles_email ON profiles(email);

-- Comments
COMMENT ON TABLE profiles IS 'User profile information';

-- 4. Add updated_at trigger for profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable RLS on audit tables (policies will be created in next migration)
ALTER TABLE role_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 6. Grant permissions
-- These tables should be accessible by authenticated users for logging
-- but only admins can read the audit logs
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT INSERT ON role_audit TO authenticated;
GRANT INSERT ON security_audit TO authenticated;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

-- 7. Create function to get user role from app_metadata
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT (auth.jwt() -> 'app_metadata' ->> 'role')::TEXT INTO user_role;
  RETURN COALESCE(user_role, 'usuario');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_user_role IS 'Extract user role from JWT app_metadata';

-- 8. Create function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() -> 'app_metadata' ->> 'role')::TEXT = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION is_admin IS 'Check if current user has admin role';

-- 9. Create view for recent role changes (admins only)
CREATE OR REPLACE VIEW recent_role_changes AS
SELECT
  ra.id,
  ra.user_id,
  p1.email as user_email,
  p1.full_name as user_name,
  ra.old_role,
  ra.new_role,
  ra.changed_by,
  p2.email as changed_by_email,
  p2.full_name as changed_by_name,
  ra.timestamp,
  ra.source
FROM role_audit ra
LEFT JOIN profiles p1 ON ra.user_id = p1.id
LEFT JOIN profiles p2 ON ra.changed_by = p2.id
ORDER BY ra.timestamp DESC
LIMIT 100;

COMMENT ON VIEW recent_role_changes IS 'Recent role changes with user details (last 100)';

-- 10. Create view for security events summary
CREATE OR REPLACE VIEW security_events_summary AS
SELECT
  event_type,
  COUNT(*) as event_count,
  COUNT(DISTINCT user_id) as unique_users,
  MAX(timestamp) as last_occurrence,
  MIN(timestamp) as first_occurrence
FROM security_audit
WHERE timestamp > NOW() - INTERVAL '30 days'
GROUP BY event_type
ORDER BY event_count DESC;

COMMENT ON VIEW security_events_summary IS 'Summary of security events in last 30 days';

-- =====================================================
-- End of migration
-- =====================================================
