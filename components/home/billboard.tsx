"use client";

import type { Billboard } from "@/types";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface BillboardProps {
  billboard: any;
}

export function Billboard({ billboard }: BillboardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const textContent = textRef.current;

      gsap.fromTo(
        textContent.querySelector("h1"),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        textContent.querySelector("button"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-80px)] mt-20 overflow-hidden"
    >
      {/* Single image */}
      <div className="absolute inset-0">
        <Image
          src={billboard.imageUrl}
          alt={billboard.label}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Text content */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-light text-white mb-8">
            {billboard.label}
          </h1>
          <Button className="interactive relative group overflow-hidden text-white hover:text-black transition-colors duration-300" size="lg">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Shop Now</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-colors duration-300 group-hover:text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
}
