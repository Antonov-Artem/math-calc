import { all, create } from 'mathjs';

export const math = create(all);

math.import(
  {
    '%': (a: number, b: number) => math.multiply(a, b / 100),
  },
  { override: true },
);
