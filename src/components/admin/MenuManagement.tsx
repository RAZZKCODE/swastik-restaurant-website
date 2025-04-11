
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MenuItemForm from './menu/MenuItemForm';
import MenuItemTable from './menu/MenuItemTable';
import DeleteConfirmDialog from './menu/DeleteConfirmDialog';
import { MenuItem, MenuItemFormValues, initialMenuItems } from './menu/types';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handler for adding a new menu item
  const handleAddItem = (data: MenuItemFormValues) => {
    // Ensure all required fields are provided by explicitly setting them
    const newItem: MenuItem = {
      id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
      vegetarian: data.vegetarian,
      spicy: data.spicy
    };
    
    setMenuItems([...menuItems, newItem]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Menu item added",
      description: `${data.name} has been added to the menu.`,
    });
  };

  // Handler for editing a menu item
  const handleEditItem = (data: MenuItemFormValues) => {
    if (!currentItem) return;
    
    // Create a properly typed updated item
    const updatedItem: MenuItem = {
      id: currentItem.id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      image: data.image,
      vegetarian: data.vegetarian,
      spicy: data.spicy
    };
    
    const updatedItems = menuItems.map(item => 
      item.id === currentItem.id ? updatedItem : item
    );
    
    setMenuItems(updatedItems);
    setIsEditDialogOpen(false);
    setCurrentItem(null);
    
    toast({
      title: "Menu item updated",
      description: `${data.name} has been updated.`,
    });
  };

  // Handler for deleting a menu item
  const handleDeleteItem = () => {
    if (!currentItem) return;
    
    const updatedItems = menuItems.filter(item => item.id !== currentItem.id);
    setMenuItems(updatedItems);
    setIsDeleteDialogOpen(false);
    setCurrentItem(null);
    
    toast({
      title: "Menu item deleted",
      description: `${currentItem.name} has been removed from the menu.`,
    });
  };

  // Function to open the edit dialog and populate the form
  const openEditDialog = (item: MenuItem) => {
    setCurrentItem(item);
    setIsEditDialogOpen(true);
  };

  // Function to open the delete dialog
  const openDeleteDialog = (item: MenuItem) => {
    setCurrentItem(item);
    setIsDeleteDialogOpen(true);
  };

  // Function to filter menu items based on search term
  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-restaurant-500 hover:bg-restaurant-600">
              <Plus className="mr-2 h-4 w-4" /> Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Enter the details for the new menu item.
              </DialogDescription>
            </DialogHeader>
            
            <MenuItemForm
              onSubmit={handleAddItem}
              onCancel={() => setIsAddDialogOpen(false)}
              submitLabel="Add Item"
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Menu Items Table */}
      <MenuItemTable 
        items={filteredItems}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update the details for this menu item.
            </DialogDescription>
          </DialogHeader>
          
          {currentItem && (
            <MenuItemForm
              onSubmit={handleEditItem}
              onCancel={() => setIsEditDialogOpen(false)}
              defaultValues={currentItem}
              submitLabel="Save Changes"
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteItem}
        item={currentItem}
      />
    </div>
  );
};

export default MenuManagement;
