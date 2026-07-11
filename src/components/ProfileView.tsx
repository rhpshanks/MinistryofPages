import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Key, ShieldCheck } from 'lucide-react';

export default function ProfileView() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Please sign in to view your profile.</p>
      </div>
    );
  }

  const fullName = user.user_metadata?.full_name || 'Ministry of Pages User';
  const email = user.email || '';
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

            {/* Profile Info Details */}
            <div className="pt-16 sm:pt-14">
              <h1 className="text-2xl font-serif font-bold text-slate-900">{fullName}</h1>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Verified Customer
              </p>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-sm">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account ID</h3>
                  <p className="text-sm text-slate-900 mt-1 font-mono break-all">{user.id}</p>
                </div>
              </div>

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
                  <Calendar className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Member Since</h3>
                  <p className="text-sm text-slate-900 mt-1">{createdAtDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-sm">
                  <Key className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Authentication</h3>
                  <p className="text-sm text-slate-900 mt-1">Supabase Secure Auth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
