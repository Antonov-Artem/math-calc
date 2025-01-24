import { ReactNode } from 'react';

export type Tab = {
  name: string;
  label: string;
  keys: Key[][];
};

export type Key = {
  id?: string; // unique ID of key
  value?: string; // used for evaluation via 'mathjs'
  btn?: ReactNode; // used for text in button
  cursorPos?: number;
};
