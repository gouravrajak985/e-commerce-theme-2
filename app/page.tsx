import { Billboard } from "@/components/home/billboard";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Products } from "@/components/home/products";
import { BILLBOARD_IMAGES, FEATURED_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Billboard images={BILLBOARD_IMAGES} />
      <Categories categories={PRODUCT_CATEGORIES} />
      <FeaturedProducts products={FEATURED_PRODUCTS} />
      <Products products={FEATURED_PRODUCTS} />
    </div>
  );
}