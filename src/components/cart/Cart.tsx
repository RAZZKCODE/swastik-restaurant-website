
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  const handleCheckout = () => {
    // This would connect to a payment processor in a real app
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully!",
      duration: 3000,
    });
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Cart Icon Button */}
      <Button 
        variant="outline" 
        className="relative p-2" 
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-restaurant-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-serif font-bold">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                        <p className="mt-1 text-restaurant-600 font-medium">{item.price}</p>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 p-0" 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-6 w-6 p-0" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart Summary */}
                <div className="p-4 border-t">
                  <div className="flex justify-between py-2">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-medium">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-restaurant-500 hover:bg-restaurant-600"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
