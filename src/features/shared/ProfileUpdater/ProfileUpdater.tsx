import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '../../../ui';
import { User } from '../../account/schemas/UserSchema';
import {
  ProfileUpdaterSchema,
  ProfileUpdaterType,
} from './schemas/ProfileUpdaterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { classes } from './data';
import { useUpdateInformations } from './mutations/useUpdateInformations';

type ProfileUpdaterProps = {
  user: User;
};

const MAX_BIO_LENGTH = 250;

export const ProfileUpdater = ({ user }: ProfileUpdaterProps) => {
  const { isUpdating, updateUser } = useUpdateInformations({
    userID: user?.user_id,
  });

  const form = useForm<ProfileUpdaterType>({
    resolver: zodResolver(ProfileUpdaterSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      class: user?.class || '',
      bio: user?.bio || '',
    },
  });

  const submitHandler = (data: ProfileUpdaterType) => {
    updateUser({ userID: user?.user_id, ...data });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="grid max-w-xl grid-cols-1 gap-8 sm:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input placeholder="abcd@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="abcd@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Klasa</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz klasę" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((potentialClass) => (
                      <SelectItem
                        value={potentialClass.value}
                        key={potentialClass.label}
                      >
                        {potentialClass.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="col-start-1 -col-end-1">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>O sobie</FormLabel>
                <FormControl>
                  <Textarea {...field} maxLength={MAX_BIO_LENGTH} />
                </FormControl>
                <p className="text-right text-xs dark:text-gray-100">
                  {form.watch('bio')?.length ?? 0} / {MAX_BIO_LENGTH}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1 col-end-2">
          <Button type="submit" disabled={false}>
            {isUpdating ? 'Zmieniam dane...' : 'Zapisz aktualne zmiany'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
