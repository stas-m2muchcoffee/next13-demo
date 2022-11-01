import Nav from "./Nav";

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
      <Nav />
    </div>
  );
};

export default Header;
