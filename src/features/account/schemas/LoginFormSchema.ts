import z from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string({ message: 'Adres e-mail jest wymagany.' })
    .email('Niepoprawny adres e-mail, popraw go.')
    .nonempty('Adres e-mail jest wymagany.'),
  password: z
    .string({ message: 'Hasło jest wymagane.' })
    .min(6, 'Hasło musi składać się minimum z 6 znaków.')
    .regex(/[A-Z]/, 'Hasło musi zawierać co najmniej jedną dużą literę.')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Hasło musi zawierać co najmniej jeden znak specjalny.',
    )
    .nonempty('Hasło jest wymagane.'),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
