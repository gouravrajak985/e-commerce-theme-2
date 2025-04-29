"use client";

import { Category } from "@/types";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

interface CategoriesProps {
  categories: Category[];
}

export function Categories({ categories }: CategoriesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
        containerRef.current.querySelector("h2"),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      const categoryItems = containerRef.current.querySelectorAll(".category-item");
      tl.fromTo(
        categoryItems,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.8, 
          ease: "power3.out" 
        },
        "-=0.4"
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-4">
      <h2 className="text-4xl font-light text-center mb-16">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="category-item group block relative p-12 border rounded-lg hover:bg-muted transition-colors duration-300 ease-out interactive"
          >
            <div className="flex flex-col items-center text-center">
              <h3 className="text-2xl font-medium mb-4">{category.name}</h3>
              <p className="text-muted-foreground mb-8">{category.description}</p>
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <div className="flex items-center text-sm font-medium">
                <span className="mr-2 relative">
                  Explore
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-current transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300 ease-out" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}