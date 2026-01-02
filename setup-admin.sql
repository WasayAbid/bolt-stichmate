-- StitchMate Admin User Setup
-- Run these queries in your Supabase SQL Editor after creating the admin user in the Auth UI

-- Step 1: Verify the admin user exists
-- Replace 'admin@stitchmate.com' with your admin email
SELECT
  id,
  email,
  created_at,
  email_confirmed_at
FROM auth.users
WHERE email = 'admin@stitchmate.com';

-- Step 2: Assign admin role to the user
-- This will grant admin privileges
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'admin@stitchmate.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Step 3: Verify admin role was assigned
SELECT
  u.id,
  u.email,
  ur.role,
  ur.created_at as role_assigned_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'admin@stitchmate.com';

-- Step 4: Verify admin can access applications (test RLS)
-- This should return a number (can be 0 if no applications yet)
SELECT count(*)
FROM public.tailor_applications;

-- Optional: View all users with their roles
SELECT
  u.email,
  u.created_at,
  array_agg(ur.role) as roles
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
GROUP BY u.id, u.email, u.created_at
ORDER BY u.created_at DESC;
