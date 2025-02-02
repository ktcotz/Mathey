import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Button,
  InlineSpinner,
  useToast,
  PasswordInput,
} from '../../../ui';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordData,
  ChangePasswordFormSchema,
} from '../schemas/ChangePasswordFormSchema';
import { useUser } from '../queries/useUser';
import { useChange } from '../mutations/useChange';
import { useNavigate } from 'react-router';

export const ChangePasswordForm = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const { toast } = useToast();

  const { change, isChanging } = useChange();

  const form = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const submitHandler = async ({ password }: ChangePasswordData) => {
    change(
      { password },
      {
        onSuccess: () => {
          toast({
            title: 'Pomyślnie zmieniono hasło',
            description:
              'Hasło zostało zmienione, za 3 sekundy zostaniesz przeniesiony do sekcji logowania, zaloguj się już nowym hasłem!',
            duration: 3000,
          });

          setTimeout(() => {
            navigate('/');
          }, 3000);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <div className="mb-2 text-center">
        <p>Resetowanie hasła dla:</p>
        <p className="font-bold">{user?.email}</p>
      </div>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
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

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potwierdź hasło</FormLabel>
              <FormControl>
                <PasswordInput {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!!isChanging}>
          {isChanging ? <InlineSpinner /> : 'Zmień swoje hasło'}
        </Button>
      </form>
    </Form>
  );
};
