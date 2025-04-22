export const calculateDistanceBetweenPoints = (
  from: {
    lat: number;
    lon: number;
  },
  to: {
    lat: number;
    lon: number;
  },
): number => {
  const EARTH_RADIUS_KM = 6371;

  const latDifference = degreesToRadians(to.lat - from.lat);
  const lonDifference = degreesToRadians(to.lon - from.lon);

  const a =
    Math.sin(latDifference / 2) ** 2 +
    Math.cos(degreesToRadians(from.lat)) *
      Math.cos(degreesToRadians(to.lat)) *
      Math.sin(lonDifference / 2) ** 2;

  const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * angularDistance;
};

const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
