import { Tab } from '../types';

export const tabs: Tab[] = [
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
          value: 'pi',
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
          value: 'e',
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

export const tabsIndexes = new Array(tabs.length).fill(1).map((_, i) => i);
