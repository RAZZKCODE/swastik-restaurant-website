
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderTracking from '@/components/OrderTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderDetails = () => {
  const { orderId = '12345' } = useParams<{ orderId: string }>();
  
  // Sample order details
  const orderDetails = {
    id: orderId,
    items: [
      { name: 'Butter Chicken', quantity: 1, price: '$14.99' },
      { name: 'Vegetable Biryani', quantity: 1, price: '$12.99' },
      { name: 'Garlic Naan', quantity: 2, price: '$3.99' }
    ],
    total: '$35.96',
    address: '123 Main St, Anytown, CA 12345',
    date: new Date().toLocaleDateString()
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              Order #{orderDetails.id}
            </h1>
            <p className="text-gray-500">Placed on {orderDetails.date}</p>
          </div>
          
          {/* Order Tracking Component */}
          <OrderTracking orderId={orderId} />
          
          {/* Order Details */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.quantity}x </span>
                        {item.name}
                      </div>
                      <div>{item.price}</div>
                    </div>
                  ))}
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <div>Total</div>
                    <div>{orderDetails.total}</div>
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
                    <div className="text-sm text-gray-500">Delivery Address</div>
                    <div className="font-medium">{orderDetails.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Estimated Delivery Time</div>
                    <div className="font-medium">30-45 minutes</div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Driver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
