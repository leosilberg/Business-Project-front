import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import BusinessesFiltersLayout from "../Components/Businesses/BusinessesFiltersLayout";
import BusinessesLayout from "../Components/Businesses/BusinessesLayout";
import MyMap from "../Components/Businesses/Map";
import PaginationLayout from "../Components/Businesses/PaginationLayout";
import { Card } from "../Components/ui/card";
import { BusinessesService } from "../services/business.service";
import { socket } from "../services/sockets.ts";
import { BussinessI } from "../Types/Businesses.types";

function BusinessesPage() {
  const [businessesList, setBusinessesList] = useState<BussinessI[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const totalPagesRef = useRef<null | number>(null);
  const debouncedSearchParams = useDebounce(searchParams, 400);

  useEffect(() => {
    socket.onAny((eventName, ...args) => {
      if (businessesList.find((business) => business._id === eventName)) {
        setBusinessesList((prev) => {
          return prev.map((business) =>
            business._id === eventName ? args[0] : business
          );
        });
      }
    });
    return () => {
      socket.offAny();
    };
  }, [businessesList]);

  useEffect(() => {
    async function getAllBusinesses() {
      if (searchParams.get("page") && Number(searchParams.get("page")) < 1)
        return;
      try {
        const res = await BusinessesService.getBusinesses(location.search);
        totalPagesRef.current = res.totalPages;
        const businesses = res.data;
        setBusinessesList(businesses);
      } catch (error) {
        console.error(error);
      }
    }
    getAllBusinesses();
  }, [debouncedSearchParams]);
  return (
    <>
      <div className=" grid grid-rows-layout break-700px:grid-cols-2 h-screen gap-y-8 gap-x-2 ">
        <Card className=" border-0 shadow-none min-h-[450px] break-400px:min-h-80 overflow-hidden break-700px:col-span-2">
          <BusinessesFiltersLayout
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setBusinessesList={setBusinessesList}
          />
        </Card>
        <Card className=" border-0 hidden break-700px:block pb-10">
          <MyMap businessesList={businessesList} />
        </Card>
        <Card className=" border-0 pb-10 flex flex-col gap-4">
          <BusinessesLayout businessesList={businessesList} />
          {totalPagesRef.current && (
            <PaginationLayout
              totalPagesRef={totalPagesRef}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          )}
        </Card>
      </div>
    </>
  );
}

export default BusinessesPage;
