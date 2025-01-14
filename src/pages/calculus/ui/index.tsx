import { useEffect, useRef, useState } from 'react';
import { Tabs } from '@ark-ui/react';
import { clsx } from 'clsx/lite';
import { Keyboard } from 'widgets/keyboard';
import { ExpandingInput } from 'shared/ui';
import { tabs } from '../config';
import { isMobile } from 'react-device-detect';
import { diff, integrate } from 'nerdamer';
import { chain, evaluate, simplify } from 'mathjs';
import 'nerdamer/Calculus';

export const Calculus = () => {
  const [value, setValue] = useState('');
  const [limit, setLimit] = useState('');
  const [result, setResult] = useState('');
  const [caretPos, setCaretPos] = useState(0);
  const [tab, setTab] = useState(tabs[0].value);
  const [selectedInputId, setSelectedInputId] = useState('value');
  const inputValueRef = useRef<HTMLInputElement>(null);
  const inputLimitRef = useRef<HTMLInputElement>(null);

  const onLimitChange = (value: string) => {
    setLimit(value);
    setCaretPos(inputLimitRef.current?.selectionStart || 0);
  };

  const onInputValueChange = (value: string) => {
    setValue(value);
    setCaretPos(inputValueRef.current?.selectionStart || 0);
  };

  const onInputLimitClick = () => {
    setSelectedInputId('limit');
    setCaretPos(inputLimitRef.current?.selectionStart || 0);
  };

  const onInputValueClick = () => {
    setSelectedInputId('value');
    setCaretPos(inputValueRef.current?.selectionStart || 0);
  };

  const onKeyboardValueChange = (value: string) => {
    if (selectedInputId == 'value') {
      setValue(value);
    } else {
      setLimit(value);
    }
  };

  const onCaretPosChange = (newCaretPos: number) => {
    setCaretPos(newCaretPos);
  };

  useEffect(() => {
    inputValueRef.current?.setSelectionRange(caretPos, caretPos);
  }, [caretPos]);

  useEffect(() => {
    try {
      if (tab == 'limit') {
        const r = chain(simplify(value).evaluate({ x: evaluate(limit) }))
          .round(15)
          .done();
        setResult(
          typeof r == 'number' || typeof r == 'string'
            ? String(r)
            : 'Введіть коректний вираз',
        );
      } else if (tab == 'derivative') {
        setResult(diff(value, 'x').toString());
      } else if (tab == 'integral') {
        setResult(integrate(value, 'x').toString());
      } else {
        return;
      }
    } catch (error: any) {
      setResult('Введіть коректний вираз');
    }
    if (value.length == 0 || (tab == 'limit' && limit.length == 0)) {
      setResult('Введіть коректний вираз');
    }
  }, [tab, value, limit]);

  return (
    <div className="mx-auto grid h-[calc(100svh-64px)] w-full max-w-4xl grid-rows-2 p-2">
      <Tabs.Root
        value={tab}
        onValueChange={d => setTab(d.value)}
        className={clsx('flex flex-col', isMobile ? 'gap-10' : 'gap-14')}
      >
        <Tabs.List
          className={clsx(isMobile ? `grid grid-cols-3` : 'flex gap-2')}
        >
          {tabs.map(t => (
            <Tabs.Trigger
              key={t.value}
              value={t.value}
              className={clsx(
                'h-9 rounded-lg px-4 text-sm transition-colors',
                t.value == tab
                  ? 'bg-blue-700 text-white'
                  : 'bg-neutral-950 text-neutral-400',
              )}
            >
              {t.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <div className="flex items-center gap-4 pl-4">
          <ExpandingInput
            ref={inputValueRef}
            value={value}
            onValueChange={onInputValueChange}
            fontSize={30}
            onClick={onInputValueClick}
            className={clsx(
              'bg-neutral-950 caret-blue-700 outline-none',
              value.length == 0 &&
                'border border-dashed border-neutral-600 text-center',
            )}
          />
          {tab == 'limit' && (
            <>
              <div className="text-3xl">x</div>
              <div className="material-symbols-outlined mt-3">
                trending_flat
              </div>
              <ExpandingInput
                ref={inputLimitRef}
                value={limit}
                onValueChange={onLimitChange}
                fontSize={30}
                onClick={onInputLimitClick}
                className={clsx(
                  'bg-neutral-950 caret-blue-700 outline-none',
                  limit.length == 0 &&
                    'border border-dashed border-neutral-600 text-center',
                )}
              />
            </>
          )}
        </div>
        {tabs.map(t => (
          <Tabs.Content key={t.value} value={t.value}>
            <div className="flex flex-col gap-10 pl-4">
              <div className="h-px w-full border border-neutral-700" />
              <div className="flex border-l-[6px] border-blue-700 py-2 pl-4 text-xl">
                <span className="mr-2 text-neutral-400">=</span>
                {result}
              </div>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <Keyboard
        inputId={selectedInputId}
        value={selectedInputId == 'value' ? value : limit}
        onChange={onKeyboardValueChange}
        caretPos={caretPos}
        onCaretPosChange={onCaretPosChange}
      />
    </div>
  );
};
