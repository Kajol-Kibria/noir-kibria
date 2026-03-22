import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/AppContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold tracking-tighter uppercase mb-4 text-black">Your Bag is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Discover our latest collection.</p>
        <Link to="/shop" className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-12 border-b-4 border-black pb-4 inline-block">Shopping Bag</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-black text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="space-y-8">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-8 relative group">
                  
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex gap-6">
                    <Link to={`/product/${item.product.id}`} className="w-24 h-32 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.product.id}`} className="text-lg font-bold text-black hover:underline mb-1">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Color: {item.selectedColor}</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wider">Size: {item.selectedSize}</p>
                      
                      {/* Mobile Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                        className="sm:hidden mt-4 text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-widest flex items-center"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="hidden sm:block col-span-2 text-center">
                    <p className="text-base font-medium text-black">${item.product.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-2 flex items-center sm:justify-center border border-gray-300 w-max sm:w-auto px-4 py-2 sm:px-0 sm:py-0 h-10">
                    <span className="font-bold text-black">{item.quantity}</span>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 sm:col-span-2 flex justify-between sm:justify-end items-center">
                    <span className="sm:hidden text-sm font-bold uppercase tracking-widest text-gray-500">Total:</span>
                    <p className="text-lg font-bold text-black">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  
                  {/* Desktop Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 border border-gray-100 sticky top-28">
              <h2 className="text-2xl font-bold tracking-tighter uppercase mb-8 text-black border-b border-gray-200 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-black">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-sm uppercase tracking-widest text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium text-black">${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold text-black">
                    <span className="uppercase tracking-tighter">Total</span>
                    <span>${(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-5 text-sm font-bold uppercase tracking-widest flex items-center justify-center hover:bg-gray-900 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
              >
                Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-2"><LockIcon className="w-3 h-3" /> Secure checkout provided by Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}