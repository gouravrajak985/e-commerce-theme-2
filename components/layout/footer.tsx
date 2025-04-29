import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">ELEGANCE</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover modern minimalist fashion for the contemporary woman.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition duration-200 interactive">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition duration-200 interactive">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition duration-200 interactive">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/category/dresses" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Dresses</Link></li>
              <li><Link href="/category/tops" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Tops</Link></li>
              <li><Link href="/category/bottoms" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Bottoms</Link></li>
              <li><Link href="/category/outerwear" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Outerwear</Link></li>
              <li><Link href="/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link href="/customer-care" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Customer Care</Link></li>
              <li><Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Size Guide</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="/our-story" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Our Story</Link></li>
              <li><Link href="/sustainability" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Sustainability</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Careers</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Elegance. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition duration-200 interactive">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}