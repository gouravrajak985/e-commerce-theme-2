"use client";

import { BillboardImage } from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface BillboardProps {
  images: BillboardImage[];
}

export function Billboard({ images }: BillboardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Set up auto-sliding timer
    if (!isHovering) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }

    // Clean up timer
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, images.length, isHovering]);

  useEffect(() => {
    if (textRef.current) {
      const textContent = textRef.current;
      
      gsap.fromTo(
        textContent.querySelector("h1"),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      
      gsap.fromTo(
        textContent.querySelector("p"),
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
      
      gsap.fromTo(
        textContent.querySelector("button"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power3.out" }
      );
    }
  }, [currentIndex]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-[calc(100vh-80px)] mt-20 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image slides */}
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
        </div>
      ))}

      {/* Text content */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-light text-white mb-4">
            {images[currentIndex].title}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8">
            {images[currentIndex].subtitle}
          </p>
          <Button className="interactive relative group overflow-hidden" size="lg">
            <span className="relative z-10">Shop Now</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:text-black transition-colors duration-300" />
          </Button>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-8 rounded-full transition-colors duration-300 interactive ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}