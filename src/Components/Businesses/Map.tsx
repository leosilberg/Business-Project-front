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
    const abortController = new AbortController();

    async function fetchLocations(
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
        if (loc) setBusinessesMarkers((prev) => [...prev, newMarker]);
      } catch (error: any) {
        if (error.name === "CanceledError") {
          // console.log("Map", "Abort");
          return;
        }
        console.error(error);
      }
    }

    if (businessesList) {
      for (let index = 0; index < businessesList.length; index++) {
        const element = businessesList[index];
        // check about async loop.
        fetchLocations(`${element.city},${element.street}`, element);
      }
    }
    return () => {
      // must clean the state because the useEffect must run twice in order to track the changes in the bussinessList
      setBusinessesMarkers([]);
      abortController.abort();
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
