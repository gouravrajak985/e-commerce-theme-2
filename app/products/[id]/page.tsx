import { FEATURED_PRODUCTS } from "@/lib/constants";
import { ProductClient } from "@/components/product/product-client";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return FEATURED_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = FEATURED_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}