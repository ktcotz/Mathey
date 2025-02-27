import { AvatarImage, Avatar, AvatarFallback } from '../../../ui';
import { User } from '../../account/schemas/UserSchema';

type UserAvatarProps = {
  user: User;
  className?: string;
};

export const UserAvatar = ({
  user,
  className = 'h-12 w-12',
}: UserAvatarProps) => {
  if (!user?.firstName || !user?.lastName) return null;

  const fallback = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`;

  return (
    <Avatar className={className}>
      <AvatarImage src="/avatars/01.png" alt={`${user?.firstName} avatar`} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};
