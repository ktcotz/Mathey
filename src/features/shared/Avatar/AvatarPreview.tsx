import { AvatarProgressLoader } from './AvatarProgressLoader';

type AvatarPreviewProps = {
  preview: string | null;
  progress: number;
};

export const AvatarPreview = ({ preview, progress }: AvatarPreviewProps) => {
  if (!preview) return null;

  const isActuallyProgress = progress > 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-2 text-sm text-muted-foreground">Podgląd</p>
      <div className="relative p-1">
        {isActuallyProgress && <AvatarProgressLoader progress={progress} />}
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-300">
          <img
            src={preview}
            alt="Podgląd avatara"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">80 x 80</p>
    </div>
  );
};
