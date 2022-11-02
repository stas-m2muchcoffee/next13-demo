import ProductsFilter from "../../components/ProductsFilter";
import classes from "./layout.module.css";

export default function ProductGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={classes.layout}>
      <aside className={classes.sidebar}>
        <ProductsFilter />
      </aside>
      <div>{children}</div>
    </div>
  );
}
