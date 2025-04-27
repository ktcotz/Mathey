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
  PhoneInput,
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterTeacherFormData,
  RegisterTeacherFormSchema,
} from '../schemas/RegisterTeacherFormSchema';
import { TeacherDTO } from '../../../pages';

type RegisterTeacherFormProps = {
  data: TeacherDTO;
  setupData: (dataToSetup: Partial<TeacherDTO>) => void;
};

export const RegisterTeacherForm = ({
  data,
  setupData,
}: RegisterTeacherFormProps) => {
  const { nextStep } = useStepper();

  const form = useForm<RegisterTeacherFormData>({
    resolver: zodResolver(RegisterTeacherFormSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    },
  });

  const submitHandler = (data: RegisterTeacherFormData) => {
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numer telefonu</FormLabel>
              <FormControl>
                <PhoneInput {...field} defaultCountry="PL" />
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
