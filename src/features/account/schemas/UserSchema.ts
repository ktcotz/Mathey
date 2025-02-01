import { z } from 'zod';

export const UserSchema = z.object({
  user_id: z.string().uuid(),
  type: z.enum(['public', 'teacher', 'admin']),
  email: z.string(),
  avatar_url: z.string().nullable(),
  phone: z.string(),
});

export type User = z.infer<typeof UserSchema>;
