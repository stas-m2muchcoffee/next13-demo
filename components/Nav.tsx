"use client";

import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import LoginButton from "./LoginButton";

const Nav = () => {
  return (
    // we can't wrap our app by Provider in a usuall way because of context error. I guess because of
    // page by default is server components but redux is a client store. So we could implement Provider
    // only in client components using "use client"
    <Provider store={store}>
      <LoginButton />
    </Provider>
  );
};

export default Nav;
