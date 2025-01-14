import { all, create } from 'mathjs';

export const math = create(all);

math.import({
  percentage(num: number, percentage: number) {
    return num * (percentage / 100);
  },
});
