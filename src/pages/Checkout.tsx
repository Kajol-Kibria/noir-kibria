import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useStore, useAuth } from '../context/AppContext';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock Stripe Processing
    setTimeout(() => {
      addOrder({
        userId: user ? user.id : 'guest',
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          size: item.selectedSize,
          color: item.selectedColor
        })),
        total: finalTotal,
      });

      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold uppercase mb-4">No items to checkout</h2>
        <button onClick={() => navigate('/shop')} className="underline text-sm font-semibold uppercase tracking-wider">
          Return to Shop
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h2 className="text-4xl font-bold tracking-tighter uppercase mb-4 text-black text-center">Payment Successful</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">Thank you for your purchase. Your order is being processed and you will receive an email confirmation shortly.</p>
        <p className="text-sm text-gray-400 uppercase tracking-widest">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tighter uppercase mb-12 border-b-4 border-black pb-4 inline-block">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Payment Form */}
          <div className="md:w-2/3">
            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Shipping Info */}
              <div className="bg-gray-50 p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold tracking-tighter uppercase mb-6 text-black border-b border-gray-200 pb-2">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                    <input required type="text" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                    <input required type="text" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Address</label>
                    <input required type="text" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">City</label>
                    <input required type="text" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                    <input required type="text" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors" />
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold tracking-tighter uppercase mb-6 text-black border-b border-gray-200 pb-2 flex items-center gap-2">
                   Payment Details <CreditCard className="w-5 h-5" />
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Card Number</label>
                    <div className="relative">
                        <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border-gray-300 border p-3 pl-10 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors font-mono" />
                        <CreditCard className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Expiry Date</label>
                      <input required type="text" placeholder="MM/YY" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">CVC</label>
                      <input required type="text" placeholder="123" className="w-full border-gray-300 border p-3 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors font-mono" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-5 text-sm font-bold uppercase tracking-widest flex items-center justify-center transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 ${
                  isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-6 border border-gray-100 sticky top-28">
              <h2 className="text-lg font-bold tracking-tighter uppercase mb-6 text-black border-b border-gray-200 pb-2">Your Order</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-10 h-14 object-cover" />
                        <div>
                           <p className="font-bold text-black">{item.product.name}</p>
                           <p className="text-xs text-gray-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <span className="font-medium text-black">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-black pt-2 border-t border-gray-200 mt-2">
                  <span className="uppercase tracking-tighter">Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}