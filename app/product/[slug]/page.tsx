import ProductExtra from "@/components/ProductPage/ProductExtra/ProductExtra";
import ProductPageActions from "@/components/ProductPageActions/ProductPageActions";
import Reviews from "@/components/Reviews/Reviews";
import { Product } from "@/types/products";

async function getData(slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Product = async ({ params }: { params: { slug: string } }) => {
  const product: Product = await getData(params.slug);

  const productSizes = Object.entries(product.size_quantity).map(
    ([key, value]) => {
      return { size: key, quantity: value };
    }
  );

  return (
    <section className="px-14 mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-7">
          <div className="grid grid-cols-2">
            {product.product_images.map((image) => (
              <div className="col-span-1" key={image.id}>
                <img src={image.url} alt="..." width={500} className="p-3" />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 space-y-5 p-2">
          <div>
            <div className="text-2xl font-bold">{product.brand.name}</div>
            <div className="text-4xl text-slate-600">{product.name}</div>
          </div>
          <div>
            <hr />
          </div>
          <div className="text-2xl text-slate-700">₹ {product.price}</div>
          <div>
            <ProductPageActions
              productSizes={productSizes}
              prductSlug={params.slug}
            />
          </div>
          <div>
            <hr />
          </div>
          <ProductExtra />
          <div>
            <hr />
          </div>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
      <hr className="my-16" />
      <Reviews productSlug={params.slug} />
    </section>
  );
};

export default Product;
