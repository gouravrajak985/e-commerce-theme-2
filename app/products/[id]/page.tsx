
import { ProductClient } from "@/components/product/product-client";
import { notFound } from "next/navigation";
import { FeaturedProducts } from "@/components/home/featured-products";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import getStore from "@/actions/get-store";

interface ProductPageProps {
  params: { id: string };
}
export async function generateStaticParams() {
  const store = await getStore(); // this must return the store object with apiUrl
  const products = await getProducts(store.apiUrl); // this must return ALL products you want prebuilt
  return products.map((product: any) => ({
    id: product.id.toString(), // make sure it's a string
  }));
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const store = await getStore();

  if (!params.id) {
    notFound();
  }

  const product = await getProduct(params.id);
  console.log("Product:", product); // Debugging line
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getProducts({ isFeatured: true }, store.apiUrl);

  return (
    <>
      <ProductClient product={product} />
      <div className="py-20">
        <FeaturedProducts products={relatedProducts} />
      </div>
    </>
  );
};

export default ProductPage;
