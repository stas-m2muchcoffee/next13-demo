import Link from "next/link";
import classes from "./page.module.css";

// async function getData() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/860`,
//     {
//       cache: "force-cache",
//     }
//   );
//   const productgroup = await res.json();
//   return productgroup;
// }

export default async function ProductGroupList() {
  // const productgroup = await getData();

  // const template = productgroup.payload.Webpage.Template;

  return (
    <>
      <div>Product group</div>
      {/* <Link href={`/productgroup/${productgroup.payload.Id}`}>
        <div className={classes.container}>
          <div className={classes.groupName}>{productgroup.payload.Name}</div>
        </div>
      </Link> */}
      {/* <div dangerouslySetInnerHTML={{ __html: template }}></div> */}
    </>
  );
}
