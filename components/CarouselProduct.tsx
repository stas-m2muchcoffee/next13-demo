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

  return (
    <>
      <li>{product.payload.Description}</li>
    </>
  );
};

export default CarouselProduct;
