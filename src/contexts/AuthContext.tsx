
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, AuthContextType } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Helper function to convert Supabase User to our app's User type
const mapSupabaseUser = (supabaseUser: SupabaseUser | null): User | null => {
  if (!supabaseUser) return null;
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '', // Convert optional email to required email
    name: supabaseUser.user_metadata?.name || undefined,
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(mapSupabaseUser(session?.user ?? null));
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(mapSupabaseUser(session?.user ?? null));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      toast({
        title: 'Login Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First try to authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // If Supabase auth fails, check local storage for admin user
        const USERS_STORAGE_KEY = 'swastik_restaurant_users';
        const storedUsersJson = localStorage.getItem(USERS_STORAGE_KEY);
        
        if (storedUsersJson) {
          const storedUsers = JSON.parse(storedUsersJson);
          const adminUser = storedUsers.find((user: any) => 
            user.email === email && 
            user.password === password && 
            user.isAdmin === true
          );
          
          if (adminUser) {
            // Set the admin user manually since we're not using Supabase auth for this user
            setUser({
              id: adminUser.id,
              email: adminUser.email,
              name: adminUser.name,
              isAdmin: true
            });
            
            toast({
              title: 'Admin Login Successful',
              description: 'Welcome back, Administrator!',
            });
            
            setIsLoading(false);
            return;
          }
        }
        
        // If no admin user found in localStorage either, throw error
        throw new Error('Invalid admin credentials');
      }
      
      // If Supabase auth succeeds, check if user has admin role in Supabase
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();
      
      if (!profile || profile.role !== 'admin') {
        // Sign out if not admin
        await supabase.auth.signOut();
        throw new Error('Not authorized as admin');
      }
      
      // Add isAdmin flag to the user object
      if (data.user) {
        setUser({
          ...mapSupabaseUser(data.user)!,
          isAdmin: true
        });
      }
      
      toast({
        title: 'Admin Login Successful',
        description: 'Welcome back, Administrator!',
      });
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      toast({
        title: 'Admin Login Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: 'Account Created',
        description: 'Your account has been created successfully',
      });
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      toast({
        title: 'Signup Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Handle both local storage admin and Supabase admin logout
    const { error } = await supabase.auth.signOut();
    setUser(null);
    
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        adminLogin,
        signup,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
