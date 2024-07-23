"use client";
import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import useGeoLocation from "../../hooks/useGeoLocation";
import { BussinessI } from "../../Types/Businesses.types";
import { BusinessesMapProps, BusinessMarkerI } from "../../Types/Maps.types";
import { useNavigate } from "react-router-dom";
import { BusinessesService } from "../../services/business.service";
import { API_KEY, Map1_ID } from "@/secret";

export default function BusinessesMap({ businessesList }: BusinessesMapProps) {
  const { loaded, position, error } = useGeoLocation();
  const navigate = useNavigate();
  const [businessesMarkers, setBusinessesMarkers] = useState<BusinessMarkerI[]>(
    []
  );
  const [openElementWindow, setOpenElementWindow] = useState({
    open: false,
    elementId: "",
  });

  useEffect(() => {
    async function fetchLocations(
      address: string,
      bussinessElement: BussinessI
    ) {
      try {
        const { loc } = await BusinessesService.getBusinessLocation(address);
        const newMarker: BusinessMarkerI = {
          location: loc,
          business: bussinessElement,
        };
        if (loc) setBusinessesMarkers((prev) => [...prev, newMarker]);
      } catch (error) {
        console.error(error);
      }
    }

    if (businessesList) {
      for (let index = 0; index < businessesList.length; index++) {
        const element = businessesList[index];
        fetchLocations(`${element.city},${element.street}`, element);
      }
    }
    return () => {
      // must clean the state because the useEffect must run twice in order to track the changes in the bussinessList
      setBusinessesMarkers([]);
    };
  }, [businessesList]);

  function moveToBussinessPage(bussinessId: string) {
    navigate(bussinessId);
  }

  function handleOpenMarker(id: string) {
    setOpenElementWindow({ open: true, elementId: id });
  }
  function handleCloseMarker() {
    console.log("closed!");

    setOpenElementWindow({ open: false, elementId: "" });
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <div className=" h-full">
        {!loaded && <p>Loading Map ... </p>}

        {loaded && !error && (
          <Map defaultZoom={9} defaultCenter={position} mapId={Map1_ID}>
            <AdvancedMarker position={position}>
              <div className="h-5 w-5 bg-blue-700 border-2 border-white rounded-full"></div>
            </AdvancedMarker>
            {businessesMarkers.map((bsMarker, index) => {
              if (!bsMarker.location) return null;
              return (
                <div key={index}>
                  <AdvancedMarker
                    onClick={() => {
                      handleOpenMarker(bsMarker.business._id);
                    }}
                    position={bsMarker.location}
                  ></AdvancedMarker>
                  {openElementWindow.open &&
                    openElementWindow.elementId === bsMarker.business._id && (
                      <InfoWindow
                        headerContent={
                          <h2 className="text-base text-primary font-semibold">
                            {bsMarker.business.name}
                          </h2>
                        }
                        className=" text-black max-w-fit"
                        onClose={handleCloseMarker}
                        position={bsMarker.location}
                      >
                        <div
                          className=" cursor-pointer"
                          onClick={() => {
                            moveToBussinessPage(bsMarker.business._id);
                          }}
                        >
                          <p className=" text-sm">
                            {bsMarker.business.city}, {bsMarker.business.street}
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                </div>
              );
            })}
          </Map>
        )}
      </div>
    </APIProvider>
  );
}
