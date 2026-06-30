-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL DEFAULT 'cut',
  image TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stylists table
CREATE TABLE stylists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[] DEFAULT '{}',
  experience INTEGER DEFAULT 0,
  image TEXT,
  instagram TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'cut',
  stylist_id UUID REFERENCES stylists(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  avatar TEXT,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE RESTRICT,
  stylist_id UUID REFERENCES stylists(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs table
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (for admin users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Insert default data
INSERT INTO site_settings (key, value) VALUES
  ('hero_content', '{"headline": "Where Style Meets Precision", "subheadline": "Experience the art of exceptional haircare...", "cta_text": "Book Your Appointment"}'),
  ('contact_info', '{"phone": "+1 (555) 555-0123", "email": "hello@luxehairstudio.com", "address": "128 King Street West, Toronto, ON M5V 1K4"}'),
  ('business_hours', '{"weekdays": "9:00 AM — 7:00 PM", "saturday": "10:00 AM — 5:00 PM", "sunday": "10:00 AM — 3:00 PM"}');

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE stylists ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public read access for all content tables
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read stylists" ON stylists FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admin write services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write stylists" ON stylists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write gallery" ON gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Booking policies
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read bookings" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');

-- Profile policies
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_stylists_active ON stylists(active);
CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(customer_email);
CREATE INDEX idx_faqs_display_order ON faqs(display_order);
