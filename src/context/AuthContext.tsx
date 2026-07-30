import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  delivery_address: string | null;
  preferred_delivery_time: string | null;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  profileComplete: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (fields: Partial<UserProfile>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as UserProfile;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const data = await fetchProfile(user.id);
    if (data) setProfile(data);
  }, [user, fetchProfile]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
      }

      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const profileComplete = Boolean(
    profile?.phone &&
    profile?.city &&
    profile?.delivery_address
  );

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) return { error: error.message };

    // Insert profile into profiles table using data.user from signup response
    if (data?.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        updated_at: new Date().toISOString(),
      });
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const updateProfile = async (fields: Partial<UserProfile>) => {
    if (!user) return { error: 'Not authenticated' };

    const updates = {
      ...fields,
      id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) return { error: error.message };

    // Update auth metadata if full_name changed
    if (fields.full_name) {
      await supabase.auth.updateUser({
        data: { full_name: fields.full_name },
      });
    }

    // Refresh local profile
    const profileData = await fetchProfile(user.id);
    if (profileData) setProfile(profileData);

    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, profileComplete, loading, signUp, signIn, signOut, updateProfile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
