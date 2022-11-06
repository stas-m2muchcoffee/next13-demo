// import { Suspense } from "react";
import ProductCard from "../../../components/ProductCard";

import PriceContainer from "../../../components/PriceContainer";
import Products from "../../../components/Products";
// import ProductCard from "../../../components/ProductCard";

async function getGroupData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/${id}`,
    {
      cache: "force-cache",
    }
  );
  const productgroup = res.json();
  return productgroup;
}

async function getHomePageData() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: ["components"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?${query}`
    // {
    //   cache: "force-cache",
    // }
  );
  const homePage = await res.json();
  return homePage;
}

async function getProductsData(groupId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/${groupId}/products`
    // {
    //   cache: "force-cache",
    // }
  );
  const products = await res.json();
  return products;
}

// export async function generateStaticParams({ params }: any) {
//   console.log(111, params);
//   const productgroupResponse = await fetch(
//     `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/860`
//   );

//   const productgroup = await productgroupResponse?.json();

//   const products: ProductItem[] = productgroup?.payload?.ProductGroupProducts;

//   // console.log(111, products);
//   return products.map((product) => ({
//     id: String(product.Id),
//   }));
// }

// async function getData(id: string) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_ERATI_URL}/product/${id}`);
//   const product = res.json();
//   return product;
// }

interface ProductItem {
  Id: string;
  IsPrimary: boolean;
}

export default async function ProductGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const productsData = await getProductsData(params.id);
  const products = productsData?.payload?.results;

  // console.log(111, products.payload.results);

  // const products: ProductItem[] = productgroup?.payload?.ProductGroupProducts;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Products productsData={products} />
      {/* {products.map((product: any) => {
        return (
          <ProductCard
            id={product.Id}
            description={product.Description}
            unitPrice={product.UsnitPrice}
            key={product.Id}
          />
        );
      })} */}
    </div>
  );
}

export async function generateStaticParams() {
  const homePage = await getHomePageData();

  const { groups }: { groups: string[] } =
    homePage?.data[0]?.attributes?.components[3];
  groups.push("663");

  return groups?.map((groupId) => ({
    id: String(groupId),
  }));
}
