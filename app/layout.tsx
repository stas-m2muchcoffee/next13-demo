import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";

interface MetaData {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaImage: any;
}

// TODO: add type schema for CMS response
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homePageMeta = await getData();
  const { metaTitle, metaDescription, keywords, metaImage }: MetaData =
    homePageMeta?.data[0]?.attributes?.seo;
  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${metaImage.data.attributes.url}`;

  // TODO: add meta to particular page
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
