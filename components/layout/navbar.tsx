"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  X,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/providers/cart-provider";
import { gsap } from "@/lib/gsap";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

export function Navbar() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      // Initialize the timeline
      tl.current = gsap.timeline();

      // Animate the menu background
      tl.current.to(menuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate each category item with stagger
      const menuItems = menuRef.current.querySelectorAll(".menu-item");
      tl.current.fromTo(
        menuItems,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2"
      );
    } else if (tl.current) {
      // Reverse the animation when closing
      tl.current.reverse();
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled || searchOpen || menuOpen
          ? "bg-white border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-medium">
          ELEGANCE
        </Link>

        {/* Center Navigation - Hidden on Mobile */}
        <nav className="hidden md:flex space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="interactive"
          >
            {searchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>

          <Link href="/cart" className="interactive relative">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="interactive md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`border-t overflow-hidden transition-all duration-500 ease-in-out ${
          searchOpen ? "h-20" : "h-0"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <Search className="h-5 w-5 mr-2 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Search for products..."
            className="border-none text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {/* Full screen menu - Mobile */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-white z-40 ${
          menuOpen ? "block" : "hidden"
        } opacity-0`}
        style={{ top: "80px" }}
      >
        <div className="container mx-auto px-4 py-10">
          <div className="space-y-6">
            <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </MobileNavLink>
            <MobileNavLink
              href="/collections"
              onClick={() => setMenuOpen(false)}
            >
              Collections
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setMenuOpen(false)}>
              About
            </MobileNavLink>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <div className="grid grid-cols-2 gap-4">
              {PRODUCT_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="menu-item p-4 border rounded-lg hover:bg-muted transition duration-200 interactive"
                  onClick={() => setMenuOpen(false)}
                >
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-light hover:text-primary relative group interactive"
    >
      {children}
      <span className="absolute inset-x-0 -bottom-0.5 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="menu-item flex items-center justify-between text-2xl font-light py-2 border-b border-muted interactive"
      onClick={onClick}
    >
      {children}
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
  );
}