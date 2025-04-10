
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Search, Filter, Eye } from "lucide-react";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2025-04-09",
    total: 125.99,
    status: "completed",
    items: [
      { name: "Butter Chicken", quantity: 1, price: 18.99 },
      { name: "Garlic Naan", quantity: 2, price: 3.50 },
      { name: "Mango Lassi", quantity: 2, price: 4.99 }
    ]
  },
  {
    id: "ORD-002",
    customer: "Sarah Smith",
    date: "2025-04-10",
    total: 78.50,
    status: "processing",
    items: [
      { name: "Vegetable Samosas", quantity: 2, price: 6.99 },
      { name: "Paneer Tikka Masala", quantity: 1, price: 16.99 },
      { name: "Plain Naan", quantity: 3, price: 2.99 }
    ]
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    date: "2025-04-10",
    total: 45.75,
    status: "pending",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 19.99 },
      { name: "Raita", quantity: 1, price: 3.99 },
      { name: "Mango Chutney", quantity: 1, price: 2.99 }
    ]
  },
  {
    id: "ORD-004",
    customer: "Lisa Wong",
    date: "2025-04-08",
    total: 98.25,
    status: "completed",
    items: [
      { name: "Tandoori Chicken", quantity: 1, price: 21.99 },
      { name: "Pulao Rice", quantity: 2, price: 5.99 },
      { name: "Gulab Jamun", quantity: 4, price: 6.99 }
    ]
  },
  {
    id: "ORD-005",
    customer: "Robert Chen",
    date: "2025-04-07",
    total: 55.50,
    status: "cancelled",
    items: [
      { name: "Vegetable Curry", quantity: 1, price: 14.99 },
      { name: "Cheese Naan", quantity: 2, price: 4.50 },
      { name: "Mango Kulfi", quantity: 2, price: 5.99 }
    ]
  }
];

const OrderManagement = () => {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800"
  };

  const handleViewOrderDetails = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl">Order Management</CardTitle>
            <CardDescription>View and manage all customer orders</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewOrderDetails(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Sheet */}
      <Sheet open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Order Details
            </SheetTitle>
            <SheetDescription>
              {selectedOrder ? `Order ID: ${selectedOrder.id}` : ""}
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                <p className="mt-1 text-sm">{selectedOrder.customer}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Status</h3>
                <Badge className={`mt-1 ${statusColors[selectedOrder.status]}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                <p className="mt-1 text-sm">{selectedOrder.date}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Items</h3>
                <ul className="mt-2 divide-y divide-gray-200">
                  {selectedOrder.items.map((item, index) => (
                    <li key={index} className="py-2 flex justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-base font-medium">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button 
                  className="flex-1"
                  variant="outline"
                  onClick={() => setIsOrderDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button className="flex-1">Update Status</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderManagement;
