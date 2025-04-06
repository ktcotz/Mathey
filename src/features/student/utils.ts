import { User } from '../account/schemas/UserSchema';

export const exampleUser: User = {
  firstName: 'Kamil',
  lastName: 'Naskręt',
  type: 'public' as const,
  user_id: '',
  city: '',
  email: '',
  avatar_url: '',
  phone: '',
  house_number: '',
  street: '',
  detailsComplete: true,
  bio: '',
  class: 'another',
  level: 1,
  xp: 0,
};
