import z from 'zod';

export const PersonalInfoFormSchema = z.object({
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
      'Imię może zawierać tylko litery i myślniki',
    ),

  purpose: z
    .string()
    .min(5, 'Cel powinien mieć co najmniej 5 znaków')
    .max(200, 'Cel jest za długi'),
});

export type PersonalInfoFormData = z.infer<typeof PersonalInfoFormSchema>;
