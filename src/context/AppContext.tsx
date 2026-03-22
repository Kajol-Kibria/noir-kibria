import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Order, initialProducts, initialOrders } from '../data/mockData';

// --- Auth Context ---
interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AppProvider');
  return context;
};

// --- Cart Context ---
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within AppProvider');
  return context;
};

// --- Store (Products/Orders) Context ---
interface StoreContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within AppProvider');
  return context;
};

// --- Provider ---
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const login = (email: string, _pass: string) => {
    if (email === 'admin@noir.com') {
      setUser({ id: 'admin1', email, role: 'admin' });
    } else {
      setUser({ id: 'user_' + Date.now(), email, role: 'user' });
    }
  };

  const logout = () => setUser(null);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === item.product.id && 
               i.selectedSize === item.selectedSize && 
               i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) => 
      prev.filter(i => !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const addProduct = (product: Omit<Product, 'id'>) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: 'ORD-' + Math.floor(Math.random() * 10000),
      date: new Date().toISOString(),
      status: 'Pending',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
        <StoreContext.Provider value={{ products, orders, addProduct, updateProduct, deleteProduct, addOrder, updateOrderStatus }}>
          {children}
        </StoreContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};