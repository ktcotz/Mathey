import { Link } from 'react-router-dom';
import { AppRoutes } from '../types/shared';
import { useTheme } from '../store/theme/useTheme';

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link to={AppRoutes.Home}>
      <img
        src={`./images/${theme === 'dark' ? 'logo-white' : 'logo'}.svg`}
        alt="Mathey"
        width={125}
        height={95}
      />
    </Link>
  );
};
