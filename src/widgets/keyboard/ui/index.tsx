import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Tabs } from '@ark-ui/react';
import { clsx } from 'clsx/lite';
import parseHtml from 'html-react-parser';
import katex from 'katex';
import { tabs, tabsIndexes } from '../config';
import { Key } from '../types';

type KeyboardProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export const Keyboard = ({ value, onChange }: KeyboardProps) => {
  const tabRef = useRef<HTMLButtonElement>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const [tab, setTab] = useState(tabsIndexes[0]);

  useEffect(() => setTabWidth(tabRef.current?.clientWidth || 0), [tabRef]);

  const onKeyClick = (key: Key) => {
    if (key.id == 'clear') {
      if (value[0] == '0') return;
      onChange('0');
    } else if (key.id == 'equal') {
      // if (typeof result == 'object') return;
      // setValue(result);
    } else if (key.id == 'remove') {
      if (value.length - 1 == 0) {
        onChange('0');
        return;
      }
      onChange(value.slice(0, -1));
    } else {
      onChange(value + key.value);
    }
  };

  return (
    <Tabs.Root
      defaultValue={tabsIndexes[0].toString()}
      onValueChange={(d) => setTab(Number(d.value))}
      className="grid grid-rows-[auto_1fr] gap-2"
    >
      <Tabs.List className="relative flex h-12 rounded-md bg-neutral-900">
        {tabsIndexes.map((t) => (
          <Tabs.Trigger
            ref={tabRef}
            key={tabs[t].name}
            value={t.toString()}
            className={clsx(
              'z-[1] flex-1 select-none rounded-md text-sm leading-none transition-colors',
              tab != t && 'hover:bg-neutral-800',
            )}
          >
            {tabs[t].label}
          </Tabs.Trigger>
        ))}
        <div
          className="absolute left-0 top-0 h-12 rounded-md bg-blue-700 transition-transform"
          style={{
            width: tabWidth,
            transform: `translateX(${tab * tabWidth}px)`,
          }}
        />
      </Tabs.List>
      {tabs.map((t, n) => (
        <Tabs.Content key={t.name} value={n.toString()}>
          <div
            className={`grid h-full gap-1`}
            style={{
              gridTemplateRows: `repeat(${t.keys.length}, 1fr)`,
              gridTemplateColumns: `repeat(${t.keys[0].length}, 1fr)`,
            }}
          >
            {t.keys.map((row) =>
              row.map((key) => (
                <motion.button
                  key={key.id}
                  onTap={() => onKeyClick(key)}
                  className="flex select-none items-center justify-center rounded bg-neutral-800 transition-colors hover:bg-neutral-900"
                >
                  {typeof key.btn == 'string'
                    ? parseHtml(katex.renderToString(key.btn))
                    : key.btn}
                </motion.button>
              )),
            )}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
