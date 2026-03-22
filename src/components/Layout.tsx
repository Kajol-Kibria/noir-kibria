import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, User, X, LogOut, Shield } from 'lucide-react';
import { useAuth, useCart } from '../context/AppContext';
import { useState } from 'react';

export default function Layout() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-3xl font-bold tracking-tighter uppercase">
                Noir - kibria
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-gray-500 transition-colors">Home</Link>
              <Link to="/shop" className="text-sm font-medium hover:text-gray-500 transition-colors">Shop</Link>
              <Link to="/about" className="text-sm font-medium hover:text-gray-500 transition-colors">About</Link>
            </nav>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-gray-900 hover:text-gray-500 flex items-center gap-1">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm font-medium">Admin</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-gray-900 hover:text-gray-500 flex items-center gap-1">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-900 hover:text-gray-500">
                  <User className="h-5 w-5" />
                </Link>
              )}
              
              <Link to="/cart" className="relative text-gray-900 hover:text-gray-500">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center space-x-4">
              <Link to="/cart" className="relative text-gray-900 hover:text-gray-500">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-900 hover:text-gray-500 focus:outline-none">
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg absolute w-full z-40">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Home</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Shop</Link>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Admin Panel</Link>
                )}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Login / Register</Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">Noir - kibria</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                Redefining modern elegance through minimalist design, premium materials, and timeless silhouettes. High fashion for everyday life.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/shop" className="hover:text-white transition">Shop All</Link></li>
                <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Customer Care</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} NOIR - kibria. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Pinterest</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}