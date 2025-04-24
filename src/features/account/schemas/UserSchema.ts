import { z } from 'zod';

export const BaseUserSchema = z.object({
  user_id: z.string().uuid(),
  type: z.enum(['public', 'teacher', 'admin']),
  email: z.string(),
  avatar_url: z.string().nullable(),
  phone: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});

export const TeacherSchema = BaseUserSchema.extend({
  city: z.string().nullable(),
});

export const AdminSchema = BaseUserSchema.extend({
  street: z.string().nullable(),
});

export const UserSchema = BaseUserSchema.extend({
  detailsComplete: z.boolean(),
  city: z.string().nullable(),
  street: z.string().nullable(),
  house_number: z.string().nullable(),
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
  lat: z.number().nullable(),
  lon: z.number().nullable(),
});

export type User = z.infer<typeof UserSchema>;
export type Teacher = z.infer<typeof TeacherSchema>;
export type Admin = z.infer<typeof AdminSchema>;

export type GeneralUser = User | Teacher | Admin;
export type Role = 'teacher' | 'public' | 'admin';
