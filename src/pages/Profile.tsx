
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Profile</h1>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Account Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and preferences.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user?.name || 'Not provided'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user?.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Account ID
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user?.id}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="mb-4 sm:mb-0"
              >
                Back to Home
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
