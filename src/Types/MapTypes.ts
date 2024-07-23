export interface LocationPositionI {
  lat: number;
  lng: number;
}
export interface LocationI {
  loaded: boolean;
  position?: LocationPositionI;
  error?: string;
}
