-- Fix avatar_url column type in profiles table (should be text, not jsonb)
ALTER TABLE public.profiles ALTER COLUMN avatar_url TYPE text USING avatar_url::text;