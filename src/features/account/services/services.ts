import { supabase } from '../../../lib';
import { CustomError } from '../../../utils/CustomError';
import { API_URL } from '../../mail/services/api';
import { UserDetailsID } from '../queries/useUserDetails';
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

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    await fetch(`${API_URL}/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  const user = data.session?.user;

  return user ?? null;
};

export const changePassword = async ({ password }: { password: string }) => {
  const { data, error } = await supabase.auth.updateUser({
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

export const getUserDetails = async ({ userID }: UserDetailsID) => {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userID)
    .single();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = UserSchema.parse(user);

  return parsed;
};
