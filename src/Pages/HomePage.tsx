import { Link } from "react-router-dom";
import { Button } from "../Components/ui/button";

function HomePage() {
  return (
    <div className=" bg-[url('/images/hero-layout.avif')] bg-cover bg-center rounded-md overflow-hidden min-h-[90vh] grid grid-rows-3 break-850px:grid-cols-3 ">
      <div className=" px-4 flex flex-col gap-8 row-span-2 col-start-2 col-span-2 justify-self-center	self-center	 ">
        <h1 className=" break-700px:text-5xl text-4xl font-bold text-primary">
          Discover Trustworthy Businesses with ReviewHub
        </h1>
        <div className=" text-xl font-semibold text-white">
          <ul className=" break-700px:list-disc break-700px:px-8 space-y-1">
            <li>
              <p>
                Easily find businesses and read authentic reviews from our
                community.
              </p>
            </li>
            <li className=" hidden break-700px:list-item">
              <p className="">
                Conveniently search for businesses and read trustworthy reviews
                from real users. Add new businesses to help others discover
                great services.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <Button className=" font-semibold">
            <Link to="businesses"> Explore ReviewHub Now!</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
