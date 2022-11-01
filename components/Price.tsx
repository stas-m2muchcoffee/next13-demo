"use client";

import { use } from "react";
import { useAppDispatch, useAppSelector } from "../common/hooks";

async function getData(token: string, productId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/product/prices/${productId}`
  );
  const price = await res.json();
  return price;
}

interface PriceProps {
  publicPrice: string;
  productId: string;
}

const Price = ({ publicPrice, productId }: PriceProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  // const price = use(getData(token, productId));

  return <div>Price: {token ? 555 : publicPrice}</div>;
};

export default Price;
