import { z } from 'zod';

export const AddressSchema = z.object({
  city: z.string().default(''),
  house_number: z.string().default('1'),
  road: z.string().default(''),
  village: z.string().default(''),
  postcode: z.string(),
});

export const DetailsAddressSchema = z.object({
  lon: z.string().transform((val) => Number(val)),
  lat: z.string().transform((val) => Number(val)),
});

export type DetailsOfAddress = z.infer<typeof DetailsAddressSchema>;

export type Address = z.infer<typeof AddressSchema>;
