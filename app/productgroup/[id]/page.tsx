import Products from "../../../components/Products";

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
  );
  const homePage = await res.json();
  return homePage;
}

async function getProductsData(groupId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/${groupId}/products`
  );
  const products = await res.json();
  return products;
}

export default async function ProductGroupPage({
  params,
}: {
  params: { id: string };
}) {
  const productsData = await getProductsData(params.id);
  const products = productsData?.payload?.results;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Products productsData={products} />
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
