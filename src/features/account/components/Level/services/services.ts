import { supabase } from '../../../../../lib';
import { CustomError } from '../../../../../utils/CustomError';
import { User } from '../../../schemas/UserSchema';
import { calculateXPForNextLevel } from '../helpers/helpers';

type AwardXP = {
  xp: number;
  user: User;
};

export const awardXP = async ({ user, xp }: AwardXP) => {
  const requiredXPForNextLevel = calculateXPForNextLevel(user.level);
  const currentAllXP = user.xp + xp;

  const shouldBeLeveled = currentAllXP >= requiredXPForNextLevel;

  const { data, error } = await supabase
    .from('users')
    .update({
      level: shouldBeLeveled ? user.level + 1 : user.level,
      xp: shouldBeLeveled
        ? currentAllXP - requiredXPForNextLevel
        : currentAllXP,
    })
    .eq('user_id', user.user_id)
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return { data, isLeveled: shouldBeLeveled };
};
