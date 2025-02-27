import { motion } from 'framer-motion';

type AvatarProgressLoaderProps = {
  progress: number;
};

export const AvatarProgressLoader = ({
  progress,
}: AvatarProgressLoaderProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="4"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={283}
          strokeDashoffset={283 - (283 * progress) / 100}
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};
