"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import Price from "./Price";
import { Suspense } from "react";

interface PriceContainerProps {
  publicPrice: string;
  productId: string;
}

const PriceContainer = ({ publicPrice, productId }: PriceContainerProps) => {
  return (
    <Provider store={store}>
      <Price publicPrice={publicPrice} productId={productId} />
    </Provider>
  );
};

export default PriceContainer;
