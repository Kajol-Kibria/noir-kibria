export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  stock: number;
}

export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
}

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Oversized Noir Coat',
    price: 350,
    description: 'A luxurious oversized coat made from a premium wool blend. Perfect for winter.',
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Outerwear',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15
  },
  {
    id: '2',
    name: 'Minimalist Silk Dress',
    price: 220,
    description: 'Elegant slip dress crafted from 100% pure silk. Drapes beautifully for any evening occasion.',
    image: 'https://images.unsplash.com/photo-1515347619253-08fb34255195?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Dresses',
    colors: ['Black', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 20
  },
  {
    id: '3',
    name: 'Structured Leather Tote',
    price: 450,
    description: 'A structured everyday tote bag crafted from full-grain Italian leather.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    colors: ['Black'],
    sizes: ['One Size'],
    stock: 8
  },
  {
    id: '4',
    name: 'Essential Cotton Turtleneck',
    price: 95,
    description: 'Your go-to turtleneck for layering. Soft, breathable organic cotton.',
    image: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Tops',
    colors: ['Black', 'White'],
    sizes: ['S', 'M', 'L'],
    stock: 35
  },
  {
    id: '5',
    name: 'Tailored Wide-Leg Trousers',
    price: 180,
    description: 'High-waisted, wide-leg trousers designed for a sharp and modern silhouette.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Bottoms',
    colors: ['Black', 'Grey'],
    sizes: ['24', '26', '28', '30', '32'],
    stock: 22
  },
  {
    id: '6',
    name: 'Chunky Chelsea Boots',
    price: 290,
    description: 'Classic leather Chelsea boots elevated with a chunky, durable sole.',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Shoes',
    colors: ['Black'],
    sizes: ['37', '38', '39', '40', '41', '42'],
    stock: 12
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-1234',
    userId: 'user1',
    items: [
      { productId: '1', quantity: 1, price: 350 },
      { productId: '4', quantity: 2, price: 95 }
    ],
    total: 540,
    status: 'Shipped',
    date: '2023-10-15T10:30:00Z'
  },
  {
    id: 'ORD-1235',
    userId: 'user2',
    items: [
      { productId: '2', quantity: 1, price: 220 }
    ],
    total: 220,
    status: 'Pending',
    date: '2023-10-20T14:45:00Z'
  }
];
