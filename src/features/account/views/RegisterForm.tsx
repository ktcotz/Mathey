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
  PasswordInput,
  InlineSpinner,
  PhoneInput,
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomError } from '../../../utils/CustomError';
import {
  RegisterFormData,
  RegisterFormSchema,
} from '../schemas/RegisterFormSchema';
import { useRegister } from '../mutations/useRegister';
import { useMail } from '../../mail/useMail';

export const RegisterForm = () => {
  const { register, isRegistering, registerError } = useRegister();
  const { mail, isSending } = useMail();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
      phone: '',
    },
  });

  const submitHandler = (data: RegisterFormData) => {
    register(data, {
      onSuccess: () => {
        mail({
          to: data.email,
          template: 'welcome',
          content: {
            email: data.email,
          },
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abcd@gmail.com" {...field} />
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <PasswordInput {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!!isRegistering || !!isSending}>
          {isRegistering || isSending ? <InlineSpinner /> : 'Zarejestruj się!'}
        </Button>
        {registerError instanceof CustomError && (
          <p
            role="alert"
            className="text-center text-[0.8rem] font-medium text-destructive"
          >
            {registerError.generateMessage()}
          </p>
        )}
      </form>
    </Form>
  );
};
