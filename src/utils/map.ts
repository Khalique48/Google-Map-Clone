import { Coordinates } from '../types/map';

export const BENGALURU_BOUNDS = {
  north: 13.1,
  south: 12.7,
  east: 77.75,
  west: 77.25,
};


export const BENGALURU_CENTER: Coordinates = {
  lat: 12.923577,
  lng: 77.566691
};

export const isWithinBengaluruBounds = (coords: Coordinates): boolean => {
  return coords.lat >= BENGALURU_BOUNDS.south &&
         coords.lat <= BENGALURU_BOUNDS.north &&
         coords.lng >= BENGALURU_BOUNDS.west &&
         coords.lng <= BENGALURU_BOUNDS.east;
};

export const formatCoordinates = (coords: Coordinates): string => {
  return `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
};