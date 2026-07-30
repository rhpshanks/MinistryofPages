import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Phone, MapPin, Clock, Building2, ShieldCheck, Pencil } from 'lucide-react';

const DELIVERY_TIME_LABELS: Record<string, { label: string; time: string; icon: string }> = {
  morning: { label: 'Morning', time: '9 AM – 12 PM', icon: '🌅' },
  afternoon: { label: 'Afternoon', time: '12 PM – 5 PM', icon: '☀️' },
  evening: { label: 'Evening', time: '5 PM – 9 PM', icon: '🌆' },
};

export default function ProfileView({ onNavigateToSettings }: { onNavigateToSettings?: () => void }) {
  const { user, profile } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Please sign in to view your profile.</p>
      </div>
    );
  }

  const fullName = profile?.full_name || user.user_metadata?.full_name || 'Ministry of Pages User';
  const email = profile?.email || user.email || '';
  const initial = fullName.charAt(0).toUpperCase();

  // Deterministic background color for avatar
  const getAvatarBg = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-amber-600', 'bg-emerald-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const createdAtDate = user.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Recently';

  const deliveryTimeInfo = profile?.preferred_delivery_time 
    ? DELIVERY_TIME_LABELS[profile.preferred_delivery_time] 
    : null;

  const hasDeliveryInfo = profile?.phone || profile?.city || profile?.delivery_address;

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm">
          {/* Header Cover Banner */}
          <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-900" />
          
          <div className="px-6 pb-8 sm:px-8 sm:pb-10 relative">
            {/* Avatar positioning */}
            <div className="absolute -top-16 left-6 sm:left-8">
              <div className={`w-28 h-28 rounded-full border-4 border-white ${getAvatarBg(fullName)} flex items-center justify-center text-white text-4xl font-serif font-bold shadow-md`}>
                {initial}
              </div>
            </div>

            {/* Edit button */}
            {onNavigateToSettings && (
              <div className="absolute top-4 right-6 sm:right-8">
                <button
                  onClick={onNavigateToSettings}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 rounded-sm px-3 py-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              </div>
            )}

            {/* Profile Info Details */}
            <div className="pt-16 sm:pt-14">
              <h1 className="text-2xl font-serif font-bold text-slate-900">{fullName}</h1>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Verified Customer
              </p>
            </div>

            {/* Core Info Grid */}
            <div className="mt-8 border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-sm">
                  <Mail className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</h3>
                  <p className="text-sm text-slate-900 mt-1">{email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-sm">
                  <Phone className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</h3>
                  <p className="text-sm text-slate-900 mt-1">
                    {profile?.phone || <span className="text-slate-400 italic">Not set</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-sm">
                  <Building2 className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">City</h3>
                  <p className="text-sm text-slate-900 mt-1">
                    {profile?.city || <span className="text-slate-400 italic">Not set</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-sm">
                  <Calendar className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Member Since</h3>
                  <p className="text-sm text-slate-900 mt-1">{createdAtDate}</p>
                </div>
              </div>
            </div>

            {/* Delivery Info Section */}
            <div className="mt-8 border-t border-slate-100 pt-8">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                Delivery Preferences
              </h2>
              
              {hasDeliveryInfo ? (
                <div className="space-y-5">
                  {/* Delivery Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-50 rounded-sm">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Delivery Address</h3>
                      <p className="text-sm text-slate-900 mt-1 leading-relaxed">
                        {profile?.delivery_address || <span className="text-slate-400 italic">Not set</span>}
                      </p>
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-50 rounded-sm">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Delivery Time</h3>
                      {deliveryTimeInfo ? (
                        <p className="text-sm text-slate-900 mt-1 flex items-center gap-1.5">
                          <span>{deliveryTimeInfo.icon}</span>
                          {deliveryTimeInfo.label} ({deliveryTimeInfo.time})
                        </p>
                      ) : (
                        <p className="text-sm text-slate-400 mt-1 italic">Not set</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-sm p-6 text-center">
                  <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 mb-3">No delivery preferences set yet.</p>
                  {onNavigateToSettings && (
                    <button
                      onClick={onNavigateToSettings}
                      className="text-sm font-medium text-amber-600 hover:text-amber-500 transition-colors"
                    >
                      Set up delivery preferences →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
