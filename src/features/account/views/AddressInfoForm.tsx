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
    },
  });

  const isMapVisible = form.watch('geolocation');

  const submitHandler = ({
    city,
    houseNumber,
    postalCode,
    street,
  }: AddressInfoFormData) => {
    const fullData = {
      city,
      houseNumber,
      street,
      postalCode,
      ...data,
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
