import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/AppContext';
import { Filter } from 'lucide-react';

export default function Shop() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All';
  const [sortOption, setSortOption] = useState('newest');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // newest
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    return result;
  }, [products, categoryFilter, sortOption]);

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-12 border-b-4 border-black pb-4 inline-block">Collection</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-6 border-b border-gray-100 space-y-4 md:space-y-0">
          {/* Categories */}
          <div className="flex overflow-x-auto space-x-6 pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm font-semibold uppercase tracking-wider whitespace-nowrap pb-1 transition-colors ${
                  categoryFilter === cat
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Filter Options */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2 text-sm text-gray-500 font-semibold uppercase tracking-wider">
              <Filter className="w-4 h-4" />
              <span>Sort By:</span>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent border-none text-black font-semibold uppercase tracking-wider text-sm focus:ring-0 cursor-pointer"
            >
              <option value="newest">Newest Arrival</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col cursor-pointer">
              <div className="relative overflow-hidden mb-6 bg-gray-100 aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                {product.stock === 0 && (
                   <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest shadow-lg">Sold Out</span>
                )}
                {product.stock > 0 && product.stock <= 5 && (
                   <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1.5 tracking-widest shadow-lg">Last Items</span>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300 py-4 px-6 opacity-0 group-hover:opacity-100 flex justify-center items-center">
                   <span className="text-black font-bold uppercase tracking-widest text-xs border-b border-black pb-1">Quick View</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
                </div>
                <p className="text-base font-medium text-black">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium">
            No products found matching your selection.
          </div>
        )}
      </div>
    </div>
  );
}