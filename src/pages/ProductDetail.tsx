import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore, useCart } from '../context/AppContext';
import { Check, Info, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useStore();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 text-black">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="text-sm font-semibold uppercase tracking-wider underline hover:text-gray-600 transition-colors">
          Return to Shop
        </button>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    
    addToCart({
      product,
      quantity,
      selectedSize,
      selectedColor,
    });
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.stock === 0 && (
                 <span className="absolute top-6 left-6 bg-black text-white text-sm font-bold uppercase px-4 py-2 tracking-widest shadow-xl">Sold Out</span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
               {/* Optional thumbnail gallery placeholder */}
               <div className="aspect-square bg-gray-200 cursor-pointer overflow-hidden opacity-50 hover:opacity-100 transition-opacity border-2 border-black">
                   <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
               </div>
               <div className="aspect-square bg-gray-200 cursor-pointer overflow-hidden opacity-50 hover:opacity-100 transition-opacity">
                   <img src={product.image} alt="Thumbnail 2" className="w-full h-full object-cover grayscale" />
               </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col pt-8">
            <div className="mb-8 border-b border-gray-100 pb-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4 leading-tight text-black">{product.name}</h1>
              <p className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-gray-600 mb-10 leading-relaxed max-w-lg">{product.description}</p>

            <div className="space-y-8 mb-12">
              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex justify-between items-center text-black">
                    Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                  </h3>
                  <div className="flex items-center space-x-4">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          selectedColor === color ? 'border-black scale-110 shadow-md' : 'border-transparent'
                        }`}
                        title={color}
                      >
                        <span
                          className={`w-8 h-8 rounded-full border border-gray-200 block shadow-inner`}
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                      Size: <span className="font-normal text-gray-500 ml-2">{selectedSize}</span>
                    </h3>
                    <button className="text-xs uppercase tracking-widest text-gray-500 underline hover:text-black transition-colors flex items-center">
                       <Info className="w-3 h-3 mr-1" /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[4rem] px-4 py-3 text-sm font-bold uppercase tracking-wider border transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-black">Quantity</h3>
                <div className="flex items-center border border-gray-300 w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-12 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors font-bold text-lg"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                {product.stock > 0 && product.stock <= 5 && (
                  <p className="text-sm text-red-600 mt-3 font-semibold uppercase tracking-wider">Only {product.stock} left in stock</p>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-5 flex items-center justify-center text-sm font-bold uppercase tracking-widest transition-all ${
                product.stock === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : added
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                  : 'bg-black text-white hover:bg-gray-900 shadow-xl hover:shadow-2xl hover:-translate-y-1'
              }`}
            >
              {product.stock === 0 ? (
                'Sold Out'
              ) : added ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Added to Cart
                </>
              ) : (
                'Add to Bag'
              )}
            </button>
            
            <div className="mt-8 border-t border-gray-100 pt-8 space-y-4 text-sm text-gray-500">
                <p className="flex items-start"><span className="font-bold text-black uppercase tracking-wider mr-2 w-24">Delivery:</span> Free standard shipping on orders over $200. Express options available at checkout.</p>
                <p className="flex items-start"><span className="font-bold text-black uppercase tracking-wider mr-2 w-24">Returns:</span> Complimentary returns within 14 days. Items must be unworn with original tags attached.</p>
                <p className="flex items-start"><span className="font-bold text-black uppercase tracking-wider mr-2 w-24">Materials:</span> Premium imported fabrics. Refer to care label for specific instructions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}