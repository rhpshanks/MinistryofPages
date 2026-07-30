import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Bell, Globe, Shield, Save, Loader2, Phone, MapPin, Clock, Building2, User } from 'lucide-react';

const CITIES = [
  'Islamabad',
  'Rawalpindi',
];

const DELIVERY_TIMES = [
  { value: 'morning', label: 'Morning', time: '9 AM – 12 PM', icon: '🌅' },
  { value: 'afternoon', label: 'Afternoon', time: '12 PM – 5 PM', icon: '☀️' },
  { value: 'evening', label: 'Evening', time: '5 PM – 9 PM', icon: '🌆' },
];

export default function SettingsView() {
  const { user, profile } = useAuth();
  const { addToast } = useToast();
  const { updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderStatus: true,
    promotions: false
  });

  // Sync form fields with profile data
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setCity(profile.city || '');
      setDeliveryAddress(profile.delivery_address || '');
      setDeliveryTime(profile.preferred_delivery_time || '');
    } else if (user) {
      setFullName(user.user_metadata?.full_name || '');
    }
  }, [profile, user]);
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Please sign in to view settings.</p>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;
    
    setLoading(true);
    try {
      const { error } = await updateProfile({
        full_name: fullName.trim(),
        phone: phone.trim() || null,
        city: city || null,
        delivery_address: deliveryAddress.trim() || null,
        preferred_delivery_time: deliveryTime || null,
      });
      
      if (error) throw new Error(error);
      addToast('Profile settings updated successfully!', 'success');
    } catch (err: any) {
      addToast(err.message || 'Error updating settings', 'info');
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = () => {
    return (
      fullName.trim() !== (profile?.full_name || '') ||
      (phone.trim() || null) !== (profile?.phone || null) ||
      (city || null) !== (profile?.city || null) ||
      (deliveryAddress.trim() || null) !== (profile?.delivery_address || null) ||
      (deliveryTime || null) !== (profile?.preferred_delivery_time || null)
    );
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account and delivery preferences.</p>
        </div>

        <div className="space-y-6">
          {/* Profile form */}
          <div className="bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">Profile Settings</h2>
            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Name */}
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
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email — read-only */}
              <div>
                <label className="block text-sm font-medium text-slate-400">Email Address (Cannot change)</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-1 block w-full rounded-sm border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed sm:text-sm"
                />
              </div>

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
                      onClick={() => setDeliveryTime(deliveryTime === slot.value ? '' : slot.value)}
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

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !hasChanges()}
                  className="flex items-center gap-2 rounded-sm bg-slate-900 hover:bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Profile
                </button>
              </div>
            </form>
          </div>

          {/* Notifications settings */}
          <div className="bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="p-1.5 bg-slate-100 rounded-sm mt-0.5">
                    <Bell className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-950">Email Updates</h3>
                    <p className="text-xs text-slate-500">Receive periodic waitlist announcements and paper stock updates.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.emailUpdates}
                  onChange={(e) => setNotifications(prev => ({ ...prev, emailUpdates: e.target.checked }))}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4 mt-1"
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="p-1.5 bg-slate-100 rounded-sm mt-0.5">
                    <Shield className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-950">Order confirmations</h3>
                    <p className="text-xs text-slate-500">Receive receipts and tracking codes on WhatsApp or email.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.orderStatus}
                  onChange={(e) => setNotifications(prev => ({ ...prev, orderStatus: e.target.checked }))}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4 mt-1"
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="p-1.5 bg-slate-100 rounded-sm mt-0.5">
                    <Globe className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-950">Marketing Communications</h3>
                    <p className="text-xs text-slate-500">Receive discounts, loyalty rewards, and early design sample drops.</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.promotions}
                  onChange={(e) => setNotifications(prev => ({ ...prev, promotions: e.target.checked }))}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 h-4 w-4 mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
