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

type SubjectsProps = {
  user: User;
};

export const Subjects = ({ user }: SubjectsProps) => {
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [tempSubjects, setTempSubjects] = useState<SubjectSchemaType[]>(() => {
    return subjectsArray.map((subject) => ({
      user_id: user.user_id,
      type: subject,
      name: SUBJECTS_NAMES[subject],
    }));
  });

  const form = useForm<SubjectFilterSchemaType>({
    resolver: zodResolver(SubjectsFilterSchema),
  });

  const subjectFilter = form.watch('filter');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(subjectFilter);
    }, 300);

    return () => clearTimeout(handler);
  }, [subjectFilter]);

  useEffect(() => {
    setTempSubjects(
      tempSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(debouncedFilter.toLowerCase()),
      ),
    );
  }, [debouncedFilter]);

  const submitHandler = () => {
    console.log('hi!');
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
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
        {tempSubjects.map((subject) => (
          <SubjectBadge key={subject.type} {...subject} />
        ))}
      </div>
    </div>
  );
};
