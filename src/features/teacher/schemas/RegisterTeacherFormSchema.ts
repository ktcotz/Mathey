import z from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const RegisterTeacherFormSchema = z.object({
  phone: z
    .string({ message: 'Numer telefonu jest wymagany.' })
    .refine((value) => isValidPhoneNumber(value, 'PL'), {
      message: 'Podaj poprawny polski numer',
    }),
  firstName: z
    .string({ message: 'Imię jest wymagane.' })
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .max(50, 'Imię jest za długie')
    .regex(
      /^[A-Za-zÀ-ÿąęóćłńśźżĄĘÓĆŁŃŚŹŻ-]+$/,
      'Imię może zawierać tylko litery i myślniki',
    ),

  lastName: z
    .string({ message: 'Nazwisko jest wymagane.' })
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .max(50, 'Nazwisko jest za długie')
    .regex(
      /^[A-Za-zÀ-ÿąęóćłńśźżĄĘÓĆŁŃŚŹŻ-]+$/,
      'Nazwisko może zawierać tylko litery i myślniki',
    ),
});

export type RegisterTeacherFormData = z.infer<typeof RegisterTeacherFormSchema>;
