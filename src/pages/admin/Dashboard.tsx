
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/admin/UserManagement";
import OrderManagement from "@/components/admin/OrderManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import MenuManagement from "@/components/admin/MenuManagement";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { ShoppingBag, Users, Coffee, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  // Dashboard summary stats
  const dashboardStats = [
    { title: "Total Users", value: "103", icon: Users, color: "bg-blue-100 text-blue-800" },
    { title: "Active Orders", value: "24", icon: ShoppingBag, color: "bg-orange-100 text-orange-800" },
    { title: "Menu Items", value: "48", icon: Coffee, color: "bg-green-100 text-green-800" },
    { title: "Total Revenue", value: "$12,486", icon: Settings, color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <div className="bg-restaurant-100 text-restaurant-800 px-4 py-1 rounded-full text-sm">
                {user?.isAdmin ? "Administrator" : "Staff"}
              </div>
            </div>
            
            <div className="bg-white shadow-sm rounded-lg p-6 mb-8 border border-restaurant-100">
              <h2 className="text-xl font-medium mb-2">Welcome, {user?.name || "Admin"}</h2>
              <p className="text-gray-600">
                Manage your restaurant operations from this dashboard. Monitor orders, manage menu items, and configure settings.
              </p>
            </div>

            {/* Stats Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="border-l-4 border-l-restaurant-500">
                  <CardContent className="p-4 flex items-center">
                    <div className={`rounded-full p-2 mr-4 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8 bg-restaurant-50">
                <TabsTrigger 
                  value="users"
                  className="data-[state=active]:bg-restaurant-500 data-[state=active]:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </TabsTrigger>
                <TabsTrigger 
                  value="orders"
                  className="data-[state=active]:bg-restaurant-500 data-[state=active]:text-white"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger 
                  value="menu"
                  className="data-[state=active]:bg-restaurant-500 data-[state=active]:text-white"
                >
                  <Coffee className="h-4 w-4 mr-2" />
                  Menu Items
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className="data-[state=active]:bg-restaurant-500 data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <div className="bg-white rounded-lg shadow-sm">
                <TabsContent value="users" className="mt-0">
                  <UserManagement />
                </TabsContent>
                
                <TabsContent value="orders" className="mt-0">
                  <OrderManagement />
                </TabsContent>
                
                <TabsContent value="menu" className="mt-0">
                  <MenuManagement />
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <SettingsManagement />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
