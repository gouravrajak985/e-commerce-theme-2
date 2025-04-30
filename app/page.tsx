import { Billboard } from "@/components/home/billboard";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Products } from "@/components/home/products";
import { BILLBOARD_IMAGES, FEATURED_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/constants";

import getStore from "@/actions/get-store";
import getBillboard from "@/actions/get-billboard";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";


const Home = async () => {
  const store = await getStore();
  const billboard = await getBillboard(store.homeBillboardId);
  const categories = await getCategories(store.apiUrl);
  const products = await getProducts({ isFeatured: true }, store.apiUrl);
  return (
    <div className="flex flex-col gap-20 pb-20">
      <Billboard billboard={billboard} />
      <Categories categories={categories} />
      <FeaturedProducts products={products} />
    </div>
  );
}

export default Home;