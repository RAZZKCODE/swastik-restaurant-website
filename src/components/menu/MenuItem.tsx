
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type MenuItemProps = {
  item: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    vegetarian?: boolean;
    spicy?: boolean;
  };
};

const MenuItem = ({ item }: MenuItemProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition duration-300 hover:scale-105"
        />
      </div>
      <div className="md:w-2/3 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold">{item.name}</h3>
          <span className="text-lg font-bold text-spice-600">{item.price}</span>
        </div>
        <div className="flex space-x-2 my-2">
          {item.vegetarian && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Vegetarian
            </span>
          )}
          {item.spicy && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Spicy
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-2 mb-4">{item.description}</p>
        <Button 
          onClick={handleAddToCart} 
          className="bg-restaurant-500 hover:bg-restaurant-600 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
