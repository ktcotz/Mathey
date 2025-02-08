import { useMap } from 'react-leaflet';
import { MapPosition } from './CustomMap';
import { useEffect } from 'react';

type MapUpdaterProps = {
  position: MapPosition;
};

export const MapUpdater = ({ position }: MapUpdaterProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, map.getZoom(), {
      animate: true,
    });
  }, [position, map]);

  return null;
};
