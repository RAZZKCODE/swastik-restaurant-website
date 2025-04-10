
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, AuthContextType } from '@/types/auth';

// Mock users database - in a real app, this would be in a backend service
const USERS_STORAGE_KEY = 'swastik_restaurant_users';
const CURRENT_USER_KEY = 'swastik_current_user';

// Initialize the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Get users from localStorage
  const getUsers = (): any[] => {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersJson) return [];
    try {
      return JSON.parse(usersJson);
    } catch (e) {
      console.error('Failed to parse users data');
      return [];
    }
  };

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Simple mock implementation for demo purposes
      const users = getUsers();
      const foundUser = users.find(u => u.email === email && !u.isAdmin);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      // Check password
      if (foundUser.password && foundUser.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Set the logged in user (remove password from stored user)
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      toast({
        title: 'Login Successful',
        description: `Welcome back${foundUser.name ? ', ' + foundUser.name : ''}!`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      toast({
        title: 'Login Failed',
        description: err instanceof Error ? err.message : 'Invalid credentials',
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
      // In a real app, this would be an API call
      // Simple mock implementation for demo purposes
      const users = getUsers();
      const foundAdmin = users.find(u => u.email === email && u.isAdmin === true);
      
      if (!foundAdmin) {
        throw new Error('Invalid admin credentials');
      }
      
      // Check password
      if (foundAdmin.password && foundAdmin.password !== password) {
        throw new Error('Invalid admin credentials');
      }
      
      // Set the logged in admin user (remove password from stored user)
      const { password: _, ...adminWithoutPassword } = foundAdmin;
      
      setUser(adminWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminWithoutPassword));
      
      toast({
        title: 'Admin Login Successful',
        description: `Welcome back, Administrator${foundAdmin.name ? ' ' + foundAdmin.name : ''}!`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login as admin');
      toast({
        title: 'Admin Login Failed',
        description: err instanceof Error ? err.message : 'Invalid admin credentials',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string, isAdmin?: boolean) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Simple mock implementation for demo purposes
      const users = getUsers();
      
      if (users.some(user => user.email === email)) {
        throw new Error('Email already in use');
      }
      
      const newUser: User = {
        id: Date.now().toString(), // Simple ID generation
        email,
        name,
        isAdmin,
      };
      
      // Save the new user
      users.push(newUser);
      saveUsers(users);
      
      // Auto login after signup
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      toast({
        title: 'Account Created',
        description: 'Your account has been created successfully',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      toast({
        title: 'Signup Failed',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
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
