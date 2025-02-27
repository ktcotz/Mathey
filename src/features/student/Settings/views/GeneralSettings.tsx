import { useAuth } from '../../../account/context/useAuth';
import { ChangeAvatar } from '../../../shared/Avatar/ChangeAvatar';

export const GeneralSettings = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <ChangeAvatar user={user} className="h-20 w-20" />
      </div>
    </div>
  );
};
