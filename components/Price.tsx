"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "../common/hooks";

interface PriceProps {
  publicPrice: string;
  productId: string;
}

const Price = ({ publicPrice, productId }: PriceProps) => {
  const [price, setPrice] = useState();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const getPrice = async () => {
      if (token) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ERATI_URL}/products/prices/18200`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response = await res.json();
        setPrice(response.payload[18200][1].Price);
      }
    };
    getPrice();
  }, [token]);

  return (
    <div style={{ display: "flex" }}>
      Price:{" "}
      {token ? (
        <div style={{ display: "flex", marginLeft: "5px" }}>
          <div style={{ textDecoration: "line-through", marginRight: "5px" }}>
            {publicPrice}
          </div>{" "}
          {price}
        </div>
      ) : (
        publicPrice
      )}
    </div>
  );
};

export default Price;
