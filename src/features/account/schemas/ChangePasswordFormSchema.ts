import z from 'zod';

export const ChangePasswordFormSchema = z
  .object({
    password: z
      .string({ message: 'Hasło jest wymagane.' })
      .min(6, 'Hasło musi składać się minimum z 6 znaków.')
      .regex(/[A-Z]/, 'Hasło musi zawierać co najmniej jedną dużą literę.')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Hasło musi zawierać co najmniej jeden znak specjalny.',
      )
      .nonempty('Hasło jest wymagane.'),
    passwordConfirm: z
      .string({ message: 'Hasło jest wymagane.' })
      .min(6, 'Hasło musi składać się minimum z 6 znaków.')
      .regex(/[A-Z]/, 'Hasło musi zawierać co najmniej jedną dużą literę.')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Hasło musi zawierać co najmniej jeden znak specjalny.',
      )
      .nonempty('Hasło jest wymagane.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Hasła się różnią.',
    path: ['passwordConfirm'],
  });

export type ChangePasswordData = z.infer<typeof ChangePasswordFormSchema>;
