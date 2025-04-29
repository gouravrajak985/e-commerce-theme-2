import { FEATURED_PRODUCTS } from "@/lib/constants";
import { ProductClient } from "@/components/product/product-client";
import { notFound } from "next/navigation";
import { FeaturedProducts } from "@/components/home/featured-products";

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

  // Get related products from the same category
  const relatedProducts = FEATURED_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <>
      <ProductClient product={product} />
      <div className="py-20">
      <FeaturedProducts products={FEATURED_PRODUCTS} />
      </div>
    </>
  );
}