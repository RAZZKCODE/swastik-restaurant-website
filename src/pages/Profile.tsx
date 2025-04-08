
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample order data
const sampleOrders = [
  { id: '12345', date: '2025-04-07', status: 'Delivered', total: '$35.96' },
  { id: '12346', date: '2025-04-08', status: 'Preparing', total: '$42.50' },
  { id: '12347', date: '2025-04-08', status: 'Out for Delivery', total: '$28.75' },
];

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
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Profile</h1>
            
            <Tabs defaultValue="account" className="w-full mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="account">Account Information</TabsTrigger>
                <TabsTrigger value="orders">My Orders</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl>
                      <div className="grid grid-cols-3 gap-4 py-4">
                        <dt className="text-sm font-medium text-gray-500">
                          Full name
                        </dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {user?.name || 'Not provided'}
                        </dd>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                        <dt className="text-sm font-medium text-gray-500">
                          Email address
                        </dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {user?.email}
                        </dd>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                        <dt className="text-sm font-medium text-gray-500">
                          Account ID
                        </dt>
                        <dd className="text-sm text-gray-900 col-span-2">
                          {user?.id}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sampleOrders.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {sampleOrders.map((order) => (
                          <div key={order.id} className="py-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <div>
                                <Link 
                                  to={`/orders/${order.id}`}
                                  className="text-restaurant-600 hover:text-restaurant-700 font-medium"
                                >
                                  Order #{order.id}
                                </Link>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                              <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {order.status}
                                </span>
                                <p className="text-sm font-medium text-gray-900 mt-1">{order.total}</p>
                              </div>
                            </div>
                            <div className="mt-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => navigate(`/orders/${order.id}`)}
                              >
                                View Order
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">You haven't placed any orders yet.</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => navigate('/menu')}
                        >
                          Browse Menu
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

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
