import { TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { LocationMarker } from './LocationMarker';
import { MapUpdater } from './MapUpdater';
import { useReverseGeocoding } from './useReverseGeocoding';
import { Address } from './schemas/AddressSchema';

export type MapPosition = {
  lat: number;
  lng: number;
};

type CustomMapProps = {
  position?: MapPosition;
  getMapData: (data: Address) => void;
};

export const CustomMap = ({ position, getMapData }: CustomMapProps) => {
  const [coordinates, setCoordinates] = useState<MapPosition>(
    position ?? { lat: 52.237049, lng: 21.017532 },
  );
  const { reverse, informations, isLoading } = useReverseGeocoding();

  const setupMapCoordinates = (coordinatesClick: MapPosition) => {
    setCoordinates(coordinatesClick);
  };

  useEffect(() => {
    if (informations) {
      getMapData(informations);
    }
  }, [informations, getMapData]);

  useEffect(() => {
    if (coordinates) {
      setCoordinates(coordinates);
      reverse(coordinates);
    }
  }, [reverse, coordinates]);

  useEffect(() => {
    if (position) {
      setCoordinates(position);
      reverse(position);
    }
  }, [position, reverse]);

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full"
    >
      {isLoading && (
        <div className="absolute left-0 top-0 z-[1000] flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="spin h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-[#3498db] ease-linear"></div>
        </div>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater position={coordinates} />
      <LocationMarker
        position={coordinates}
        setupMapCoordinates={setupMapCoordinates}
        informations={informations}
        isLoading={isLoading}
      />
    </MapContainer>
  );
};
