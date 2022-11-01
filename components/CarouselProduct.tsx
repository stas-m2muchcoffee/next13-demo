import { use } from "react";

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ERATI_URL}/product/${id}`);
  const product = await res.json();
  return product;
}

interface CarouselProductProps {
  id: string;
}

const CarouselProduct = ({ id }: CarouselProductProps) => {
  const product = use(getData(id));

  console.log(111, product.payload);
  return (
    <>
      <li style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "5px" }}>
          Desription: {product.payload.Description}
        </div>
        <div>Price: {product.payload.UnitPrice}</div>
      </li>
    </>
  );
};

export default CarouselProduct;
