"use client";

import { Product } from "@/types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const { addItem } = useCart();
  
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category === activeTab);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        containerRef.current.querySelector("h2"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        containerRef.current.querySelector(".tabs-container"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const productItems = containerRef.current.querySelectorAll(".product-item");
      
      gsap.fromTo(
        productItems,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: "power3.out" 
        }
      );
    }
  }, [activeTab, filteredProducts]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4">
      <h2 className="text-4xl font-light text-center mb-12">Our Collection</h2>
      
      <div className="tabs-container flex justify-center mb-12">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-flow-col">
            <TabsTrigger value="all" className="interactive">All</TabsTrigger>
            {PRODUCT_CATEGORIES.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="interactive"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item group">
            <div className="relative aspect-[3/4] overflow-hidden mb-4">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="rounded-full backdrop-blur-sm bg-white/80"
                    onClick={() => handleAddToCart(product)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </Button>
                  <Link href={`/products/${product.id}`}>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="rounded-full backdrop-blur-sm bg-white/80"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
              <p className="font-light">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}