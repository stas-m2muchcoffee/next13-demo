import { use } from "react";
import PriceContainer from "./PriceContainer";

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ERATI_URL}/product/${id}`);
  const product = await res.json();
  return product;
}

interface ProductCardProps {
  id: string;
  description: string;
  unitPrice: string;
}

const ProductCard = ({ id, description, unitPrice }: ProductCardProps) => {
  return (
    <div key={id}>
      <div
        style={{
          margin: "20px",
          padding: "20px",
          border: "solid",
          width: "200px",
        }}
      >
        <div style={{ marginBottom: "5px" }}>Desription: {description}</div>
        <PriceContainer publicPrice={unitPrice} productId={id} />
      </div>
    </div>
  );
};

export default ProductCard;
