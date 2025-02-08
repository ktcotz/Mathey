import { useEffect, useState } from 'react';
import { MapPosition } from './CustomMap';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Address } from './schemas/AddressSchema';
import { motion, AnimatePresence } from 'framer-motion';

type LocationMarkerProps = {
  position?: MapPosition;
  informations?: Address;
  isLoading: boolean;
  setupMapCoordinates: (coordinatesClick: MapPosition) => void;
};

export const LocationMarker = ({
  position,
  setupMapCoordinates,
  informations,
  isLoading,
}: LocationMarkerProps) => {
  const [coordinates, setCoordinates] = useState<MapPosition | null>(null);

  const formattedAddress = informations
    ? `${informations?.city || informations?.village}, ${informations?.road || 'numer'} ${informations?.house_number}`
    : 'Ładowanie danych...';

  useEffect(() => {
    if (position) {
      setCoordinates(position);
    }
  }, [position]);

  const map = useMapEvents({
    click(e) {
      if (isLoading) return;

      map.flyTo(e.latlng, map.getZoom(), { animate: true });
      setupMapCoordinates(e.latlng);
      setCoordinates(e.latlng);
    },
    locationfound(e) {
      setCoordinates(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return coordinates === null ? null : (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Marker position={coordinates}>
          <Popup position={position}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mb-2 font-bold">Wybrana lokalizacja:</h3>
              <span>{formattedAddress}</span>
            </motion.div>
          </Popup>
        </Marker>
      </motion.div>
    </AnimatePresence>
  );
};
