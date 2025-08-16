-- Fix profiles RLS recursion, add admin checker, and ensure profiles are auto-created

-- 1) Remove any previously added recursive policy (if it exists)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
EXCEPTION WHEN undefined_object THEN NULL; END $$;

-- 2) Create a SECURITY DEFINER helper to check admin role without causing RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = _user_id AND p.role = 'admin'
  );
$$;

-- 3) Enable RLS on profiles (safe to re-run)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4) Reset and apply safe profiles policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admins can view all profiles (safe)" ON public.profiles;
  DROP POLICY IF EXISTS "Admins can update all profiles (safe)" ON public.profiles;
EXCEPTION WHEN undefined_object THEN NULL; END $$;

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

CREATE POLICY "Admins can view all profiles (safe)"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles (safe)"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- 5) Ensure profiles are created automatically on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();