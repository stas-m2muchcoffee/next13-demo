import Link from "next/link";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        border: "solid",
      }}
    >
      <h1>Header</h1>
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
      >
        Login
      </div>
    </div>
  );
};

export default Header;
