import { z } from 'zod';

export const ProfileUpdaterSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .max(50, 'Imię jest za długie')
    .regex(
      /^[A-Za-zÀ-ÿąęóćłńśźżĄĘÓĆŁŃŚŹŻ-]+$/,
      'Imię może zawierać tylko litery i myślniki',
    ),
  lastName: z
    .string()
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki')
    .max(50, 'Nazwisko jest za długie')
    .regex(
      /^[A-Za-zÀ-ÿąęóćłńśźżĄĘÓĆŁŃŚŹŻ-]+$/,
      'Nazwisko może zawierać tylko litery i myślniki',
    ),

  class: z.string().nonempty('Klasa jest wymagana'),

  bio: z
    .string()
    .max(250, 'Bio musi miec maksymalnie 250 znaków.')
    .default('')
    .optional(),

  distance: z
    .union([z.literal('10'), z.literal('20'), z.literal('30'), z.literal('40')])
    .transform((val) => Number(val))
    .optional(),
});

export type ProfileUpdaterType = z.infer<typeof ProfileUpdaterSchema>;
