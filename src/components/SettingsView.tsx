import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Bell, Eye, Lock, Globe, Shield, CreditCard, Save, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SettingsView() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderStatus: true,
    promotions: false
  });
  
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
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName.trim() }
      });
      
      if (error) throw error;
      
      // Update database profile
      await supabase.from('profiles').upsert({
        id: user.id,
        full_name: fullName.trim(),
        email: user.email,
        updated_at: new Date().toISOString()
      });
      
      addToast('Profile settings updated successfully!', 'success');
    } catch (err: any) {
      addToast(err.message || 'Error updating settings', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your account configurations and notification preferences.</p>
        </div>

        <div className="space-y-6">
          {/* Profile form */}
          <div className="bg-white rounded-md border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-serif font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">Profile Settings</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full rounded-sm border-slate-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400">Email Address (Cannot change)</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-1 block w-full rounded-sm border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed sm:text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading || fullName.trim() === user?.user_metadata?.full_name}
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
