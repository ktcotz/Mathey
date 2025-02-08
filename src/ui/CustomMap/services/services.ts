import { MapPosition } from '../CustomMap';
import { AddressSchema } from '../schemas/AddressSchema';

export const getMyLocation = (): Promise<MapPosition> => {
  if (!navigator.geolocation) {
    throw new Error(
      'Geolokalizacja nie jest obsługiwana przez tą przeglądarkę.',
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
      (error) => {
        if (error.PERMISSION_DENIED) {
          reject(new Error('Nie zezwoliłeś na pobranie twojej lokalizacji.'));
        }

        if (error.TIMEOUT) {
          reject(new Error('Czas na zezwolenie minął, spróbuj ponownie.'));
        }

        if (error.POSITION_UNAVAILABLE) {
          reject(
            new Error('Nie możemy pobrać twojej lokalizacji, spróbuj ponownie'),
          );
        }

        reject(
          new Error(
            `Wystąpił błąd podczas pobierania lokalizacji : ${error.message}`,
          ),
        );
      },
    );
  });
};

export const reverseGeocoding = async ({ lat, lng }: MapPosition) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );

    if (!response.ok) {
      throw new Error('Nie udało się pobrać dokładnych danych.');
    }

    const data = await response.json();

    if (!data?.address) {
      throw new Error('Brak danych o adresie.');
    }

    const parsed = AddressSchema.safeParse(data.address);

    if (parsed.error) {
      throw new Error('Błąd w przetwarzaniu danych!');
    }

    return parsed.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
