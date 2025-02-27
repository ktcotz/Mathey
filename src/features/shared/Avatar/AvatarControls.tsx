import { Slider } from '../../../ui';

type AvatarControlsProps = {
  scale: number;
  setScale: (value: number) => void;
};

export const AvatarControls = ({ scale, setScale }: AvatarControlsProps) => {
  return (
    <div>
      <p className="mb-2 text-sm text-muted-foreground">Przybliżenie</p>
      <Slider
        value={[scale]}
        min={1}
        max={3}
        step={0.1}
        onValueChange={(value) => setScale(value[0])}
      />
    </div>
  );
};
