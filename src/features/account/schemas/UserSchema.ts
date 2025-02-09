import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.string().uuid(),
  type: z.enum(['public', 'teacher', 'admin']),
  email: z.string(),
  avatar_url: z.string().nullable(),
  phone: z.string(),
  detailsComplete: z.boolean(),
  city: z.string().nullable(),
  street: z.string().nullable(),
  house_number: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
