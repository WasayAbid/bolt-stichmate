/*
  # Add Admin User Creation Function
  
  1. Functions
    - `create_admin_user` - Security definer function to create admin account
    - Only allows creation if no admin exists yet (safety measure)
  
  2. Notes
    - Admin credentials will be set via environment variables
    - This function should be called once during initial setup
*/

-- Function to create admin user (can only be called if no admin exists)
CREATE OR REPLACE FUNCTION public.create_admin_if_not_exists()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_exists BOOLEAN;
  admin_email TEXT := 'admin@stitchmate.com';
  admin_user_id UUID;
BEGIN
  -- Check if admin already exists
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  ) INTO admin_exists;
  
  IF NOT admin_exists THEN
    -- Note: In production, admin user should be created via Supabase Auth
    -- This is a placeholder for the admin role assignment logic
    -- The actual admin user creation should be done manually through Supabase dashboard
    RAISE NOTICE 'No admin user found. Please create admin user manually with email: %', admin_email;
  END IF;
END;
$$;

-- Function to approve tailor application
CREATE OR REPLACE FUNCTION public.approve_tailor_application(
  application_id UUID,
  admin_id UUID
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  app_user_id UUID;
BEGIN
  -- Verify caller is admin
  IF NOT public.has_role(admin_id, 'admin') THEN
    RAISE EXCEPTION 'Only admins can approve applications';
  END IF;
  
  -- Get the user_id from application
  SELECT user_id INTO app_user_id
  FROM public.tailor_applications
  WHERE id = application_id AND status = 'pending';
  
  IF app_user_id IS NULL THEN
    RAISE EXCEPTION 'Application not found or already processed';
  END IF;
  
  -- Update application status
  UPDATE public.tailor_applications
  SET 
    status = 'approved',
    reviewed_by = admin_id,
    reviewed_at = now()
  WHERE id = application_id;
  
  -- Add tailor role to user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (app_user_id, 'tailor')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Function to reject tailor application
CREATE OR REPLACE FUNCTION public.reject_tailor_application(
  application_id UUID,
  admin_id UUID,
  notes TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Verify caller is admin
  IF NOT public.has_role(admin_id, 'admin') THEN
    RAISE EXCEPTION 'Only admins can reject applications';
  END IF;
  
  -- Update application status
  UPDATE public.tailor_applications
  SET 
    status = 'rejected',
    reviewed_by = admin_id,
    reviewed_at = now(),
    admin_notes = notes
  WHERE id = application_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found or already processed';
  END IF;
END;
$$;