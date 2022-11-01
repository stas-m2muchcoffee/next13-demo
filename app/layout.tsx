import { use } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import "./globals.css";

async function getData() {
  const qs = require("qs");
  const query = qs.stringify(
    {
      populate: ["seo", "seo.metaImage"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?${query}`
  );
  const homePageMeta = await res.json();
  return homePageMeta;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homePageMeta = use(getData());
  const { metaTitle, metaDescription, keywords, metaImage } =
    homePageMeta?.data[0]?.attributes?.seo;
  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${metaImage.data.attributes.url}`;

  return (
    <html lang="en">
      <head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href={imageUrl} />
      </head>
      <body>
        <header>
          <Header />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
