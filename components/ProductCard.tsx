import { use } from "react";
import PriceContainer from "./PriceContainer";

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_ERATI_URL}/product/${id}`);
  const product = await res.json();
  return product;
}

interface ProductCardProps {
  id: string;
}

const ProductCard = ({ id }: ProductCardProps) => {
  const product = use(getData(id));

  return (
    <div>
      <div
        style={{
          margin: "20px",
          padding: "20px",
          border: "solid",
          width: "200px",
        }}
      >
        <div style={{ marginBottom: "5px" }}>
          Desription: {product.payload.Description}
        </div>
        <PriceContainer
          publicPrice={product.payload.UnitPrice}
          productId={product.payload.Id}
        />
      </div>
    </div>
  );
};

export default ProductCard;
