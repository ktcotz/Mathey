import z from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const RegisterFormSchema = z.object({
  email: z
    .string({ message: 'Adres e-mail jest wymagany.' })
    .email('Niepoprawny adres e-mail, popraw go.')
    .nonempty('Adres e-mail jest wymagany.'),
  phone: z
    .string({ message: 'Numer telefonu jest wymagany.' })
    .refine((value) => isValidPhoneNumber(value, 'PL'), {
      message: 'Podaj poprawny polski numer',
    }),
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

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
