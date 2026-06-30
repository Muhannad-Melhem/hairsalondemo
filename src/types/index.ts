export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio: string;
  specialties: string[];
  experience: number;
  image: string;
  instagram?: string;
  active: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  stylist?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  content: string;
  featured: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  stylistId?: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  createdAt: string;
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "customer";
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
}
