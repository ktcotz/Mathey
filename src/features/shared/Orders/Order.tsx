import { Book, Clock } from 'lucide-react';

export type OrderLabel = 'book' | 'time';

type OrderProps = {
  label: OrderLabel;
  title: string;
  value: string | number;
};

export const Order = ({ label, title, value }: OrderProps) => {
  const Icon = {
    book: Book,
    time: Clock,
  };

  const IconComponent = Icon[label];

  return (
    <div className="rounded-lg bg-primary/10 p-4 text-center transition hover:scale-105">
      <IconComponent className="mx-auto mb-2" />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};
