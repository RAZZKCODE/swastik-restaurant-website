
import { Users, ShoppingBag, Coffee, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "menu", label: "Menu Items", icon: Coffee },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="hidden sm:block w-64 bg-white shadow-md">
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold text-restaurant-700 font-serif">Admin Panel</h2>
      </div>
      <nav className="mt-3">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id
                    ? "bg-restaurant-100 text-restaurant-700 hover:bg-restaurant-200"
                    : "text-gray-600 hover:text-restaurant-700"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
