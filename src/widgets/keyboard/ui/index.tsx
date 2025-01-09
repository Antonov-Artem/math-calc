import { useState } from 'react';
import { motion } from 'motion/react';
import { Tabs } from '@ark-ui/react';
import { clsx } from 'clsx/lite';
import parseHtml from 'html-react-parser';
import katex from 'katex';
import { shared, tabs } from '../config';
import { Key } from '../types';
import { isMobile } from 'react-device-detect';

type KeyboardProps = {
  inputId?: string;
  value: string;
  caretPos: number;
  onChange: (newValue: string, inputId?: string) => void;
  onCaretPosChange: (newCratePos: number, inputId?: string) => void;
};

export const Keyboard = ({
  inputId,
  caretPos,
  value,
  onChange,
  onCaretPosChange,
}: KeyboardProps) => {
  const [tab, setTab] = useState(tabs[0].name);

  const onKeyClick = (key: Key) => {
    if (key.id == 'clear') {
      if (value[0] == '0') return;
      onChange('0', inputId);
      onCaretPosChange(1, inputId);
    } else if (key.id == 'equal') {
      // if (typeof result == 'object') return;
      // setValue(result);
    } else if (key.id == 'move_left') {
      if (caretPos > 0) {
        onCaretPosChange(caretPos - 1, inputId);
      }
    } else if (key.id == 'move_right') {
      if (caretPos < value.length) {
        onCaretPosChange(caretPos + 1, inputId);
      }
    } else if (key.id == 'delete') {
      if (value.length - 1 == 0) {
        if (value[0] == '0') {
          return;
        } else {
          onChange('0', inputId);
          onCaretPosChange(1, inputId);
        }
      } else {
        if (caretPos - 1 == value.length) {
          onChange(
            value.slice(0, caretPos - 1) + value.slice(caretPos + 1),
            inputId,
          );
          onCaretPosChange(1, inputId);
        } else {
          if (caretPos - 1 >= 0) {
            onCaretPosChange(caretPos - 1, inputId);
            onChange(
              value.slice(0, caretPos - 1) + value.slice(caretPos),
              inputId,
            );
          }
        }
      }
    } else {
      if (key.value) {
        if (value.length == 1 && value[0] == '0') {
          onChange(key.value, inputId);
          onCaretPosChange(key.value.length, inputId);
        } else {
          onChange(
            value.slice(0, caretPos) + key.value + value.slice(caretPos),
            inputId,
          );
          onCaretPosChange(caretPos + key.value.length, inputId);
        }
      }
    }
  };

  return (
    <Tabs.Root
      value={tab}
      onValueChange={d => setTab(d.value)}
      className="grid h-full w-full grid-rows-[auto_1fr] gap-2"
    >
      <Tabs.List className="flex h-12 w-full gap-1 rounded-md">
        {tabs.map(t => (
          <Tabs.Trigger
            key={t.name}
            value={t.name}
            className={clsx(
              'flex-1 select-none rounded-md text-sm leading-none transition-colors',
              t.name == tab
                ? 'bg-blue-700'
                : 'bg-neutral-900 hover:bg-neutral-800',
              isMobile && 'flex items-center justify-center',
            )}
          >
            {t.label}
          </Tabs.Trigger>
        ))}
        {shared.map(key => (
          <motion.button
            key={key.id}
            onTap={() => onKeyClick(key)}
            className={clsx(
              'flex select-none items-center justify-center rounded bg-neutral-900 transition-colors hover:bg-neutral-800',
              isMobile ? 'flex-1' : 'w-14',
            )}
          >
            {key.btn}
          </motion.button>
        ))}
      </Tabs.List>
      {tabs.map(t => (
        <Tabs.Content key={t.name} value={t.name}>
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
