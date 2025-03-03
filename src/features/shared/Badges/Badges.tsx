import { Fragment } from 'react/jsx-runtime';
import { Badge } from '../../../ui';

export const Badges = () => {
  return (
    <Fragment>
      <h3 className="mb-4 text-lg font-semibold">Twoje odznaki</h3>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">Pilny uczeń</Badge>
        <Badge variant="secondary">Mistrz matematyki</Badge>
      </div>
    </Fragment>
  );
};
