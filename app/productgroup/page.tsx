async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/860`,
    {
      cache: "force-cache",
    }
  );
  const productgroup = await res.json();
  return productgroup;
}

export default async function ProductGroupList() {
  const productgroup = await getData();

  const template = productgroup.payload.Webpage.Template;

  return (
    <>
      <div>Product group</div>
      <div dangerouslySetInnerHTML={{ __html: template }}></div>
    </>
  );
}
