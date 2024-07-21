// import { useDebounce } from "@uidotdev/usehooks";

import { useEffect, useState } from "react";
import BusinessesLayout from "../Components/Businesses/BusinessesLayout";
import { Card } from "../Components/ui/card";
import { BussinessI } from "../Types/Businesses.types";
import { businesses } from "../constants";
import BusinessesFiltersLayout from "../Components/Businesses/BusinessesFiltersLayout";

function BusinessesPage() {
  const [businessesList, setBusinessesList] = useState<BussinessI[] | []>([]);

  useEffect(() => {
    setBusinessesList(businesses);
  }, []);
  return (
    <>
      <div className=" grid grid-rows-layout break-700px:grid-cols-2 h-screen gap-y-8 gap-x-2">
        <Card className=" border-0 shadow-none min-h-40 break-700px:col-span-2">
          <BusinessesFiltersLayout />
        </Card>
        <Card className=" hidden break-700px:block">
          <img
            className="h-full w-full"
            src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
            alt=""
          />
        </Card>
        <Card className=" border-0">
          <BusinessesLayout businessesList={businessesList} />
          {/* pagination */}
        </Card>
      </div>
    </>
  );
}

export default BusinessesPage;
