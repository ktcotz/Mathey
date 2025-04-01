import { useAuth } from '../../../account/context/useAuth';
import { Subjects } from '../../../shared/Subjects/Subjects';

export const LessonsSubjects = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">
        Wybierz przedmioty, z których potrzebujesz korepetycji
      </h3>
      <Subjects user={user} />
    </div>
  );
};
