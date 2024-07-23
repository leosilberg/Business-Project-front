"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import useGeoLocation from "../../hooks/useGeoLocation";
import { BusinessMapProps } from "../../Types/Maps.types";
import { API_KEY, Map2_ID } from "../../secret";
import { Button } from "../ui/button";

function BusinessMap({ business }: BusinessMapProps) {
  const { loaded, position, error } = useGeoLocation();

  return (
    <>
      <APIProvider apiKey={API_KEY}>
        <Button
          onClick={() => {
            console.log(position, business);
          }}
        ></Button>
        <div className=" h-full">
          {!loaded && <p>Loading Map ... </p>}
          {loaded && !error && (
            <Map defaultZoom={9} defaultCenter={position} mapId={Map2_ID}>
              {/* <AdvancedMarker position={position}>
                <div className="h-5 w-5 bg-blue-700 border-2 border-white rounded-full"></div>
              </AdvancedMarker> */}
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
