import { Fragment } from 'react/jsx-runtime';
import { cn } from '../../utils/cn';

type StepperProps = {
  steps: number;
  current: number;
};

export const Stepper = ({ steps, current }: StepperProps) => {
  return (
    <div className="mb-3 flex items-center space-x-2">
      {Array.from({ length: steps }).map((_, index) => (
        <Fragment key={index}>
          <div
            className={cn(
              'h-4 w-4 rounded-full transition-colors',
              index + 1 <= current ? 'bg-green-500' : 'bg-gray-300',
            )}
          />
          {index < steps - 1 && (
            <div
              className={cn(
                'h-0.5 w-10',
                index + 1 < current ? 'bg-green-500' : 'bg-gray-300',
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};
