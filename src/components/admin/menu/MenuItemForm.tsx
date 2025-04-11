
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DialogFooter
} from '@/components/ui/dialog';
import { DollarSign, ImageIcon } from 'lucide-react';
import { MenuItem, MenuItemFormValues, menuItemSchema } from './types';

interface MenuItemFormProps {
  onSubmit: (data: MenuItemFormValues) => void;
  onCancel: () => void;
  defaultValues?: MenuItem;
  submitLabel?: string;
}

const MenuItemForm = ({ 
  onSubmit, 
  onCancel, 
  defaultValues,
  submitLabel = "Add Item"
}: MenuItemFormProps) => {
  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      vegetarian: false,
      spicy: false,
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-restaurant-500 hover:bg-restaurant-600">
            {submitLabel}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MenuItemForm;
