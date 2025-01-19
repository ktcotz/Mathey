import { Button } from '../Button';
import { useSwitcher } from './useSwitcher';

type FormSwitcherProps = {
  data: {
    name: string;
    type: string;
  }[];
};

export const FormSwitcher = ({ data }: FormSwitcherProps) => {
  const { currentForm, changeForm } = useSwitcher();

  return (
    <div className="mb-6 flex justify-center space-x-4">
      {data.map(({ name, type }) => {
        return (
          <Button
            key={name}
            variant={currentForm === type ? 'default' : 'outline'}
            onClick={() => changeForm(type)}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
};
