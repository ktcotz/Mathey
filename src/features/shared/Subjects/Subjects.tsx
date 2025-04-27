import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '../../../ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SubjectFilterSchemaType,
  subjectsArray,
  SubjectSchemaType,
  SubjectsFilterSchema,
} from './schemas/SubjectsSchema';
import { useEffect, useState } from 'react';
import { User } from '../../account/schemas/UserSchema';
import { SUBJECTS_NAMES } from './constants';
import { SubjectBadge } from './SubjectBadge';
import { useGetAllSubjects } from './queries/useGetAllSubjects';
import { SubjectsSkeleton } from './SubjectsSkeleton';

type SubjectsProps = {
  user: User;
};

export const Subjects = ({ user }: SubjectsProps) => {
  const { data: allSubjects, isLoading } = useGetAllSubjects(user);

  const form = useForm<SubjectFilterSchemaType>({
    resolver: zodResolver(SubjectsFilterSchema),
  });

  const subjectFilter = form.watch('filter');
  const [debouncedFilter, setDebouncedFilter] = useState(subjectFilter);
  const [tempSubjects] = useState<SubjectSchemaType[]>(() => {
    return subjectsArray.map((subject) => ({
      user_id: user.user_id,
      type: subject,
      name: SUBJECTS_NAMES[subject],
    }));
  });

  const [filteredSubject, setFilteredSubjects] = useState<SubjectSchemaType[]>(
    [],
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(subjectFilter);
    }, 300);

    return () => clearTimeout(handler);
  }, [subjectFilter]);

  useEffect(() => {
    setFilteredSubjects(
      tempSubjects.filter((subject) =>
        SUBJECTS_NAMES[subject.type]
          .toLowerCase()
          .includes(debouncedFilter?.toLowerCase()),
      ),
    );
  }, [debouncedFilter, tempSubjects]);

  const submitHandler = () => {
    console.log(filteredSubject);
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="max-w-xl">
          <FormField
            control={form.control}
            name="filter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Przedmioty</FormLabel>
                <FormControl>
                  <Input placeholder="Wyszukaj przedmiotu..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-wrap gap-2">
        {isLoading && <SubjectsSkeleton />}
        {allSubjects?.map((subject) => (
          <SubjectBadge key={subject} subject={subject} />
        ))}
      </div>
    </div>
  );
};
