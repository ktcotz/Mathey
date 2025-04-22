import { supabase } from '../../../../lib';
import { CustomError } from '../../../../utils/CustomError';
import { User } from '../../../account/schemas/UserSchema';
import { TeachersSubjectsSchema } from '../schemas/SubjectsSchema';
import { calculateDistanceBetweenPoints } from '../utils/getDistanceFromLatLonInKm';

export const getAllSubjects = async (user: User) => {
  const { data: teacher_subjects, error } = await supabase
    .from('teacher_subjects')
    .select('*,teacher_id(*)')
    .eq('location', 'online');

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const subjects = TeachersSubjectsSchema.parse(teacher_subjects);

  const nearbyTeachers = subjects.filter((subject) => {
    const teacher = subject.teacher_id;
    if (subject.location === 'online') return true;
    if (!teacher?.lon || !teacher?.lat || !user?.lat || !user?.lon)
      return false;

    const distance = calculateDistanceBetweenPoints(
      { lat: user.lat, lon: user.lon },
      { lat: teacher.lat, lon: teacher.lon },
    );

    return distance <= 20;
  });

  const uniqueSubjects = [
    ...new Set(nearbyTeachers.map((subject) => subject.subject)),
  ];

  return uniqueSubjects;
};
