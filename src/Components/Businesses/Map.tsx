"use client";
import { useEffect, useState } from "react";
import { API_KEY } from "../../secret";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import useGeoLocation from "../../hooks/useGeoLocation";
import { BussinessI } from "../../Types/Businesses.types";

export interface MapProps {
  businessesList: BussinessI[] | null;
}

export default function MyMap({ businessesList }: MapProps) {
  const { loaded, position, error } = useGeoLocation();
  // const [businesses]

  return (
    <APIProvider apiKey={API_KEY}>
      <div className=" h-full">
        {loaded && !error && <Map zoom={10} center={position}></Map>}
      </div>
    </APIProvider>
  );
}
