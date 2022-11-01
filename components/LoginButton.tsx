"use client";

import { useAppDispatch, useAppSelector } from "../common/hooks";
import { login, logOut } from "../redux/auth.slice";

const LoginButton = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const handleAuth = () => {
    dispatch(token ? logOut() : login());
  };
  return (
    <div
      style={{
        padding: "10px 30px",
        border: "solid 2px",
        backgroundColor: "lightBlue",
        maxHeight: "60px",
        cursor: "pointer",
        marginLeft: "50px",
        borderRadius: "10px",
      }}
      onClick={handleAuth}
    >
      {token ? "Logout" : "Login"}
    </div>
  );
};

export default LoginButton;
