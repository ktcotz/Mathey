import { supabase } from '../../../../lib';
import { CustomError } from '../../../../utils/CustomError';
import { UserDetailsID } from '../../../account/queries/useUserDetails';
import { ProfileUpdaterType } from '../schemas/ProfileUpdaterSchema';

export const updateUserInformations = async ({
  userID,
  ...updaterData
}: UserDetailsID & Partial<ProfileUpdaterType>) => {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updaterData })
    .eq('user_id', userID)
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
