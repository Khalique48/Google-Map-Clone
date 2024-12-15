import Input from '../UI/Input';
import { Coordinates } from '../../types/map';

interface CoordinateInputProps {
  label: string;
  value: { lat: string; lng: string };
  onChange: (coords: { lat: string; lng: string }) => void;
}

const CoordinateInput = ({ label, value, onChange }: CoordinateInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Latitude"
          step="any"
          value={value.lat}
          onChange={(e) => onChange({ ...value, lat: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Longitude"
          step="any"
          value={value.lng}
          onChange={(e) => onChange({ ...value, lng: e.target.value })}
        />
      </div>
    </div>
  );
};

export default CoordinateInput;