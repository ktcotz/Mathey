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
  useStepper,
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PersonalInfoFormData,
  PersonalInfoFormSchema,
} from '../schemas/PersonalInfoFormSchema';
import { DetailsFormData } from './MoreDetailsForm';

type PersonalInfoFormProps = {
  data: DetailsFormData;
  setupData: (dataToSetup: Partial<DetailsFormData>) => void;
};

export const PersonalInfoForm = ({
  data: { firstName, lastName, purpose },
  setupData,
}: PersonalInfoFormProps) => {
  const { nextStep } = useStepper();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(PersonalInfoFormSchema),
    defaultValues: {
      firstName,
      lastName,
      purpose,
    },
  });

  const submitHandler = (data: PersonalInfoFormData) => {
    setupData(data);
    nextStep();
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
              <FormLabel>Imię</FormLabel>
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
