"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartRef.current) {
      const elements = cartRef.current.querySelectorAll('.cart-item');
      
      gsap.from(elements, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart className="w-24 h-24 text-muted-foreground mb-6" />
        <h2 className="text-3xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-20" ref={cartRef}>
      <h1 className="text-4xl font-light mb-12">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item flex flex-col sm:flex-row border-b pb-8">
                <div className="relative w-full sm:w-36 h-48 sm:h-36 mb-4 sm:mb-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 sm:ml-8 flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.category}</p>
                    <p className="text-lg font-light mt-1">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between mt-4 sm:mt-0">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 border flex items-center justify-center text-sm hover:bg-secondary transition duration-200 ease-out"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 border flex items-center justify-center text-sm hover:bg-secondary transition duration-200 ease-out"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground hover:text-destructive flex items-center text-sm mt-3 sm:mt-auto transition duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
            <p className="text-center text-muted-foreground text-sm mt-4">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}