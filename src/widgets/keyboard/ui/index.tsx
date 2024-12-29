import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Tabs } from '@ark-ui/react';
import { clsx } from 'clsx/lite';
import parseHtml from 'html-react-parser';
import katex from 'katex';
import { shared, tabs, tabsIndexes } from '../config';
import { Key } from '../types';

type KeyboardProps = {
  value: string;
  caretPos: number;
  onChange: (newValue: string) => void;
  onCaretPosChange: (newCratePos: number) => void;
};

export const Keyboard = ({
  caretPos,
  value,
  onChange,
  onCaretPosChange,
}: KeyboardProps) => {
  const tabRef = useRef<HTMLButtonElement>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const [tab, setTab] = useState(tabsIndexes[0]);

  useEffect(() => setTabWidth(tabRef.current?.clientWidth || 0), [tabRef]);

  const onKeyClick = (key: Key) => {
    if (key.id == 'clear') {
      if (value[0] == '0') return;
      onChange('0');
      onCaretPosChange(1);
    } else if (key.id == 'equal') {
      // if (typeof result == 'object') return;
      // setValue(result);
    } else if (key.id == 'move_left') {
      if (caretPos > 0) {
        onCaretPosChange(caretPos - 1);
      }
    } else if (key.id == 'move_right') {
      if (caretPos < value.length) {
        onCaretPosChange(caretPos + 1);
      }
    } else if (key.id == 'delete') {
      if (value.length - 1 == 0) {
        if (value[0] == '0') {
          return;
        } else {
          onChange('0');
          onCaretPosChange(1);
        }
      } else {
        if (caretPos - 1 == value.length) {
          onChange(value.slice(0, caretPos - 1) + value.slice(caretPos + 1));
          onCaretPosChange(1);
        } else {
          if (caretPos - 1 >= 0) {
            onCaretPosChange(caretPos - 1);
            onChange(value.slice(0, caretPos - 1) + value.slice(caretPos));
          }
        }
      }
    } else {
      if (key.value) {
        if (value.length == 1 && value[0] == '0') {
          onChange(key.value);
          onCaretPosChange(key.value.length);
        } else {
          onChange(
            value.slice(0, caretPos) + key.value + value.slice(caretPos),
          );
          onCaretPosChange(caretPos + key.value.length);
        }
      }
    }
  };

  return (
    <Tabs.Root
      defaultValue={tabsIndexes[0].toString()}
      onValueChange={d => setTab(Number(d.value))}
      className="grid grid-rows-[auto_1fr] gap-2"
    >
      <div className="flex w-full gap-2">
        <Tabs.List className="relative flex h-12 w-full rounded-md bg-neutral-900">
          {tabsIndexes.map(t => (
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
        <div className="flex gap-2">
          {shared.map(key => (
            <motion.button
              key={key.id}
              onTap={() => onKeyClick(key)}
              className="flex w-14 select-none items-center justify-center rounded bg-neutral-900 transition-colors hover:bg-neutral-800"
            >
              {key.btn}
            </motion.button>
          ))}
        </div>
      </div>
      {tabs.map((t, n) => (
        <Tabs.Content key={t.name} value={n.toString()}>
          <div
            className={`grid h-full gap-1`}
            style={{
              gridTemplateRows: `repeat(${t.keys.length}, 1fr)`,
              gridTemplateColumns: `repeat(${t.keys[0].length}, 1fr)`,
            }}
          >
            {t.keys.map(row =>
              row.map(key => (
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
