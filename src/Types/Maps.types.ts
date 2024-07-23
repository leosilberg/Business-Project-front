import { BussinessI } from "./Businesses.types";

export interface LocationPositionI {
  lat: number;
  lng: number;
}
export interface LocationI {
  loaded: boolean;
  position?: LocationPositionI;
  error?: string;
}

export interface BusinessesMapProps {
  businessesList: BussinessI[] | null;
}
export interface BusinessMarkerI {
  location: LocationPositionI;
  business: BussinessI;
}

//DetailsPage
export interface BusinessMapProps {
  business?: BussinessI;
}
