import { ComponentProps, forwardRef, useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export const PasswordInput = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input {...props} ref={ref} type={showPassword ? 'type' : 'password'} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeIcon
            className="h-4 w-4"
            aria-hidden="true"
            aria-label="Schowaj hasło"
          />
        ) : (
          <EyeOffIcon
            className="h-4 w-4"
            aria-hidden="true"
            aria-label="Pokaż hasło"
          />
        )}
        <span className="sr-only">
          {showPassword ? 'Schowaj hasło' : 'Pokaż hasło'}
        </span>
      </Button>
    </div>
  );
});
