import { supabase } from '../../../lib';
import { CustomError } from '../../../utils/CustomError';
import { LoginFormData } from '../schemas/LoginFormSchema';
import { RegisterFormData } from '../schemas/RegisterFormSchema';
import { UserSchema } from '../schemas/UserSchema';

export const userLogin = async ({ email, password }: LoginFormData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  return data;
};

export const registerUser = async ({
  email,
  password,
  phone,
}: RegisterFormData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName: 'Nieznajomy',
        lastName: '',
      },
    },
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  const { data: tableUser, error: tableUserError } = await supabase
    .from('users')
    .insert([{ user_id: data.user?.id, email, phone }])
    .select()
    .single();

  if (tableUserError) {
    throw new CustomError({
      message: tableUserError.message,
    });
  }

  const parsedUser = UserSchema.parse(tableUser);

  return parsedUser;
};
