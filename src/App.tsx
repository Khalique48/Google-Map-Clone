import { useState } from 'react';
import { Coordinates } from './types/map';
import MapView from './components/Map/MapContainer';
import SearchPanel from './components/SearchPanel/SearchPanel';
import { Navigation } from 'lucide-react';

function App() {
  const [origin, setOrigin] = useState<Coordinates | null>(null);
  const [destination, setDestination] = useState<Coordinates | null>(null);
  const [isSelectingOrigin, setIsSelectingOrigin] = useState(true);

  const handleMapClick = (coords: Coordinates) => {
    if (isSelectingOrigin) {
      setOrigin(coords);
      setIsSelectingOrigin(false);
    } else {
      setDestination(coords);
      setIsSelectingOrigin(true);
    }
  };

  const handleSearch = (origin: Coordinates, destination: Coordinates) => {
    setOrigin(origin);
    setDestination(destination);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Navigation className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Maps Clone</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SearchPanel onSearch={handleSearch} />
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">
                {isSelectingOrigin
                  ? "Click on the map to select origin point"
                  : "Click on the map to select destination point"}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-3 h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
            <MapView
              origin={origin}
              destination={destination}
              onMapClick={handleMapClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;