import { OrderLabel } from './Order';

export const orders: {
  label: OrderLabel;
  title: string;
  value: string | number;
}[] = [
  {
    label: 'book',
    title: 'Ukończonych lekcji',
    value: 10,
  },

  {
    label: 'time',
    title: 'Czas nauki',
    value: '25h',
  },
];
