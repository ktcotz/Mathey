import { Loader2 } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

export const InlineSpinner = () => {
  return (
    <Fragment>
      <Loader2 className="animate-spin" />
      <span>Proszę czekać</span>
    </Fragment>
  );
};
