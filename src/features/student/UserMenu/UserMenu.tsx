import { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../../../ui';
import { useAuth } from '../../account/context/useAuth';
import { LogOut, Moon, Settings, Sun } from 'lucide-react';
import { useTheme } from '../../../store/theme/useTheme';
import { useLogout } from '../../account/mutations/useLogout';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../types/shared';
import { UserAvatar } from '../../shared/Avatar/Avatar';

export const UserMenu = () => {
  const { logout, isLogout } = useLogout();

  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full">
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="mr-2 h-4 w-4" aria-label="Zmień na tryb jasny" />
          ) : (
            <Moon className="mr-2 h-4 w-4" aria-label="Zmień na tryb ciemny" />
          )}
          <span>{theme === 'dark' ? 'Tryb jasny' : 'Tryb ciemny'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="flex w-full items-center gap-2"
            to={AppRoutes.DashboardUserSettings}
          >
            <Settings className="mr-2 h-4 w-4" aria-label="Ustawienia konta" />
            <span>Ustawienia</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!!isLogout} onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" aria-label="Wyloguj się" />
          <span>Wyloguj się</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
