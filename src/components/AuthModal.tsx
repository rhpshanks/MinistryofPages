import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Loader2, CheckCircle, Phone, MapPin, Clock, ChevronRight, Building2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

const CITIES = [
  'Islamabad',
  'Rawalpindi',
];

const DELIVERY_TIMES = [
  { value: 'morning', label: 'Morning', time: '9 AM – 12 PM', icon: '🌅' },
  { value: 'afternoon', label: 'Afternoon', time: '12 PM – 5 PM', icon: '☀️' },
  { value: 'evening', label: 'Evening', time: '5 PM – 9 PM', icon: '🌆' },
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup' | 'onboarding';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'onboarding'>(defaultMode);
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const { signUp, signIn, updateProfile } = useAuth();

  // Reset form when modal opens or mode changes
  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setStep(defaultMode === 'onboarding' ? 2 : 1);
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, defaultMode]);

  useEffect(() => {
    setError(null);
    setSuccess(null);
  }, [mode, step]);

  if (!isOpen) return null;

  const handleAccountSubmit = async (e: React.FormEvent) => {
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
          setSuccess('Account created! Please check your email to verify, then sign in.');
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

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await updateProfile({
        phone: phone.trim() || null,
        city: city || null,
        delivery_address: deliveryAddress.trim() || null,
        preferred_delivery_time: deliveryTime || null,
      });

      if (error) {
        setError(error);
      } else {
        onClose();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipOnboarding = () => {
    onClose();
  };

  const isOnboardingMode = mode === 'onboarding';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
        {/* Close Button */}
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Step Indicator — only visible during sign-up flow or onboarding */}
        {isOnboardingMode && (
          <div className="px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step >= 1 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                </div>
                <span className={`text-xs font-medium hidden sm:inline transition-colors ${step >= 1 ? 'text-slate-700' : 'text-slate-400'}`}>
                  Account
                </span>
              </div>

              <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${
                step >= 2 ? 'bg-slate-900' : 'bg-slate-200'
              }`} />

              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  step >= 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  2
                </div>
                <span className={`text-xs font-medium hidden sm:inline transition-colors ${step >= 2 ? 'text-slate-700' : 'text-slate-400'}`}>
                  Delivery
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* STEP 1: Sign In or Account Creation */}
            {step === 1 && !isOnboardingMode && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-serif font-bold text-slate-900">
                    {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {mode === 'signin' 
                      ? 'Enter your credentials to access your account' 
                      : 'Sign up to manage your orders and deliveries'}
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

                <form className="space-y-4" onSubmit={handleAccountSubmit}>
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
                      {mode === 'signin' ? 'Sign In' : (
                        <>
                          Continue
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
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
              </motion.div>
            )}

            {/* STEP 2: Delivery Profile Setup */}
            {(step === 2 || isOnboardingMode) && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {/* Back button for signup flow only */}
                {mode === 'signup' && step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 mb-3">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-slate-900">
                    {isOnboardingMode ? 'Complete Your Profile' : 'Delivery Details'}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    {isOnboardingMode
                      ? 'Tell us where to deliver your pages'
                      : 'Help us deliver your pages on time'}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 rounded-sm bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleProfileSubmit}>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full rounded-sm border-slate-300 pl-10 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                        placeholder="03XX XXXXXXX"
                        disabled={loading}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">For delivery coordination & WhatsApp updates</p>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700">City</label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Building2 className="h-4 w-4 text-slate-400" />
                      </div>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="block w-full rounded-sm border-slate-300 pl-10 pr-3 focus:border-amber-500 focus:ring-amber-500 sm:text-sm appearance-none bg-white"
                        disabled={loading}
                      >
                        <option value="">Select your city</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Delivery Address</label>
                    <div className="relative mt-1">
                      <div className="pointer-events-none absolute top-2.5 left-0 flex items-start pl-3">
                        <MapPin className="h-4 w-4 text-slate-400" />
                      </div>
                      <textarea
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows={2}
                        className="block w-full rounded-sm border-slate-300 pl-10 focus:border-amber-500 focus:ring-amber-500 sm:text-sm resize-none"
                        placeholder="House/Office #, Street, Area"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Preferred Delivery Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Delivery Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {DELIVERY_TIMES.map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => setDeliveryTime(slot.value)}
                          disabled={loading}
                          className={`relative flex flex-col items-center gap-1 rounded-sm border px-3 py-2.5 text-center transition-all duration-200 ${
                            deliveryTime === slot.value
                              ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-lg leading-none">{slot.icon}</span>
                          <span className={`text-xs font-semibold ${deliveryTime === slot.value ? 'text-amber-700' : 'text-slate-700'}`}>
                            {slot.label}
                          </span>
                          <span className={`text-[10px] leading-tight ${deliveryTime === slot.value ? 'text-amber-600' : 'text-slate-400'}`}>
                            {slot.time}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 space-y-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full justify-center items-center gap-2 rounded-sm bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                      Save Delivery Preferences
                    </button>

                    <button
                      type="button"
                      onClick={handleSkipOnboarding}
                      className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition-colors py-1.5"
                    >
                      I'll do this later
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
