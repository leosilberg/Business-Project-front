"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import useGeoLocation from "../../hooks/useGeoLocation";
import { BusinessMapProps, BusinessMarkerI } from "../../Types/Maps.types";
import { API_KEY, Map2_ID } from "@/secret";
import { useEffect, useState } from "react";
import { BusinessesService } from "@/services/business.service";
import { BussinessI } from "@/Types/Businesses.types";

function BusinessMap({ business }: BusinessMapProps) {
  const { loaded, position, error } = useGeoLocation();
  const [businessMarker, setBusinessMarker] = useState<BusinessMarkerI | null>(
    null
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchLocation(
      address: string,
      bussinessElement: BussinessI
    ) {
      try {
        const { loc } = await BusinessesService.getBusinessLocation(
          address,
          abortController
        );
        const newMarker: BusinessMarkerI = {
          location: loc,
          business: bussinessElement,
        };
        if (loc) setBusinessMarker(newMarker);
      } catch (error: any) {
        if (error.name === "CanceledError") {
          console.log("Business Map", "Aborted");
          return;
        }
        console.error(error);
      }
    }

    business && fetchLocation(`${business.city},${business.street}`, business);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <div className="h-full min-h-96">
          {!loaded && <p>Loading Map ... </p>}
          {loaded && !error && (
            <Map defaultZoom={9} defaultCenter={position} mapId={Map2_ID}>
              <AdvancedMarker position={position}>
                <div className=" relative">
                  <div
                    className=" 
                  rounded-full fixed top-0 left-0 right-0 bottom-0 h-6 w-6
                  animate-pulse bg-blue-300 "
                  ></div>
                  <div
                    className="
                    fixed
                    top-1 left-1 right-1 bottom-1
                  z-50 h-4 w-4 bg-blue-700 border-2 border-white rounded-full"
                  ></div>
                </div>
              </AdvancedMarker>
              {businessMarker?.location && (
                <AdvancedMarker
                  position={businessMarker.location}
                ></AdvancedMarker>
              )}
            </Map>
          )}
        </div>
      </APIProvider>
    </>
  );
}

export default BusinessMap;

// {businessesMarkers.map((bsMarker, index) => {
//   if (!bsMarker.location) return null;
//   return (
//     <div key={index}>
//       <AdvancedMarker
//         //   onClick={() => {
//         //     handleOpenMarker(bsMarker.business._id);
//         //   }}
//         position={bsMarker.location}
//       ></AdvancedMarker>
//       {/* {openElementWindow.open &&
//         openElementWindow.elementId === bsMarker.business._id && (
//           <InfoWindow
//             headerContent={
//               <h2 className="text-base text-primary font-semibold">
//                 {bsMarker.business.name}
//               </h2>
//             }
//             className=" text-black max-w-fit"
//             onClose={handleCloseMarker}
//             position={bsMarker.location}
//           >
//             <div
//               className=" cursor-pointer"
//               onClick={() => {
//                 moveToBussinessPage(bsMarker.business._id);
//               }}
//             >
//               <p className=" text-sm">
//                 {bsMarker.business.city},{" "}
//                 {bsMarker.business.street}
//               </p>
//             </div>
//           </InfoWindow>
//         )} */}
//     </div>
//   );
// })}
