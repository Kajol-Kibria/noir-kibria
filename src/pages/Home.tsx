import { Link } from 'react-router-dom';
import { useStore } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { products } = useStore();
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full bg-black text-white flex items-center overflow-hidden">
        {/* Abstract Dark Background image */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
              url('https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&q=80') center top / cover no-repeat
            `,
            filter: 'grayscale(100%) brightness(1.1)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-2xl text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-6 text-white">
              Embrace The Void
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 font-light">
              Minimalist, modern, and high-fashion. Discover our new Fall/Winter collection designed for the bold.
            </p>
            <div className="flex space-x-4">
              <Link to="/shop" className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm flex items-center group">
                Shop Collection <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tighter uppercase">Categories</h2>
            <Link to="/shop" className="text-sm font-semibold uppercase tracking-wider underline hover:text-gray-600 transition-colors">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/shop?category=Outerwear" className="group relative h-96 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Outerwear"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wider">Outerwear</h3>
              </div>
            </Link>
            <Link to="/shop?category=Dresses" className="group relative h-96 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Dresses"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wider">Dresses</h3>
              </div>
            </Link>
            <Link to="/shop?category=Accessories" className="group relative h-96 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Accessories" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wider">Accessories</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4">Featured Additions</h2>
            <div className="w-16 h-1 bg-black mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featured.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col cursor-pointer">
                <div className="relative overflow-hidden mb-4 bg-gray-200 aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.stock < 10 && product.stock > 0 && (
                     <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold uppercase px-2 py-1 tracking-widest shadow-sm">Low Stock</span>
                  )}
                  {product.stock === 0 && (
                     <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold uppercase px-2 py-1 tracking-widest shadow-sm">Sold Out</span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Newsletter Section */}
      <section className="py-32 bg-black text-white text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-6">Join The Noir Club</h2>
          <p className="text-gray-400 mb-10 text-lg font-light">
            Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
          </p>
          <form className="flex max-w-md mx-auto relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="w-full bg-transparent border-b-2 border-white/30 text-white px-2 py-3 focus:outline-none focus:border-white transition-colors uppercase text-sm placeholder:text-gray-600"
            />
            <button
              type="submit"
              className="absolute right-0 bottom-3 text-sm font-bold uppercase tracking-widest hover:text-gray-300 transition-colors flex items-center"
            >
              Subscribe <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}