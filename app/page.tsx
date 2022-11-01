import Image from "next/image";
import { use } from "react";
import styles from "./page.module.css";

// TODO: add type schema for response
async function getData() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: ["components"],
    },
    {
      encodeValuesOnly: true, // prettify URL
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

  return (
    <>
      <div>This is body</div>;
    </>
  );
}
