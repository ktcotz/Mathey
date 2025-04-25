import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Button,
  InputOTP,
  InputOTPSeparator,
  InputOTPGroup,
  InputOTPSlot,
  Label,
  Checkbox,
  CustomMap,
  useStepper,
  useLocation,
  InlineSpinner,
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddressInfoFormData,
  AddressInfoFormSchema,
} from '../schemas/AddressInfoFormSchema';
import { Fragment } from 'react/jsx-runtime';

import { Address } from '../../../ui/CustomMap/schemas/AddressSchema';
import { DetailsFormData } from './MoreDetailsForm';
import { useUpdateProfile } from '../mutations/useUpdateProfile';
import { useAuth } from '../context/useAuth';
import { getAddressDetails } from '../../../ui/CustomMap/services/services';
import { SelectValue } from '@radix-ui/react-select';

type AddressInfoFormProps = {
  data: DetailsFormData;
};

export const AddressInfoForm = ({ data }: AddressInfoFormProps) => {
  const { user } = useAuth();
  const { previousStep } = useStepper();
  const { getLocation, isLoading, position } = useLocation();
  const { isUpdating, updateProfile } = useUpdateProfile({
    userID: user!.user_id,
  });

  const getMapData = ({
    city,
    house_number,
    road,
    village,
    postcode,
  }: Address) => {
    form.setValue('city', city || village);
    form.setValue('houseNumber', house_number);
    form.setValue('street', road);
    form.setValue('postalCode', postcode.replace('-', ''));
  };

  const form = useForm<AddressInfoFormData>({
    resolver: zodResolver(AddressInfoFormSchema),
    defaultValues: {
      city: '',
      postalCode: '',
      houseNumber: '',
      street: '',
      geolocation: false,
      distance: 10,
    },
  });

  const { city, houseNumber, postalCode, street } = form.getValues();

  const areAddressFieldsFilled = !!(
    city.trim() &&
    street.trim() &&
    houseNumber.trim() &&
    postalCode.length === 5
  );

  const isMapVisible = form.watch('geolocation');

  // console.log(areAddressFieldsFilled);

  const submitHandler = async ({
    city,
    houseNumber,
    postalCode,
    street,
    distance,
  }: AddressInfoFormData) => {
    const details = await getAddressDetails({
      city,
      houseNumber,
      postalCode,
      street,
      distance,
    });

    if (!details) return;

    const fullData = {
      city,
      houseNumber,
      street,
      postalCode,
      ...data,
      lon: details.lon,
      lat: details.lat,
      distance: Number(distance),
    };

    updateProfile({ ...fullData, userID: user!.user_id });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="geolocation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  id="geolocation"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-describedby="geolocation-description"
                />
              </FormControl>
              <Label htmlFor="geolocation">Użyj geolokalizacji</Label>
              <span
                id="geolocation-description"
                className="sr-only"
                aria-live="polite"
              >
                {field.value
                  ? 'Geolokalizacja włączona. Mapa zostanie użyta do wypełnienia danych adresowych.'
                  : 'Geolokalizacja wyłączona. Wprowadź adres ręcznie.'}
              </span>
              <FormMessage />
            </FormItem>
          )}
        />

        {isMapVisible && (
          <div className="flex flex-col gap-2">
            <div className="aspect-video w-full">
              <CustomMap position={position} getMapData={getMapData} />
            </div>
            {!position && (
              <Button
                type="button"
                disabled={!!isLoading}
                onClick={() => getLocation()}
              >
                Pobierz moją lokalizację
              </Button>
            )}
          </div>
        )}

        {!isMapVisible && (
          <Fragment>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miejscowość</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulica</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer domu</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kod pocztowy</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={5} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Fragment>
        )}

        {areAddressFieldsFilled && (
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dystans pobierania korepetytorów</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Wybierz do jakiej maksymalnie długości mamy szukać korepetycji" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dystans</SelectLabel>
                        <SelectItem value="10">10km</SelectItem>
                        <SelectItem value="20">20km</SelectItem>
                        <SelectItem value="30">30km</SelectItem>
                        <SelectItem value="40">40km</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-center justify-between">
          <Button type="button" onClick={previousStep}>
            Wstecz
          </Button>
          <Button type="submit" disabled={!!isUpdating}>
            {isUpdating ? <InlineSpinner /> : 'Zaktualizuj profil'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
