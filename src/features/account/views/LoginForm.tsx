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
  InlineSpinner,
} from '../../../ui';
import { LoginFormData, LoginFormSchema } from '../schemas/LoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../mutations/useLogin';
import { CustomError } from '../../../utils/CustomError';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../../types/shared';

export const LoginForm = () => {
  const { changeForm } = useSwitcher();
  const { login, isLogin, loginError } = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = ({ email, password }: LoginFormData) => {
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate(AppRoutes.Dashboard);
          form.reset();
        },
      },
    );
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
              <FormLabel className="dark:text-gray-300">Email</FormLabel>
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
              <FormLabel className="dark:text-gray-300">Hasło</FormLabel>
              <FormControl>
                <PasswordInput {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!!isLogin}>
          {isLogin ? <InlineSpinner /> : 'Zaloguj się!'}
        </Button>
        {loginError instanceof CustomError && (
          <p
            role="alert"
            className="text-center text-[0.8rem] font-medium text-destructive dark:text-red-300"
          >
            {loginError.generateMessage()}
          </p>
        )}
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
