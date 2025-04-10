
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('user');
  const { login, adminLogin, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (activeTab === 'admin') {
        await adminLogin(email, password);
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        await login(email, password);
        navigate('/'); // Redirect to home
      }
    } catch (err) {
      // Error is handled in the auth context
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-restaurant-600 hover:text-restaurant-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user" className="flex items-center justify-center">
                  <User size={16} className="mr-2" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center justify-center">
                  <ShieldCheck size={16} className="mr-2" />
                  Admin Login
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              
              <div>
                <Label htmlFor="email">
                  {activeTab === 'admin' ? 'Admin Email' : 'Email address'}
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={activeTab === 'admin' ? 'admin@swastik.com' : 'Enter your email'}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={activeTab === 'admin' ? 'admin-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={activeTab === 'admin' ? 'Admin password' : 'Enter your password'}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className={`w-full ${activeTab === 'admin' 
                    ? 'bg-slate-700 hover:bg-slate-800' 
                    : 'bg-restaurant-600 hover:bg-restaurant-700'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : activeTab === 'admin' ? 'Login as Admin' : 'Login'}
                </Button>
              </div>

              {activeTab === 'admin' && (
                <div className="mt-2 text-center text-sm text-gray-600">
                  <p>Default admin: admin@swastik.com / admin123</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
