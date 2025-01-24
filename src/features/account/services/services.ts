import { supabase } from '../../../lib';
import { CustomError } from '../../../utils/CustomError';
import { LoginFormData } from '../schemas/LoginFormSchema';

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
