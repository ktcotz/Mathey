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
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddressInfoFormData,
  AddressInfoFormSchema,
} from '../schemas/AddressInfoFormSchema';
import { Fragment } from 'react/jsx-runtime';

export const AddressInfoForm = () => {
  const form = useForm<AddressInfoFormData>({
    resolver: zodResolver(AddressInfoFormSchema),
    defaultValues: {
      city: '',
      postalCode: '',
      street: '',
      geolocation: false,
    },
  });

  const isMapVisible = form.watch('geolocation');

  const submitHandler = (data: AddressInfoFormData) => {
    console.log(data);
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
                />
              </FormControl>
              <Label htmlFor="geolocation">Użyj geolokalizacji</Label>
              <FormMessage />
            </FormItem>
          )}
        />

        {isMapVisible && (
          <div className="aspect-video w-full">
            <CustomMap />
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

        <Button type="submit">Przejdź dalej</Button>
      </form>
    </Form>
  );
};
