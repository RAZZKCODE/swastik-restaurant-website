
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

// Define the possible order statuses and their corresponding step numbers
const ORDER_STATUSES = {
  Pending: 0,
  Confirmed: 1,
  Preparing: 2,
  "Out for Delivery": 3,
  Delivered: 4
};

type OrderStatus = keyof typeof ORDER_STATUSES;

// Message type received from WebSocket
interface OrderStatusMessage {
  orderId: string;
  status: OrderStatus;
}

interface OrderTrackingProps {
  orderId: string;
}

const OrderTracking = ({ orderId }: OrderTrackingProps) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("Pending");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate progress percentage based on current status
  const progressPercentage = 
    (ORDER_STATUSES[currentStatus] / (Object.keys(ORDER_STATUSES).length - 1)) * 100;

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket(`wss://api.example.com/orders/status`);
    setSocket(ws);

    ws.onopen = () => {
      // Subscribe to updates for the specific order ID
      ws.send(JSON.stringify({ action: 'subscribe', orderId }));
    };

    ws.onmessage = (event) => {
      try {
        const data: OrderStatusMessage = JSON.parse(event.data);
        
        // Only update if the message is for this order
        if (data.orderId === orderId && data.status in ORDER_STATUSES) {
          setCurrentStatus(data.status);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
      setError('Unable to connect to order tracking service');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up function to close the WebSocket when component unmounts
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'unsubscribe', orderId }));
        ws.close();
      }
    };
  }, [orderId]); // Reconnect if orderId changes

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-serif font-semibold mb-6">Order Status</h2>
      
      {/* Progress bar */}
      <div className="mb-8">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      {/* Timeline steps */}
      <div className="grid grid-cols-5 gap-2 relative">
        {Object.keys(ORDER_STATUSES).map((status, index) => {
          const isActive = ORDER_STATUSES[status as OrderStatus] <= ORDER_STATUSES[currentStatus];
          const isCurrent = status === currentStatus;
          
          return (
            <div key={status} className="flex flex-col items-center">
              {/* Circle indicator */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors duration-300 
                  ${isCurrent 
                    ? 'bg-restaurant-600 text-white ring-4 ring-restaurant-100' 
                    : isActive 
                      ? 'bg-restaurant-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}
              >
                {/* Step number */}
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              
              {/* Step label */}
              <span 
                className={`text-sm font-medium text-center ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                } ${isCurrent ? 'font-bold' : ''}`}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
