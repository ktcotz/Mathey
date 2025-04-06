import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.string().uuid(),
  type: z.enum(['public', 'teacher', 'admin']),
  email: z.string(),
  avatar_url: z.string().nullable(),
  phone: z.string().nullable(),
  detailsComplete: z.boolean(),
  city: z.string().nullable(),
  street: z.string().nullable(),
  house_number: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  bio: z.string(),
  class: z.enum([
    'another',
    '7th-grade-primary',
    '8th-grade-primary',
    'high-school',
    'technical-school',
  ]),
  level: z.number().default(1),
  xp: z.number().default(0),
});

export type User = z.infer<typeof UserSchema>;
