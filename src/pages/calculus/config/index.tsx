import { ReactNode } from 'react';

type Tab = {
  value: string;
  label: string;
  result: ReactNode;
};

export const tabs: Tab[] = [
  {
    value: 'limit',
    label: 'Ліміти',
    result: 'Infinity',
  },
  {
    value: 'derivative',
    label: 'Похідна',
    result: '-1/pow(x, 2)',
  },
  {
    value: 'integral',
    label: 'Інтеграл',
    result: 'log(abs(x))+C',
  },
];
