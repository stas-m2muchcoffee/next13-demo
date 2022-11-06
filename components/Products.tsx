"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const Products = ({ productsData }: any) => {
  const [filteredProducts, setfilteredProducts] = useState(null);

  const handleFiltering = async () => {
    const filterStringMock =
      "products?filter=W3sicmFuZ2UiOnsiQXR0cmlidXRlcy5icmVlZHRlLlZhbHVlIjp7Imd0ZSI6NDAsImx0ZSI6NTAsImJvb3N0IjoyfX19LHsidGVybSI6eyJEb05vdFB1Ymxpc2giOmZhbHNlfX1d";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/663/${filterStringMock}`
    );
    const productsData = await res.json();
    setfilteredProducts(productsData?.payload?.results);
  };

  const handleCheck = (param: any) => {
    if (param.target.checked) {
      handleFiltering();
    } else {
      setfilteredProducts(null);
    }
  };

  const products = filteredProducts ?? productsData;

  return (
    <>
      <div style={{ width: "100%" }}>
        <label>
          <input type="checkbox" onClick={handleCheck} />
          Filter
        </label>
      </div>
      {products?.map((product: any) => {
        return (
          <ProductCard
            id={product.Id}
            description={product.Description}
            unitPrice={product.UsnitPrice}
            key={product.Id}
          />
        );
      })}
    </>
  );
};

export default Products;
