// import { Suspense } from "react";
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

async function getProductGroupData(groupId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/${groupId}`
    // {
    //   cache: "force-cache",
    // }
  );
  const productgroup = await res.json();
  return productgroup;
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
  // const parseId = params.slug.split("-")[0];
  // console.log(111, params.id);

  const productgroup = await getGroupData(params.id);
  const products: ProductItem[] = productgroup?.payload?.ProductGroupProducts;
  // const product = await getData(params?.id);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {/* {params?.id} */}
      {products?.map((product) => {
        return (
          <div key={product.Id} style={{ margin: "10px" }}>
            {product.Id}
          </div>
        );
        // <ProductCard id={product.Id} key={product.Id}></ProductCard>;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const homePage = await getHomePageData();

  const { groups }: { groups: string[] } =
    homePage?.data[0]?.attributes?.components[3];

  return groups?.map((groupId) => ({
    id: String(groupId),
  }));
}
