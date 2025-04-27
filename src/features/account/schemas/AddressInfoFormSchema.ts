import z from 'zod';

export const AddressInfoFormSchema = z.object({
  street: z
    .string()
    .min(3, 'Ulica musi mieć co najmniej 3 znaki')
    .max(100, 'Ulica nie może mieć więcej niż 100 znaków'),

  city: z
    .string()
    .min(2, 'Miejscowość musi mieć co najmniej 2 znaki')
    .max(100, 'Miejscowość nie może mieć więcej niż 100 znaków'),

  houseNumber: z
    .string({ required_error: 'Numer domu nie może być pusty' })
    .nonempty('Numer domu nie może być pusty')
    .max(10, 'Numer domu nie może mieć więcej niż 10 znaków'),

  postalCode: z
    .string()
    .regex(/^\d{2}\d{3}$/, 'Kod pocztowy musi być w formacie XX-XXX'),

  geolocation: z.boolean().default(false).optional(),

  distance: z
    .union([z.literal('10'), z.literal('20'), z.literal('30'), z.literal('40')])
    .transform((val) => Number(val))
    .optional()
    .default('10'),
});

export type AddressInfoFormData = z.infer<typeof AddressInfoFormSchema>;
