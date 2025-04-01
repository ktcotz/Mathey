import { z } from 'zod';

export type SubjectsType = 'math' | 'physics' | 'it' | 'programming';

export const subjectsArray = ['math', 'physics', 'it', 'programming'] as const;

export const SubjectsFilterSchema = z.object({
  filter: z.string().optional().default(''),
});

export const SubjectSchema = z.object({
  user_id: z.string(),
  type: z.enum(subjectsArray),
  name: z.string(),
});

export type SubjectFilterSchemaType = z.infer<typeof SubjectsFilterSchema>;
export type SubjectSchemaType = z.infer<typeof SubjectSchema>;
