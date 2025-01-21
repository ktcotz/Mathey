import { supabase } from '../../../lib';
import { LoginFormData } from '../schemas/LoginFormSchema';

export const userLogin = async ({ email, password }: LoginFormData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
