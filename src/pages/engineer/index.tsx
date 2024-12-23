import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Tabs } from '@ark-ui/react';
import { clsx } from 'clsx/lite';
import parseHtml from 'html-react-parser';
import { evaluate, chain } from 'mathjs';
import katex from 'katex';

type Tab = {
  name: string;
  label: string;
  keys: Key[][];
};

type Key = {
  id?: string; // unique ID of key
  value?: string; // used for evaluation via 'mathjs'
  btn?: ReactNode; // used for text in button
};

const tabs: Tab[] = [
  {
    name: 'arithmetic',
    label: 'Арифм.',
    keys: [
      [
        {
          id: 'seven',
          value: '7',
          btn: '7',
        },
        {
          id: 'eight',
          value: '8',
          btn: '8',
        },
        {
          id: 'nine',
          value: '9',
          btn: '9',
        },
        {
          id: 'clear',
          btn: <span>C</span>,
        },
        {
          id: 'remove',
          btn: <span className="material-symbols-outlined">backspace</span>,
        },
      ],
      [
        {
          id: 'four',
          value: '4',
          btn: '4',
        },
        {
          id: 'five',
          value: '5',
          btn: '5',
        },
        {
          id: 'six',
          value: '6',
          btn: '6',
        },
        {
          id: 'plus',
          value: '+',
          btn: '+',
        },
        {
          id: 'minus',
          value: '-',
          btn: '-',
        },
      ],
      [
        {
          id: 'one',
          value: '1',
          btn: '1',
        },
        {
          id: 'two',
          value: '2',
          btn: '2',
        },
        {
          id: 'three',
          value: '3',
          btn: '3',
        },
        {
          id: 'multiply',
          value: '*',
          btn: '\\times',
        },
        {
          id: 'divide',
          value: '/',
          btn: '\\div',
        },
      ],
      [
        {
          id: 'bracket_left',
          value: '(',
          btn: '(',
        },
        {
          id: 'zero',
          value: '0',
          btn: '0',
        },
        {
          id: 'bracket_right',
          value: ')',
          btn: ')',
        },
        { id: 'dot', value: '.', btn: '.' },
        {
          id: 'equal',
          btn: '=',
        },
      ],
    ],
  },
  {
    name: 'trig',
    label: 'Триг. / Гіпербол.',
    keys: [
      [
        {
          id: 'pi',
          value: Math.PI.toString(),
          btn: '\\pi',
        },
        {
          id: 'sin',
          value: 'sin(',
          btn: '\\sin',
        },
        {
          id: 'cos',
          value: 'cos(',
          btn: '\\cos',
        },
        {
          id: 'tan',
          value: 'tan(',
          btn: '\\tan',
        },
        {
          id: 'cot',
          value: 'cot(',
          btn: '\\cot',
        },
        {
          id: 'sec',
          value: 'sec(',
          btn: '\\sec',
        },
        {
          id: 'csc',
          value: 'csc(',
          btn: '\\csc',
        },
      ],
      [
        {
          id: 'pi2',
          value: (Math.PI / 2).toString(),
          btn: '\\frac{\\pi}{2}',
        },
        {
          id: 'arcsin',
          value: 'asin(',
          btn: '\\sin^{-1}',
        },
        {
          id: 'acos',
          value: 'acos(',
          btn: '\\cos^{-1}',
        },
        {
          id: 'atan',
          value: 'atan(',
          btn: '\\tan^{-1}',
        },
        {
          id: 'acot',
          value: 'acot(',
          btn: '\\cot^{-1}',
        },
        {
          id: 'asec',
          value: 'asec(',
          btn: '\\sec^{-1}',
        },
        {
          id: 'acsc',
          value: 'acsc(',
          btn: '\\csc^{-1}',
        },
      ],
      [
        {
          id: 'rad',
          value: '',
          btn: '\\text{rad}',
        },
        {
          id: 'sinh',
          value: 'sinh(',
          btn: '\\sinh',
        },
        {
          id: 'cosh',
          value: 'cosh(',
          btn: '\\cosh',
        },
        {
          id: 'tanh',
          value: 'tanh(',
          btn: '\\tanh',
        },
        {
          id: 'coth',
          value: 'coth(',
          btn: '\\coth',
        },
        {
          id: 'sech',
          value: 'sech(',
          btn: '\\text{sech}',
        },
        {
          id: 'csch',
          value: 'csch(',
          btn: '\\text{csch}',
        },
      ],
      [
        {
          id: 'deg',
          value: 'deg',
          btn: '\\text{deg}',
        },
        {
          id: 'arcsinh',
          value: '',
          btn: '\\sinh^{-1}',
        },
        {
          id: 'arccosh',
          value: '',
          btn: '\\cos^{-1}',
        },
        {
          id: 'arctanh',
          value: '',
          btn: '\\tanh^{-1}',
        },
        {
          id: 'arccoth',
          value: '',
          btn: '\\coth^{-1}',
        },
        {
          id: 'arcsech',
          value: '',
          btn: '\\text{sech}^{-1}',
        },
        {
          id: 'arccsch',
          value: '',
          btn: '\\text{csch}^{-1}',
        },
      ],
    ],
  },
  {
    name: 'log',
    label: 'Ступ. / Лог.',
    keys: [
      [
        {
          id: 'x_n',
          value: 'pow(x, n)',
          btn: 'x^n',
        },
        {
          id: 'square',
          value: 'pow(x, 2)',
          btn: 'x^2',
        },
        {
          id: 'cube',
          value: 'pow(x, 3)',
          btn: 'x^3',
        },
        {
          id: 'two_n',
          value: 'pow(2, n)',
          btn: '2^n',
        },
        {
          id: 'ten_n',
          value: 'pow(10, n)',
          btn: '10^n',
        },
      ],
      [
        { id: 'root_n', value: 'nthRoot(', btn: '\\sqrt[n]{x}' },
        { id: 'sqrt', value: 'sqrt(', btn: '\\sqrt{x}' },
        { id: 'cbrt', value: 'cbrt(', btn: '\\sqrt[3]{x}' },
        { value: '' },
        { value: '' },
      ],
      [
        {
          id: 'log',
          value: `log(a, b)`,
          btn: '\\log_{x}',
        },
        {
          id: 'log10',
          value: 'log10(',
          btn: '\\log',
        },
        {
          id: 'ln',
          value: 'log(',
          btn: '\\ln',
        },
        {
          id: 'e',
          value: Math.E.toString(),
          btn: 'e',
        },
        {
          id: 'exp',
          value: 'exp(',
          btn: '\\exp',
        },
      ],
      [],
    ],
  },
  {
    name: 'func',
    label: 'Функції',
    keys: [
      [
        {
          id: 'modulo',
          value: 'abs(',
          btn: '\\text{abs}',
        },
        {
          id: 'sgn',
          value: 'sign(',
          btn: '\\text{sgn}',
        },
      ],
      [],
      [],
      [],
    ],
  },
];

const tabsIndexes = new Array(tabs.length).fill(1).map((_, i) => i);

export const Engineer = () => {
  const tabRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tabWidth, setTabWidth] = useState(0);
  const [tab, setTab] = useState(tabsIndexes[0]);
  const [expression, setExpression] = useState<string>('0');
  const [result, setResult] = useState<string | object>('0');

  useEffect(() => inputRef.current?.focus());

  useEffect(() => setTabWidth(tabRef.current?.clientWidth || 0), [tabRef]);

  const onExpressionChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 0) {
      setExpression('0');
      return;
    }
    if (e.target.value[0] == '0') {
      setExpression(e.target.value.slice(1));
    } else {
      setExpression(e.target.value);
    }
  };

  const onKeyClick = (key: Key) => {
    if (key.id == 'clear') {
      setExpression('0');
    } else if (key.id == 'equal') {
      if (typeof result == 'object') return;
      setExpression(result);
    } else if (key.id == 'remove') {
      if (expression.length - 1 == 0) {
        setExpression('0');
        return;
      }
      setExpression(exp => exp.slice(0, -1));
    } else {
      if (expression[expression.length - 1] == '0' && expression.length == 1) {
        setExpression(exp => exp.slice(0, 0));
      }
      setExpression(e => e + key.value);
    }
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (expression.length <= 0) {
      setExpression('0');
    }
    try {
      setResult(chain(evaluate(expression)).round(15).toString());
    } catch (error) {
      setResult(error as object);
    }
  }, [expression]);

  return (
    <div className="max-w-4xl h-[calc(100vh-64px)] mx-auto p-2 grid grid-rows-2">
      <div className="pr-8 flex flex-col items-end gap-8">
        <div className="w-full flex-1 flex flex-col justify-end text-5xl">
          <input
            ref={inputRef}
            type="text"
            value={expression}
            onChange={onExpressionChange}
            className="w-full text-right bg-neutral-950 caret-blue-700 focus:outline-none"
          />
        </div>
        <div className="flex-1 text-3xl text-neutral-400">
          {typeof result == 'string' ? result : 'Введіть коректний вираз'}
        </div>
      </div>
      <Tabs.Root
        defaultValue={tabsIndexes[0].toString()}
        onValueChange={d => setTab(Number(d.value))}
        className="grid grid-rows-[auto_1fr] gap-2"
      >
        <Tabs.List className="relative h-12 flex rounded-md bg-neutral-900">
          {tabsIndexes.map(t => (
            <Tabs.Trigger
              ref={tabRef}
              key={tabs[t].name}
              value={t.toString()}
              className={clsx(
                'flex-1 text-sm leading-none rounded-md z-[1] transition-colors select-none',
                tab != t && 'hover:bg-neutral-800'
              )}
            >
              {tabs[t].label}
            </Tabs.Trigger>
          ))}
          <div
            className="absolute top-0 left-0 h-12 rounded-md bg-blue-700 transition-transform"
            style={{
              width: tabWidth,
              transform: `translateX(${tab * tabWidth}px)`,
            }}
          />
        </Tabs.List>
        {tabs.map((t, n) => (
          <Tabs.Content key={t.name} value={n.toString()}>
            <div
              className={`h-full grid gap-1`}
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
                    className="flex items-center justify-center rounded transition-colors select-none bg-neutral-800 hover:bg-neutral-900"
                  >
                    {typeof key.btn == 'string'
                      ? parseHtml(katex.renderToString(key.btn))
                      : key.btn}
                  </motion.button>
                ))
              )}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
};
