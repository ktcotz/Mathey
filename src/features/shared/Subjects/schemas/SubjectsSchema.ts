import { z } from 'zod';
import { UserSchema } from '../../../account/schemas/UserSchema';

export type SubjectsType = 'math' | 'physics' | 'it' | 'programming';
export type SubjectsLocation = 'home' | 'online';

export const subjectsArray = ['math', 'physics', 'it', 'programming'] as const;
export const subjectsLocation = ['home', 'online'] as const;

export const SubjectsFilterSchema = z.object({
  filter: z.string().optional().default(''),
});

export const SubjectSchema = z.object({
  user_id: z.string(),
  type: z.enum(subjectsArray),
});

export const TeacherSubjectSchema = z.object({
  teacher_id: UserSchema,
  subject: z.enum(subjectsArray),
  price: z.number(),
  location: z.enum(subjectsLocation),
});

export const TeachersSubjectsSchema = z.array(TeacherSubjectSchema);

export type SubjectFilterSchemaType = z.infer<typeof SubjectsFilterSchema>;
export type SubjectSchemaType = z.infer<typeof SubjectSchema>;
export type TeacherSubjectSchema = z.infer<typeof TeacherSubjectSchema>;
export type TeachersSubjects = z.infer<typeof TeachersSubjectsSchema>;
