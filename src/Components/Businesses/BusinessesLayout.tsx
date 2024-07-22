import { BusinessesLayoutProps } from "../../Types/Businesses.types";

import BusinessesList from "./BusinessesList";
import BussinessItem from "./BussinessItem";

function BusinessesLayout({ businessesList }: BusinessesLayoutProps) {
  return (
    <div className=" h-full">
      <div className="">
        <BusinessesList>
          {businessesList.map((bussiness) => {
            return <BussinessItem key={bussiness._id} bussiness={bussiness} />;
          })}
        </BusinessesList>
      </div>
    </div>
  );
}

export default BusinessesLayout;
