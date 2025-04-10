
export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
  password?: string; // Added password field (not included in client-side User object)
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string, isAdmin?: boolean) => Promise<void>;
  logout: () => void;
  error: string | null;
}
