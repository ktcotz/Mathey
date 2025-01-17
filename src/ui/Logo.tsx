import { Link } from 'react-router-dom';
import { AppRoutes } from '../types/shared';

export const Logo = () => {
  return (
    <Link to={AppRoutes.Home}>
      <img src="./images/logo.svg" alt="Mathey" width={125} height={95} />
    </Link>
  );
};
