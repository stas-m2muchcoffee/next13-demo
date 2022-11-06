import { use } from "react";
import Productgroup from "./Productgroup/Productgroup";

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ERATI_URL}/productgroup/${id}`
  );
  const group = await res.json();
  return group;
}

interface CarouselGroupProps {
  id: string;
}

const CarouselGroup = ({ id }: CarouselGroupProps) => {
  const group = use(getData(id));

  return <Productgroup name={group?.payload?.Name} id={group?.payload?.Id} />;
};

export default CarouselGroup;
