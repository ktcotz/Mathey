import z from 'zod';

export const ForgotFormSchema = z.object({
  email: z
    .string({ message: 'Adres e-mail jest wymagany.' })
    .email('Niepoprawny adres e-mail, popraw go.')
    .nonempty('Adres e-mail jest wymagany.'),
});

export type ForgotFormData = z.infer<typeof ForgotFormSchema>;
