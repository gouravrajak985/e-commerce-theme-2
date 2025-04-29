"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import Image from "next/image";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState("");
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India"
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { items, subtotal } = useCart();

  const handleContactSubmit = () => {
    if (contact) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // Handle order placement
    console.log('Order placed:', { shippingDetails, items });
    onOpenChange(false);
  };

  const renderContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact">Email or phone number</Label>
            <Input
              id="contact"
              placeholder="Enter your email or phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleContactSubmit}
          >
            Continue to Shipping
          </Button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <form onSubmit={handleShippingSubmit} className="space-y-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={shippingDetails.fullName}
                onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={shippingDetails.email}
                onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={shippingDetails.phone}
                onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                value={shippingDetails.addressLine1}
                onChange={(e) => setShippingDetails({...shippingDetails, addressLine1: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                value={shippingDetails.addressLine2}
                onChange={(e) => setShippingDetails({...shippingDetails, addressLine2: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={shippingDetails.state}
                  onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={shippingDetails.postalCode}
                  onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={shippingDetails.country}
                  onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                  required
                  disabled
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Review Order
          </Button>
        </form>
      );
    }

    return (
      <div className="space-y-6">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mb-2"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Shipping Details</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <p>{shippingDetails.fullName}</p>
              <p>{shippingDetails.email}</p>
              <p>{shippingDetails.phone}</p>
              <p>{shippingDetails.addressLine1}</p>
              {shippingDetails.addressLine2 && <p>{shippingDetails.addressLine2}</p>}
              <p>{`${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.postalCode}`}</p>
              <p>{shippingDetails.country}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Order Summary</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex justify-between font-medium pt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handlePlaceOrder} 
          className="w-full" 
          size="lg"
        >
          Place Order
        </Button>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {renderContent()}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Checkout</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-8 overflow-y-auto">
          {renderContent()}
        </div>
      </DrawerContent>
    </Drawer>
  );
}