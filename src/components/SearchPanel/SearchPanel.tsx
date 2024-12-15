import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Select from "react-select";
import { Coordinates } from "../../types/map";
import Button from "../UI/Button";
import CoordinateInput from "./CoordinateInput";
import { isWithinBengaluruBounds } from "../../utils/map";

interface SearchPanelProps {
  onSearch: (origin: Coordinates, destination: Coordinates) => void;
}

const SearchPanel = ({ onSearch }: SearchPanelProps) => {
  const [origin, setOrigin] = useState({ lat: "", lng: "" });
  const [destination, setDestination] = useState({ lat: "", lng: "" });
  const [error, setError] = useState<string | null>(null);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [originSearch, setOriginSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");

  const fetchLocationSuggestions = async (
    query: string,
    type: "origin" | "destination"
  ) => {
    if (query.length < 3) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();

    if (type === "origin") {
      setOriginSuggestions(data);
    } else {
      setDestinationSuggestions(data);
    }
  };

  useEffect(() => {
    if (originSearch) {
      fetchLocationSuggestions(originSearch, "origin");
    }
  }, [originSearch]);

  useEffect(() => {
    if (destinationSearch) {
      fetchLocationSuggestions(destinationSearch, "destination");
    }
  }, [destinationSearch]);

  const handleOriginSelect = (selectedOption: any) => {
    setOrigin({ lat: selectedOption.lat, lng: selectedOption.lon });
  };

  const handleDestinationSelect = (selectedOption: any) => {
    setDestination({ lat: selectedOption.lat, lng: selectedOption.lon });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const originCoords = { lat: Number(origin.lat), lng: Number(origin.lng) };
    const destCoords = {
      lat: Number(destination.lat),
      lng: Number(destination.lng),
    };

    if (
      !isWithinBengaluruBounds(originCoords) ||
      !isWithinBengaluruBounds(destCoords)
    ) {
      setError("Coordinates must be within Bengaluru bounds");
      return;
    }

    onSearch(originCoords, destCoords);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origin Location Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Origin
          </label>
          <Select
            options={originSuggestions.map((suggestion: any) => ({
              label: suggestion.display_name,
              value: suggestion.place_id,
              lat: suggestion.lat,
              lon: suggestion.lon,
            }))}
            onInputChange={setOriginSearch}
            onChange={handleOriginSelect}
            placeholder="Search for origin"
          />
        </div>

        {/* Destination Location Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <Select
            options={destinationSuggestions.map((suggestion: any) => ({
              label: suggestion.display_name,
              value: suggestion.place_id,
              lat: suggestion.lat,
              lon: suggestion.lon,
            }))}
            onInputChange={setDestinationSearch}
            onChange={handleDestinationSelect}
            placeholder="Search for destination"
          />
        </div>

        {/* Coordinate Input Fields */}
        <CoordinateInput
          label="Origin Coordinates"
          value={origin}
          onChange={setOrigin}
        />
        <CoordinateInput
          label="Destination Coordinates"
          value={destination}
          onChange={setDestination}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Find Route Button */}
        <Button
          type="submit"
          icon={<Search className="w-4 h-4" />}
          className="w-full"
        >
          Find Route
        </Button>
      </form>
    </div>
  );
};

export default SearchPanel;
