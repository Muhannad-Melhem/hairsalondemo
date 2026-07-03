export const SITE = {
  name: "Luxe Hair Studio",
  tagline: "Where Artistry Meets Elegance",
  description:
    "Amman's premier luxury hair salon. Expert artistry, world-class products, and an atmosphere of refined elegance.",
  url: "https://luxehairstudio.jo",
  logo: "/images/logo.svg",
  phone: "+962 7 9000 1234",
  phoneInternational: "+962790001234",
  whatsapp: "+962790001234",
  email: "hello@luxehairstudio.jo",
  address: {
    street: "Abdoun Circle, Al-Abdoun District",
    city: "Amman",
    region: "Amman Governorate",
    postcode: "11191",
    country: "JO",
    countryFull: "Jordan",
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.9!2d35.87!3d31.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzAwLjAiTiAzNcKwNTInMTIuMCJF!5e0!3m2!1sen!2sjo!4v1",
  },
  hours: [
    { day: "Sunday", hours: "10:00 AM — 8:00 PM" },
    { day: "Monday", hours: "9:00 AM — 8:00 PM" },
    { day: "Tuesday", hours: "9:00 AM — 8:00 PM" },
    { day: "Wednesday", hours: "9:00 AM — 8:00 PM" },
    { day: "Thursday", hours: "9:00 AM — 9:00 PM" },
    { day: "Friday", hours: "2:00 PM — 9:00 PM" },
    { day: "Saturday", hours: "10:00 AM — 8:00 PM" },
  ],
  social: {
    instagram: "https://instagram.com/luxehairstudio.jo",
    facebook: "https://facebook.com/luxehairstudiojo",
    tiktok: "https://tiktok.com/@luxehairstudio.jo",
    snapchat: "https://snapchat.com/add/luxehairstudio.jo",
    whatsapp: "https://wa.me/962790001234",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Stylists", href: "/stylists" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  currency: {
    code: "JOD",
    symbol: "JD",
    name: "Jordanian Dinar",
  },
};

export const SERVICES = [
  {
    id: "precision-cut",
    name: "Precision Cut",
    nameAr: "قص دقيق",
    description:
      "Tailored to your face shape and lifestyle. Every cut is a work of art, executed with surgical precision.",
    price: 25,
    duration: 60,
    category: "Haircuts",
  },
  {
    id: "color-balayage",
    name: "Color & Balayage",
    nameAr: "صبغة وبلياج",
    description:
      "From subtle highlights to bold transformations. Our colorists create dimensional, luminous results.",
    price: 45,
    duration: 120,
    category: "Color",
  },
  {
    id: "luxury-treatment",
    name: "Luxury Treatment",
    nameAr: "علاج فاخر",
    description:
      "Deeply restorative treatments that revive, strengthen, and transform your hair from root to tip.",
    price: 35,
    duration: 75,
    category: "Treatments",
  },
  {
    id: "blowdry-styling",
    name: "Blow-Dry & Styling",
    nameAr: "تجفيف وتسريح",
    description:
      "Perfect blowouts and elegant styling for any occasion. Walk out feeling like the best version of you.",
    price: 18,
    duration: 45,
    category: "Styling",
  },
  {
    id: "bridal-package",
    name: "Bridal Package",
    nameAr: "حقيبة عروس",
    description:
      "Complete bridal hair styling including trial, day-of styling, and touch-ups for your special day.",
    price: 120,
    duration: 180,
    category: "Special Occasion",
  },
  {
    id: "keratin-smoothing",
    name: "Keratin Smoothing",
    nameAr: "تنعيم الكيراتين",
    description:
      "Smoothing treatment that eliminates frizz and adds incredible shine. Results last up to 3 months.",
    price: 65,
    duration: 150,
    category: "Treatments",
  },
];
