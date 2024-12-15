import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import { Coordinates } from '../../types/map';
import L from 'leaflet';
import { createRoutingControl } from './utils/routingControl';

interface RouteLayerProps {
  origin: Coordinates;
  destination: Coordinates;
}

const RouteLayer = ({ origin, destination }: RouteLayerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !origin || !destination) return;

    const routingControl = createRoutingControl(origin, destination);
    routingControl.addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, origin, destination]);

  return null;
};

export default RouteLayer;