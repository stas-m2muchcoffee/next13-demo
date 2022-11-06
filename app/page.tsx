import Link from "next/link";
import CarouselGroup from "../components/CarouselGroup";
import CarouselProduct from "../components/CarouselProduct";

interface HeaderImage {
  title: string;
  subtitle: string;
  buttonTitle: string;
  buttonPath: string;
  buttonColor: string;
}

interface ProductCarousel {
  Title: string;
  products: string[];
}

interface ProductgroupCarousel {
  groups: string[];
}

// TODO: add type schema for CMS response
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

export default async function Home() {
  const homePage = await getHomePageData();
  const { title, subtitle, buttonTitle, buttonPath, buttonColor }: HeaderImage =
    homePage?.data[0]?.attributes?.components[0];

  const { Title: productCarouselTitle, products }: ProductCarousel =
    homePage?.data[0]?.attributes?.components[2];

  const { groups }: ProductgroupCarousel =
    homePage?.data[0]?.attributes?.components[3];
  groups.push("663");

  return (
    <div style={{ padding: "0 30px" }}>
      <div style={{ marginBottom: "60px", textAlign: "center" }}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <Link href={buttonPath}>
          <div
            style={{
              padding: 30,
              border: "solid 2px",
              display: "inline-block",
              backgroundColor: buttonColor,
              borderRadius: "10px",
            }}
          >
            {buttonTitle}
          </div>
        </Link>
      </div>
      <div>
        <h2>{productCarouselTitle}</h2>
        <ul>
          {products.map((productId) => (
            <CarouselProduct id={productId} key={productId} />
          ))}
        </ul>
      </div>
      <div>
        <h2>Populaire Productgroepen</h2>
        <div style={{ display: "flex" }}>
          {groups.map((groupId) => (
            <CarouselGroup id={groupId} key={groupId} />
          ))}
        </div>
      </div>
    </div>
  );
}
