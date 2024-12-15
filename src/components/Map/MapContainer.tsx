import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Coordinates } from '../../types/map';
import { BENGALURU_CENTER } from '../../utils/map';
import MapBoundsController from './MapBoundsController';
import RouteLayer from './RouteLayer';
import LocationMarkers from './LocationMarkers';

interface MapViewProps {
  origin: Coordinates | null;
  destination: Coordinates | null;
  onMapClick: (coords: Coordinates) => void;
}

const MapView = ({ origin, destination, onMapClick }: MapViewProps) => {
  return (
    <MapContainer
      center={[BENGALURU_CENTER.lat, BENGALURU_CENTER.lng]}
      zoom={12}
      className="h-full w-full"
      style={{ minHeight: '500px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBoundsController />
      <LocationMarkers
        origin={origin}
        destination={destination}
        onMapClick={onMapClick}
      />
      {origin && destination && (
        <RouteLayer origin={origin} destination={destination} />
      )}
    </MapContainer>
  );
};

export default MapView;