import { Marker, useMapEvents } from 'react-leaflet';
import { Coordinates } from '../../types/map';
import { createMarkerIcon } from './icons/createMarkerIcon';

interface LocationMarkersProps {
  origin: Coordinates | null;
  destination: Coordinates | null;
  onMapClick: (coords: Coordinates) => void;
}

const LocationMarkers = ({ origin, destination, onMapClick }: LocationMarkersProps) => {
  const originIcon = createMarkerIcon('#2563eb');
  const destinationIcon = createMarkerIcon('#dc2626');

  useMapEvents({
    click: (e) => {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <>
      {origin && (
        <Marker
          position={[origin.lat, origin.lng]}
          icon={originIcon}
        />
      )}
      {destination && (
        <Marker
          position={[destination.lat, destination.lng]}
          icon={destinationIcon}
        />
      )}
    </>
  );
};

export default LocationMarkers;