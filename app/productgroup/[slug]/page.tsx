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
  params: { slug: string };
}) {
  const parseId = params.slug.split("-")[0];
  const productgroup = await getData(parseId);
  const products: ProductItem[] = productgroup.payload.ProductGroupProducts;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => {
        return <ProductCard id={product.Id} key={product.Id}></ProductCard>;
      })}
    </div>
  );
}
