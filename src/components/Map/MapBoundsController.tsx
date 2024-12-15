import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { BENGALURU_BOUNDS } from '../../utils/map';

const MapBoundsController = () => {
  const map = useMap();
  
  useEffect(() => {
    const bounds = [
      [BENGALURU_BOUNDS.south, BENGALURU_BOUNDS.west],
      [BENGALURU_BOUNDS.north, BENGALURU_BOUNDS.east]
    ];
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
  }, [map]);

  return null;
};

export default MapBoundsController;