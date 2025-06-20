
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  category: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    description: 'Experience premium sound quality with our top-rated wireless headphones featuring active noise cancellation and 30-hour battery life.',
    category: 'Audio',
    features: ['Active Noise Cancellation', '30-hour Battery', 'Bluetooth 5.0', 'Premium Materials'],
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299.99,
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 85,
    inStock: true,
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.',
    category: 'Wearables',
    features: ['Heart Rate Monitor', 'GPS Tracking', '7-day Battery', 'Water Resistant'],
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    originalPrice: 599.99,
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 92,
    inStock: false,
    description: 'Professional ergonomic office chair designed for all-day comfort with lumbar support and adjustable features.',
    category: 'Furniture',
    features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh', 'Premium Build'],
  },
  {
    id: '4',
    name: 'Portable Laptop Stand',
    price: 79.99,
    image: '/placeholder.svg',
    rating: 4.3,
    reviews: 156,
    inStock: true,
    description: 'Lightweight and adjustable laptop stand perfect for remote work and travel.',
    category: 'Computers',
    features: ['Adjustable Angle', 'Portable Design', 'Heat Dissipation', 'Universal Fit'],
  },
  {
    id: '5',
    name: 'Wireless Charging Station',
    price: 89.99,
    originalPrice: 119.99,
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 203,
    inStock: true,
    description: 'Charge multiple devices simultaneously with this sleek wireless charging station.',
    category: 'Mobile Phones',
    features: ['3-Device Charging', 'Fast Charging', 'LED Indicators', 'Safety Features'],
  },
  {
    id: '6',
    name: 'Bluetooth Speaker Pro',
    price: 159.99,
    image: '/placeholder.svg',
    rating: 4.4,
    reviews: 174,
    inStock: true,
    description: 'Powerful portable Bluetooth speaker with 360-degree sound and waterproof design.',
    category: 'Audio',
    features: ['360° Sound', 'Waterproof', '20-hour Battery', 'Voice Assistant'],
  },
  {
    id: '7',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    originalPrice: 179.99,
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 267,
    inStock: true,
    description: 'Professional gaming keyboard with mechanical switches and RGB backlighting.',
    category: 'Gaming',
    features: ['Mechanical Switches', 'RGB Backlighting', 'Anti-Ghosting', 'Durable Design'],
  },
  {
    id: '8',
    name: 'HD Webcam with Microphone',
    price: 99.99,
    image: '/placeholder.svg',
    rating: 4.2,
    reviews: 89,
    inStock: true,
    description: 'Crystal clear 1080p webcam with built-in microphone perfect for video calls and streaming.',
    category: 'Computers',
    features: ['1080p HD Video', 'Built-in Microphone', 'Auto Focus', 'Universal Mount'],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getSimilarProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};
