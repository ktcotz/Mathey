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
    .string()
    .nonempty('Numer domu nie może być pusty')
    .max(10, 'Numer domu nie może mieć więcej niż 10 znaków'),

  postalCode: z
    .string()
    .regex(/^\d{2}\d{3}$/, 'Kod pocztowy musi być w formacie XX-XXX'),

  geolocation: z.boolean().default(false).optional(),
});

export type AddressInfoFormData = z.infer<typeof AddressInfoFormSchema>;
