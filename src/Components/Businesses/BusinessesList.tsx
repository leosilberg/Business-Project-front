import { ChildrenPropsI } from "../../Types/UserAndAuth.types";

function BusinessesList(props: ChildrenPropsI) {
  const { children } = props;
  return (
    <ul className="justify-items-center h-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 max-w-full">
      {children}
    </ul>
  );
}

export default BusinessesList;
