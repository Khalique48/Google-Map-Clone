import L from 'leaflet';
import { Coordinates } from '../../../types/map';

export const createRoutingControl = (origin: Coordinates, destination: Coordinates) => {
  return L.Routing.control({
    waypoints: [
      L.latLng(origin.lat, origin.lng),
      L.latLng(destination.lat, destination.lng)
    ],
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    lineOptions: {
      styles: [{ color: '#2563eb', weight: 4 }]
    }
  });
};