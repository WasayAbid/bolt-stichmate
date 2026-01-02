# StitchMate Authentication Setup Guide

This guide explains how to set up and test the complete authentication flow for the StitchMate platform.

## System Overview

StitchMate has three user roles:
- **User**: Regular customers who can browse and order
- **Tailor**: Verified tailors who can accept orders (requires admin approval)
- **Admin**: System administrators who manage tailor applications

## Initial Setup

### 1. Create Admin User

An admin user must be created manually through the Supabase Dashboard:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User**
4. Create a user with:
   - Email: `admin@stitchmate.com` (or your preferred admin email)
   - Password: Set a strong password
   - Confirm email: Toggle ON
5. Click **Create User**

### 2. Assign Admin Role

After creating the admin user, assign the admin role:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this query (replace the email with your admin email):

```sql
-- Get the user ID for your admin user
SELECT id FROM auth.users WHERE email = 'admin@stitchmate.com';

-- Copy the ID and use it in the next query
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

Or use this single query:

```sql
-- Assign admin role to user by email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'admin@stitchmate.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

### 3. Verify Admin Setup

Check that the admin role was assigned correctly:

```sql
SELECT
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'admin@stitchmate.com';
```

## Testing the Authentication Flow

### A. Test Tailor Application (Demo Mode)

1. **Apply as Tailor**:
   - Go to `/tailor-apply`
   - Fill in Step 1: Account Details
   - Fill in Step 2: Shop Information
   - Submit application

2. **Confirmation Screen**:
   - You'll see: "Application Submitted Successfully"
   - Message: "Your application has been submitted and is under review by the admin"
   - Note about demo access being available

3. **Access Demo Dashboard**:
   - Click "Access Demo Dashboard"
   - You'll be redirected to `/tailor`
   - See amber banner: "Demo Mode Active"
   - Message explains application is under review
   - Can explore dashboard features (read-only/limited functionality)

### B. Test Admin Approval Flow

1. **Admin Login**:
   - Go to `/auth/admin`
   - Use admin credentials
   - System verifies admin role
   - Redirected to `/admin`

2. **Review Applications**:
   - Admin dashboard shows "Pending Applications" section
   - View application details:
     - Applicant name
     - Shop name and address
     - Years of experience
     - Specializations
     - Contact information
     - Portfolio (if provided)

3. **Approve Application**:
   - Click "Approve" button
   - Application status changes to "Approved"
   - Tailor role is automatically assigned to the user
   - Application moves to "Approved Tailors" section

4. **Reject Application** (Optional):
   - Click "Reject" button
   - Add optional feedback notes
   - Confirm rejection
   - Application moves to "Rejected Applications" section

### C. Test Approved Tailor Access

1. **Tailor Login After Approval**:
   - Tailor signs in at `/auth`
   - System detects approved tailor role
   - Redirected to `/tailor` dashboard

2. **Full Access Confirmation**:
   - Green banner: "Account Approved"
   - Message: "Congratulations! Your tailor application has been approved"
   - Full access to all tailor features
   - No more demo mode restrictions

### D. Test Role-Based Routing

1. **Admin Login**:
   - Login at `/auth/admin` → Redirects to `/admin`
   - Attempting regular login as admin → Redirects to `/admin`

2. **Approved Tailor Login**:
   - Login at `/auth` → Redirects to `/tailor`
   - Full dashboard access

3. **Pending Tailor Login**:
   - Login at `/auth` → Redirects to `/tailor` (demo mode)
   - Sees demo mode banner

4. **Regular User Login**:
   - Login at `/auth` → Redirects to `/dashboard`
   - Standard user features

## Troubleshooting

### Issue: "Failed to submit application"

**Possible causes:**
1. Email confirmation is enabled in Supabase
   - Solution: Disable email confirmation in Supabase Auth settings
   - Or: Check email and confirm before application submission

2. Session not available immediately after signup
   - Fixed: Code includes retry logic (up to 5 retries with 500ms delay)

### Issue: Admin can't login

**Check:**
1. Admin user exists in `auth.users`
2. Admin role assigned in `user_roles` table
3. Using `/auth/admin` endpoint (not regular `/auth`)

### Issue: Tailor can't access dashboard after approval

**Check:**
1. Application status is "approved" in `tailor_applications`
2. Tailor role exists in `user_roles` table
3. User has logged out and logged back in to refresh role

## Database Verification Queries

### Check all roles:
```sql
SELECT
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
ORDER BY ur.created_at DESC;
```

### Check tailor applications:
```sql
SELECT
  ta.*,
  p.full_name,
  u.email
FROM public.tailor_applications ta
JOIN public.profiles p ON ta.user_id = p.user_id
JOIN auth.users u ON ta.user_id = u.id
ORDER BY ta.created_at DESC;
```

### Check user with all details:
```sql
SELECT
  u.email,
  p.full_name,
  array_agg(DISTINCT ur.role) as roles,
  ta.status as application_status,
  ta.shop_name
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.user_id
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
LEFT JOIN public.tailor_applications ta ON u.id = ta.user_id
WHERE u.email = 'your-email@example.com'
GROUP BY u.email, p.full_name, ta.status, ta.shop_name;
```

## Security Notes

1. **Admin Access**:
   - Admin users cannot be created through public signup
   - Must be created manually through Supabase Dashboard
   - Admin login endpoint (`/auth/admin`) verifies admin role

2. **RLS Policies**:
   - Users can only view/edit their own data
   - Tailors can only access approved features
   - Admins can view all applications

3. **Demo Mode**:
   - Provides limited/read-only access
   - Clearly indicated with visual banners
   - Full access only after admin approval

## Support

If you encounter issues:
1. Check browser console for error messages
2. Verify database setup using verification queries
3. Ensure Supabase project is properly configured
4. Check RLS policies are enabled
