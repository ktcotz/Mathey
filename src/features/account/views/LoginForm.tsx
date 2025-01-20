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
  useSwitcher,
  PasswordInput,
} from '../../../ui';
import { LoginFormData, LoginFormSchema } from '../schemas/LoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const LoginForm = () => {
  const { changeForm } = useSwitcher();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const submitHandler = () => {
    console.log('submit');
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
        <Button type="submit">Zaloguj się!</Button>
        <div className="text-center">
          <Button
            variant="link"
            type="button"
            onClick={() => changeForm('forgot')}
          >
            Zapomniałeś hasła?
          </Button>
        </div>
      </form>
    </Form>
  );
};
