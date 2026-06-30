-- Migration: Auto-create profiles on user signup + updated_at triggers
-- This ensures every auth.users signup gets a corresponding profile row

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', SPLIT_PART(NEW.email, '@', 1)),
    'customer'
  );
  RETURN NEW;
END;
$$;

-- Trigger the function every time a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at trigger to all tables that have updated_at column
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT table_name FROM information_schema.columns
    WHERE column_name = 'updated_at'
      AND table_schema = 'public'
      AND table_name IN ('services', 'stylists', 'bookings', 'profiles')
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS update_%s_updated_at ON %I; CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();',
      t, t, t, t
    );
  END LOOP;
END;
$$;

-- RLS policy for customers to read their own bookings
-- This complements the existing admin booking policies
CREATE POLICY "Customer read own bookings"
  ON bookings FOR SELECT
  USING (customer_email = auth.email());

-- RLS policy for customers to read their own profile
CREATE POLICY "Customer read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- RLS policy for customers to update their own profile
CREATE POLICY "Customer update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow the trigger function (handle_new_user) to insert into profiles
-- Since it's SECURITY DEFINER and owned by supabase_admin, it can insert.
-- But we also need a policy for the service role to insert during signup.
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (true);
