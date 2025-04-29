"use client";

import { Product } from "@/types";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { toast } from "sonner";
import { ArrowRight, Eye } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

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

      const cards = containerRef.current.querySelectorAll(".featured-card");
      tl.fromTo(
        cards,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 0.8, 
          ease: "power3.out" 
        },
        "-=0.4"
      );
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  console.log(products);
  return (
    <div ref={containerRef} className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-light">Featured Products</h2>
        <Button variant="outline" className="interactive group">
          <span className="mr-2">View All</span>
          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300 ease-out" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="featured-card group">
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
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <p className="font-light">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}