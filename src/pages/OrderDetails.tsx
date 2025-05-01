
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderTracking from '@/components/OrderTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrder } from '@/hooks/use-orders';
import { Skeleton } from '@/components/ui/skeleton';

const OrderDetails = () => {
  const { orderId = '' } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { order, isLoading, error } = useOrder(orderId);

  // Format date to readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Error Loading Order</h1>
              <p className="text-gray-500 mb-6">{error}</p>
              <Button onClick={() => navigate('/profile')}>Back to Profile</Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-64 w-full" />
              <div className="grid md:grid-cols-2 gap-8">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-80 w-full" />
              </div>
            </div>
          ) : order ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gray-900">
                  Order #{order.id.split('-')[0]}
                </h1>
                <p className="text-gray-500">Placed on {formatDate(order.created_at)}</p>
              </div>
              
              {/* Order Tracking Component */}
              <OrderTracking orderId={orderId} currentStatus={order.status} />
              
              {/* Order Details */}
              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items && order.items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <span className="font-medium">{item.quantity}x </span>
                            {item.name}
                          </div>
                          <div>${item.price.toFixed(2)}</div>
                        </div>
                      ))}
                      <div className="border-t pt-4 flex justify-between font-bold">
                        <div>Total</div>
                        <div>${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-500">Order Status</div>
                        <div className="font-medium capitalize">{order.status}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Estimated Delivery Time</div>
                        <div className="font-medium">30-45 minutes</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Order Not Found</h1>
              <p className="text-gray-500 mb-6">We couldn't find the order you're looking for.</p>
              <Button onClick={() => navigate('/profile')}>Back to Profile</Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
