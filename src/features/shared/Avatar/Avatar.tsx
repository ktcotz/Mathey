import { AvatarImage, Avatar, AvatarFallback } from '../../../ui';
import { User } from '../../account/schemas/UserSchema';
import { useAvatar } from './context/useAvatar';

type UserAvatarProps = {
  user: User;
  className?: string;
};

export const UserAvatar = ({
  user,
  className = 'h-12 w-12',
}: UserAvatarProps) => {
  const { timestamp } = useAvatar();

  if (!user?.firstName || !user?.lastName) return null;

  const fallback = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;

  const avatarSource = user?.avatar_url
    ? `${user?.avatar_url}?t=${timestamp}}`
    : '';

  return (
    <Avatar className={className}>
      <AvatarImage
        src={avatarSource}
        alt={`${user?.firstName} ${user?.lastName}`}
      />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
