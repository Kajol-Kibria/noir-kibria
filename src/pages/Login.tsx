import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    login(email, password);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2 text-black">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {isLogin ? 'Sign in to access your account' : 'Join the NOIR club'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
                placeholder="JOHN DOE"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
              placeholder="HELLO@EXAMPLE.COM"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-4 text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-900 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-black uppercase tracking-widest hover:underline transition-all ml-1"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
          {isLogin && (
             <p className="mt-4 text-xs text-gray-400">Admin access: use <span className="font-bold text-black">admin@noir.com</span></p>
          )}
        </div>
      </div>
    </div>
  );
}