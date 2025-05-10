"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { createCartStore } from "@/hooks/use-cart";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { CheckoutDialog } from "@/components/checkout/checkout-dialog";
import { getSessionData } from '@/lib/utils';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [store, setStore] = useState(() =>
    typeof window !== 'undefined' ? getSessionData() : {}
  );
  console.log('store', store.username);
 const useCart = createCartStore(store.username || 'default');
  
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
 
  useEffect(() => {
    const unsubscribe: () => void = useCart.subscribe((state: { items: Product[] }) => {
      setCartItems(state.items);
    });

    setCartItems(useCart.getState().items);

    return () => unsubscribe();
  }, [useCart]);

  if (!isMounted) {
    return null;
  }
  interface RemoveItemFunction {
    (productId: string): void;
  }

  const onRemove: RemoveItemFunction = (productId) => {
    useCart.getState().removeItem(productId);
  };

const subtotal = cartItems.reduce((total, item) => {
  return total + Number(item.price);
}, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart className="w-24 h-24 text-muted-foreground mb-6" />
        <h2 className="text-3xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-20" ref={cartRef}>
      <h1 className="text-4xl font-light mb-12 mt-12">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-48 h-64 sm:h-48 rounded-md overflow-hidden">
                    <Image
                      src={item.images[0]?.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                      <p className="text-muted-foreground capitalize mb-2">{item.category.name}</p>
                      <p className="text-2xl font-light">${Number(item.price).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6">
                      
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-muted-foreground hover:text-destructive flex items-center text-sm mt-4 sm:mt-0 transition duration-200 interactive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-4 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-24">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setCheckoutOpen(true)}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
            <p className="text-center text-muted-foreground text-sm mt-4">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>

      <CheckoutDialog 
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
      />
    </div>
  );
}