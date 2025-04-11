
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Image as ImageIcon,
  DollarSign,
  Check,
  X
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

// Define the menu item type
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  vegetarian: boolean;
  spicy: boolean;
};

// Define the form schema for menu items
const menuItemSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(5, { message: "Description must be at least 5 characters." }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: "Price must be a valid number.",
  }),
  category: z.string().min(1, { message: "Category is required." }),
  image: z.string().url({ message: "Please enter a valid image URL." }),
  vegetarian: z.boolean().default(false),
  spicy: z.boolean().default(false),
});

type MenuItemFormValues = z.infer<typeof menuItemSchema>;

// Sample menu data
const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Samosas",
    description: "Crispy pastry filled with spiced potatoes and peas.",
    price: "5.99",
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    vegetarian: true,
    spicy: false
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce.",
    price: "14.99",
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    vegetarian: false,
    spicy: true
  },
  {
    id: 3,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables.",
    price: "12.99",
    category: "Rice Dishes",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    vegetarian: true,
    spicy: true
  }
];

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize the form
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      vegetarian: false,
      spicy: false,
    }
  });

  // Handler for adding a new menu item
  const handleAddItem = (data: MenuItemFormValues) => {
    // Fix: Ensure all required fields are provided by explicitly setting them
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
    form.reset();
    
    toast({
      title: "Menu item added",
      description: `${data.name} has been added to the menu.`,
    });
  };

  // Handler for editing a menu item
  const handleEditItem = (data: MenuItemFormValues) => {
    if (!currentItem) return;
    
    // Fix: Create a properly typed updated item
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
    form.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      vegetarian: item.vegetarian,
      spicy: item.spicy,
    });
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddItem)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Paneer Tikka" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Describe the dish briefly" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <Input {...field} className="pl-8" placeholder="9.99" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Appetizers" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ImageIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                          <Input {...field} className="pl-8" placeholder="https://example.com/image.jpg" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vegetarian"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="rounded border-gray-300 text-restaurant-600 focus:ring-restaurant-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Vegetarian</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="spicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="rounded border-gray-300 text-restaurant-600 focus:ring-restaurant-500"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Spicy</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-restaurant-500 hover:bg-restaurant-600">
                    Add Item
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Menu Items Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Vegetarian</TableHead>
              <TableHead>Spicy</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    {item.vegetarian ? 
                      <Check className="h-5 w-5 text-green-500" /> : 
                      <X className="h-5 w-5 text-red-500" />
                    }
                  </TableCell>
                  <TableCell>
                    {item.spicy ? 
                      <Check className="h-5 w-5 text-red-500" /> : 
                      <X className="h-5 w-5 text-gray-500" />
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openDeleteDialog(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No menu items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>
              Update the details for this menu item.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditItem)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                          <Input {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <ImageIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vegetarian"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded border-gray-300 text-restaurant-600 focus:ring-restaurant-500"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Vegetarian</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="spicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded border-gray-300 text-restaurant-600 focus:ring-restaurant-500"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">Spicy</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-restaurant-500 hover:bg-restaurant-600">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Menu Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this menu item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {currentItem && (
            <div className="py-4">
              <p className="font-medium">{currentItem.name}</p>
              <p className="text-sm text-gray-500">{currentItem.category} - ${currentItem.price}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDeleteItem}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManagement;
