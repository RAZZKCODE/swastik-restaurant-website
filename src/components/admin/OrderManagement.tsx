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
import { 
  Search, 
  Filter, 
  Eye, 
  ShoppingBag, 
  AlertCircle, 
  RefreshCw 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import OrderTracking from "../OrderTracking";
import { useOrders, Order } from "@/hooks/use-orders";

const OrderManagement = () => {
  const { orders: fetchedOrders, isLoading: isOrdersLoading, error: ordersError, fetchOrders } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    enhanceOrdersWithCustomerNames();
  }, [fetchedOrders]);

  const enhanceOrdersWithCustomerNames = async () => {
    if (!fetchedOrders || fetchedOrders.length === 0) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user profiles for customer names
      const userIds = fetchedOrders.map(order => order.user_id);
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

      // Transform orders data
      const enhancedOrders: Order[] = fetchedOrders.map(order => ({
        ...order,
        customerName: userNameMap.get(order.user_id) || 'Unknown User',
        date: format(new Date(order.created_at), 'PPP'),
      }));

      setOrders(enhancedOrders);
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      toast({
        title: 'Error enhancing orders with customer names',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || ''
  );

  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
    preparing: "bg-yellow-100 text-yellow-800",
    pending: "bg-orange-100 text-orange-800",
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

      // Refresh orders list to ensure we have the latest data
      fetchOrders();

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
      <Card className="border-restaurant-100 shadow-md">
        <CardHeader className="flex flex-row justify-between items-center bg-gradient-to-r from-restaurant-50 to-white">
          <div>
            <CardTitle className="text-2xl text-restaurant-800">Order Management</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
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
            <Button 
              variant="outline" 
              size="icon"
              onClick={fetchOrders}
              title="Refresh orders"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {(error || ordersError) && (
            <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>Error loading orders: {error || ordersError}</p>
            </div>
          )}
          
          {(isLoading || isOrdersLoading) ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <RefreshCw className="h-8 w-8 text-restaurant-500 animate-spin" />
                <p className="mt-4 text-restaurant-600">Loading orders...</p>
              </div>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-medium">Order ID</TableHead>
                    <TableHead className="font-medium">Customer</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="text-right font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
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
                            className="text-restaurant-600 hover:text-restaurant-800 hover:bg-restaurant-50"
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
                        {searchTerm ? 
                          "No orders found matching your search." : 
                          "No orders found. Orders will appear here when customers place them."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Sheet */}
      <Sheet open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center text-restaurant-700">
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

              {/* Order Tracking */}
              <div className="py-2">
                <OrderTracking orderId={selectedOrder.id} currentStatus={selectedOrder.status} />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
                <p className="mt-1 text-sm">{selectedOrder.date}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Items</h3>
                <ul className="mt-2 divide-y divide-gray-200">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, index) => (
                      <li key={index} className="py-2 flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                      </li>
                    ))
                  ) : (
                    <li className="py-2 text-sm text-gray-500">No items found for this order.</li>
                  )}
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
                        className={selectedOrder.status === status ? "bg-restaurant-500 hover:bg-restaurant-600" : "text-xs"}
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
