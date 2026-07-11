import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const { signUp, signIn } = useAuth();

  // Reset form when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, defaultMode]);

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          setError('Please enter your full name.');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName.trim());
        if (error) {
          setError(error);
        } else {
          setSuccess('Account created! Please check your email to verify.');
          setFullName('');
          setEmail('');
          setPassword('');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error);
        } else {
          onClose();
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all">
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {mode === 'signin' 
              ? 'Enter your credentials to access your account' 
              : 'Sign up to manage your orders and waitlist'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-sm bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-sm bg-emerald-50 border border-emerald-200 p-3 flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <p className="text-sm text-emerald-700">{success}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full rounded-sm border-slate-300 pl-10 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                  placeholder="Your full name"
                  required
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-sm border-slate-300 pl-10 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-sm border-slate-300 pl-10 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                placeholder="••••••••"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center items-center gap-2 rounded-sm bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-600">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="font-medium text-amber-600 hover:text-amber-500 transition-colors focus:outline-none"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
