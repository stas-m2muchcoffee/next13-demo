import { Suspense } from "react";
import ProductCard from "../../../components/ProductCard";

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/${id}`
  );
  const productgroup = await res.json();
  return productgroup;
}

interface ProductItem {
  Id: string;
  IsPrimary: boolean;
}

export default async function ProductGroupPage({
  params,
}: {
  params: { id: string };
}) {
  // const parseId = params.slug.split("-")[0];
  console.log(111, params.id);

  const productgroup = await getData(params.id);
  const products: ProductItem[] = productgroup.payload.ProductGroupProducts;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => {
        return <ProductCard id={product.Id} key={product.Id}></ProductCard>;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const productgroupResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/860`
  );

  const productgroup = await productgroupResponse.json();

  const products: ProductItem[] = productgroup.payload.ProductGroupProducts;

  return products.map((product) => ({
    id: String(product.Id),
  }));
}
