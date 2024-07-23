"use client";
import { useEffect, useState } from "react";
import { API_KEY, Map1_ID } from "../../secret";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import useGeoLocation from "../../hooks/useGeoLocation";
import { BussinessI } from "../../Types/Businesses.types";
import axios from "axios";
import { LocationPositionI } from "../../Types/MapTypes";

export interface MapProps {
  businessesList: BussinessI[] | null;
}

export default function MyMap({ businessesList }: MapProps) {
  const { loaded, position, error } = useGeoLocation();
  const [businessesLocations, setBusinessesLocations] = useState<
    LocationPositionI[]
  >([]);

  useEffect(() => {
    async function fetchLocations(address: string) {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
        );
        const loc = data.results[0].geometry.location;
        if (loc) setBusinessesLocations((prev) => [...prev, loc]);
      } catch (error) {
        console.log(error);
      }
    }

    if (businessesList) {
      for (let index = 0; index < businessesList.length; index++) {
        const element = businessesList[index];
        fetchLocations(`${element.city},${element.street}`);
      }
    }
    return () => {
      // must clean the state because the useEffect must run twice in order to track the changes in the bussinessList
      setBusinessesLocations([]);
    };
  }, [businessesList]);

  return (
    <APIProvider apiKey={API_KEY}>
      <div className=" h-full">
        {loaded && !error && (
          <Map zoom={10} center={position} mapId={Map1_ID}>
            {businessesLocations.map((bsLocation, index) => {
              return (
                <AdvancedMarker
                  key={index}
                  position={bsLocation}
                ></AdvancedMarker>
              );
            })}
          </Map>
        )}
      </div>
    </APIProvider>
  );
}
