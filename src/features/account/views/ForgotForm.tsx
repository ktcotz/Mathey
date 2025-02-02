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
  InlineSpinner,
  useToast,
} from '../../../ui';

import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotFormData, ForgotFormSchema } from '../schemas/ForgotFormSchema';
import { useForgot } from '../mutations/useForgot';

export const ForgotForm = () => {
  const { forgot, isLoading } = useForgot();
  const { toast } = useToast();

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const submitHandler = async ({ email }: ForgotFormData) => {
    forgot(
      { email },
      {
        onSuccess: () => {
          toast({
            title: 'Email pomyślnie wysłany',
            description:
              'Email z linkiem resetującym hasło został pomyślnie wysłany na podany email.',
          });
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abcd@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!!isLoading}>
          {isLoading ? <InlineSpinner /> : ' Wyślij link do zresetowania hasła'}
        </Button>
      </form>
    </Form>
  );
};
