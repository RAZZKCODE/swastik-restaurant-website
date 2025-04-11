
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

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              Admin Dashboard
            </h1>
            
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-medium mb-4">Welcome, {user?.name || "Admin"}</h2>
              <p className="text-gray-600">
                This is the administration panel for Swastik Restaurant. 
                Here you can manage users, orders, menu items, and other aspects of the restaurant.
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="menu">Menu Items</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
              
              <TabsContent value="orders">
                <OrderManagement />
              </TabsContent>
              
              <TabsContent value="menu">
                <MenuManagement />
              </TabsContent>
              
              <TabsContent value="settings">
                <SettingsManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
