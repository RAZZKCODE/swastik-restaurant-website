
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Order type definition
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  user_id: string;
  customerName: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch user profiles for customer names
      const userIds = ordersData?.map(order => order.user_id) || [];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Create a map of user IDs to names
      const userNameMap = new Map();
      profilesData?.forEach(profile => {
        userNameMap.set(profile.id, profile.name || 'Unknown User');
      });

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

          if (itemsError) {
            console.error('Error fetching order items:', itemsError);
            return {
              ...order,
              customerName: userNameMap.get(order.user_id) || 'Unknown User',
              date: format(new Date(order.created_at), 'yyyy-MM-dd'),
              items: []
            };
          }

          return {
            ...order,
            customerName: userNameMap.get(order.user_id) || 'Unknown User',
            date: format(new Date(order.created_at), 'yyyy-MM-dd'),
            items: items || []
          };
        })
      );

      setOrders(ordersWithItems);
    } catch (err) {
      const message = (err as Error).message;
      toast({
        title: 'Error fetching orders',
        description: message,
        variant: 'destructive',
      });
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    preparing: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    "out for delivery": "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800"
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      // Update selected order if open
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      toast({
        title: 'Order Updated',
        description: `Order status changed to ${newStatus}`,
      });
    } catch (err) {
      const message = (err as Error).message;
      toast({
        title: 'Error updating order',
        description: message,
        variant: 'destructive',
      });
    }
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
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>Loading orders...</p>
            </div>
          ) : (
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
                      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
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
          )}
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
              {selectedOrder ? `Order ID: ${selectedOrder.id.slice(0, 8)}` : ""}
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                <p className="mt-1 text-sm">{selectedOrder.customerName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Status</h3>
                <div className="mt-1 flex items-center space-x-2">
                  <Badge className={statusColors[selectedOrder.status] || "bg-gray-100 text-gray-800"}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
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
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Update Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["pending", "processing", "preparing", "out for delivery", "delivered", "completed", "cancelled"].map(
                    (status) => (
                      <Button 
                        key={status}
                        size="sm"
                        variant={selectedOrder.status === status ? "default" : "outline"}
                        className="text-xs"
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    )
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOrderDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderManagement;

