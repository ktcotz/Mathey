import { Sparkles, Trophy } from 'lucide-react';
import { Progress } from '../../../../ui';
import { calculateXPForNextLevel } from './helpers/helpers';
import { User } from '../../schemas/UserSchema';
import { useAccountLevel } from './context/useAccountLevel';

type LevelProps = {
  user: User;
};

export const Level = ({ user }: LevelProps) => {
  const { isLevelingUp } = useAccountLevel();
  const currentLevel = user?.level;
  const calculatedNextXPLevel = calculateXPForNextLevel(currentLevel);

  const progressValue = (user.xp / calculatedNextXPLevel) * 100;

  const markers = Array.from({ length: 10 }, (_, i) => (
    <div
      key={i}
      className="absolute h-1.5 w-0.5 bg-white opacity-50 dark:bg-gray-600"
      style={{ left: `${(i / 10) * 100}%` }}
    />
  ));

  return (
    <div className="relative ml-auto flex flex-col gap-2 rounded-xl border border-black/5 p-2 text-[10px] dark:border-white/5 sm:ml-0 sm:text-xs">
      <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-2 dark:border-white/5 sm:gap-10">
        <div className="flex items-center">
          <Trophy
            className="h-4 text-yellow-500"
            aria-label="Aktualny poziom"
          />
          <span className="font-bold text-black dark:text-white">
            Poziom {currentLevel}
          </span>
        </div>
        <span className="text-[8px] text-black/70 dark:text-white/70 sm:text-[10px]">
          {user.xp}/{calculatedNextXPLevel} XP
        </span>
      </div>
      <div className="relative rounded-full">
        {markers}
        <Progress value={progressValue} max={calculatedNextXPLevel} />
      </div>

      <div className="absolute -right-2 -top-2">
        <Sparkles
          className={`h-4 w-4 text-primary transition-all ${isLevelingUp ? 'rotate-45 text-yellow-500' : ''}`}
        />
      </div>
    </div>
  );
};
