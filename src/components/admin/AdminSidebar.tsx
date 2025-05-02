
import { Users, ShoppingBag, Coffee, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  
  const menuItems = [
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "menu", label: "Menu Items", icon: Coffee },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="hidden sm:block w-64 bg-white shadow-md border-r border-gray-100">
      <div className="px-6 py-8 border-b border-gray-100">
        <h2 className="text-xl font-bold text-restaurant-700 font-serif">Admin Panel</h2>
        <div className="flex items-center mt-4">
          <div className="w-10 h-10 bg-restaurant-100 rounded-full flex items-center justify-center text-restaurant-700 font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === item.id
                    ? "bg-restaurant-500 text-white hover:bg-restaurant-600"
                    : "text-gray-600 hover:text-restaurant-700 hover:bg-restaurant-50"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 px-6 py-4 w-64">
        <div className="bg-restaurant-50 rounded-lg p-4">
          <p className="text-sm text-restaurant-700 font-medium">Need help?</p>
          <p className="text-xs text-restaurant-600 mt-1">Check our documentation or contact support</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
