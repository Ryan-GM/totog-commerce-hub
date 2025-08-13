-- Fix security warnings for functions by setting search_path
ALTER FUNCTION public.generate_order_number() SET search_path = '';
ALTER FUNCTION public.set_order_number() SET search_path = '';
ALTER FUNCTION public.create_initial_order_tracking() SET search_path = '';
ALTER FUNCTION public.update_updated_at_column() SET search_path = '';
ALTER FUNCTION public.handle_new_user() SET search_path = '';