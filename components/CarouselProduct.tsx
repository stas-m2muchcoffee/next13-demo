import { use } from "react";
import PriceContainer from "./PriceContainer";

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

  return (
    <>
      <li style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "5px" }}>
          Desription: {product.payload.Description}
        </div>
        <PriceContainer
          publicPrice={product.payload.UnitPrice}
          productId={product.payload.Id}
        />
        {/* <div>Price: {product.payload.UnitPrice}</div> */}
      </li>
    </>
  );
};

export default CarouselProduct;
