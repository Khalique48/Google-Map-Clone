export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  coordinates: Coordinates;
  address?: string;
}

export interface Route {
  origin: Location;
  destination: Location;
  waypoints?: Location[];
  distance?: number;
  duration?: number;
}