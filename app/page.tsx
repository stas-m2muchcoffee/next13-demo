import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import CarouselProduct from "../components/CarouselProduct";
import styles from "./page.module.css";

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

// TODO: add type schema for CMS response
async function getData() {
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

export default function Home() {
  const homePage = use(getData());
  const { title, subtitle, buttonTitle, buttonPath, buttonColor }: HeaderImage =
    homePage?.data[0]?.attributes?.components[0];

  // console.log(111, homePage?.data[0]?.attributes?.components[2]);

  const { Title: productCarouselTitle, products }: ProductCarousel =
    homePage?.data[0]?.attributes?.components[2];

  return (
    <>
      <div style={{ marginBottom: "40px" }}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <Link href={buttonPath}>
          <div
            style={{
              padding: 30,
              border: "solid 2px",
              display: "inline-block",
              backgroundColor: buttonColor,
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
    </>
  );
}
