
import * as z from 'zod';

// Define the menu item type
export type MenuItem = {
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
export const menuItemSchema = z.object({
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

export type MenuItemFormValues = z.infer<typeof menuItemSchema>;

// Sample menu data
export const initialMenuItems: MenuItem[] = [
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
