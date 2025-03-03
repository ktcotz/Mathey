import { useAuth } from '../../../account/context/useAuth';
import { ChangeAvatar } from '../../../shared/Avatar/ChangeAvatar';
import { ProfileUpdater } from '../../../shared/ProfileUpdater/ProfileUpdater';

export const GeneralSettings = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <ChangeAvatar user={user} className="h-20 w-20" />
      <ProfileUpdater user={user} />
    </div>
  );
};
