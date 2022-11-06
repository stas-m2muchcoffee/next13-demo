import Link from "next/link";
import classes from "./Productgroup.module.css";

interface ProductGroupProps {
  id: string;
  name: string;
}

const Productgroup = ({ id, name }: ProductGroupProps) => {
  return (
    <>
      <Link href={`/productgroup/${id}`}>
        <div className={classes.container}>
          <div className={classes.groupName}>{name}</div>
        </div>
      </Link>
    </>
  );
};

export default Productgroup;
