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
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PersonalInfoFormData,
  PersonalInfoFormSchema,
} from '../schemas/PersonalInfoFormSchema';

export const AddressInfoForm = () => {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(PersonalInfoFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      purpose: '',
    },
  });

  const submitHandler = (data: PersonalInfoFormData) => {
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię ADRES!</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twój cel związany z matematyką</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Przejdź dalej</Button>
      </form>
    </Form>
  );
};
