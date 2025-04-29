"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { toast } from "sonner";
import { gsap } from "@/lib/gsap";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import Image from "next/image";

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        ".product-image",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(
        ".product-details > *",
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out" 
        },
        "-=0.5"
      );
    }
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg product-image">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors duration-200 interactive"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors duration-200 interactive"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden ${
                    index === currentImageIndex ? 'ring-2 ring-black' : ''
                  } interactive`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-details space-y-8">
            <div>
              <h1 className="text-4xl font-light mb-2">{product.name}</h1>
              <p className="text-lg text-muted-foreground capitalize">{product.category}</p>
            </div>

            <div className="text-3xl font-light">
              ${product.price.toFixed(2)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center bg-muted rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-sm hover:bg-secondary transition duration-200 ease-out interactive"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-14 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm hover:bg-secondary transition duration-200 ease-out interactive"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full"
              >
                Add to Cart
              </Button>
            </div>

            <div className="space-y-6 pt-8 border-t">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <ul className="text-muted-foreground space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}