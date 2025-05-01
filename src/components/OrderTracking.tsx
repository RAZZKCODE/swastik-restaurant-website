
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

// Define the possible order statuses and their corresponding step numbers
const ORDER_STATUSES = {
  "pending": 0,
  "confirmed": 1,
  "preparing": 2,
  "out for delivery": 3,
  "delivered": 4,
  "completed": 4 // Alias for delivered
};

type OrderStatus = keyof typeof ORDER_STATUSES;

interface OrderTrackingProps {
  orderId: string;
  currentStatus?: string;
}

const OrderTracking = ({ orderId, currentStatus = "pending" }: OrderTrackingProps) => {
  // Normalize status to match our defined statuses
  const normalizeStatus = (status: string): OrderStatus => {
    const lowerStatus = status.toLowerCase();
    return (lowerStatus in ORDER_STATUSES) 
      ? lowerStatus as OrderStatus 
      : "pending";
  };
  
  const [status, setStatus] = useState<OrderStatus>(normalizeStatus(currentStatus));
  
  // Update status when currentStatus prop changes
  useEffect(() => {
    setStatus(normalizeStatus(currentStatus));
  }, [currentStatus]);
  
  // Calculate progress percentage based on current status
  const progressPercentage = 
    (ORDER_STATUSES[status] / (Object.keys(ORDER_STATUSES).length - 2)) * 100;

  // Display statuses (removing completed as it's an alias)
  const displayStatuses = Object.keys(ORDER_STATUSES)
    .filter(status => status !== 'completed') as OrderStatus[];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-serif font-semibold mb-6">Order Status</h2>
      
      {/* Progress bar */}
      <div className="mb-8">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      {/* Timeline steps */}
      <div className="grid grid-cols-5 gap-2 relative">
        {displayStatuses.map((orderStatus, index) => {
          const isActive = ORDER_STATUSES[orderStatus] <= ORDER_STATUSES[status];
          const isCurrent = orderStatus === status;
          
          return (
            <div key={orderStatus} className="flex flex-col items-center">
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
                className={`text-sm font-medium text-center capitalize ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                } ${isCurrent ? 'font-bold' : ''}`}
              >
                {orderStatus.replace(/-/g, ' ')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
