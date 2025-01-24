import { Key, Tab } from '../types';
import { isMobile } from 'react-device-detect';

export const tabs: Tab[] = [
  {
    name: 'arithmetic',
    label: isMobile ? '+' : 'Стандартні',
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
          id: 'percentage',
          value: '%',
          btn: <span>%</span>,
        },
        {
          id: 'frac',
          value: 'fraction(a, b)',
          btn: '/',
          cursorPos: 10,
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
        {
          id: 'dot',
          value: '.',
          btn: '.',
        },
        {
          id: 'equal',
          btn: '=',
        },
      ],
    ],
  },
  {
    name: 'trig',
    label: isMobile ? 'sin' : 'Тригонометрія',
    keys: [
      [
        {
          id: 'pi',
          value: 'pi',
          btn: '\\pi',
        },
        {
          id: 'sin',
          value: 'sin()',
          btn: '\\sin',
          cursorPos: 4,
        },
        {
          id: 'cos',
          value: 'cos()',
          btn: '\\cos',
          cursorPos: 4,
        },
        {
          id: 'tan',
          value: 'tan()',
          btn: '\\tan',
          cursorPos: 4,
        },
        {
          id: 'cot',
          value: 'cot()',
          btn: '\\cot',
          cursorPos: 4,
        },
        {
          id: 'sec',
          value: 'sec()',
          btn: '\\sec',
          cursorPos: 4,
        },
        {
          id: 'csc',
          value: 'csc()',
          btn: '\\csc',
          cursorPos: 4,
        },
      ],
      [
        {
          id: 'x',
          value: 'x',
          btn: 'x',
        },
        {
          id: 'arcsin',
          value: 'asin()',
          btn: '\\sin^{-1}',
          cursorPos: 5,
        },
        {
          id: 'acos',
          value: 'acos()',
          btn: '\\cos^{-1}',
          cursorPos: 5,
        },
        {
          id: 'atan',
          value: 'atan()',
          btn: '\\tan^{-1}',
          cursorPos: 5,
        },
        {
          id: 'acot',
          value: 'acot()',
          btn: '\\cot^{-1}',
          cursorPos: 5,
        },
        {
          id: 'asec',
          value: 'asec()',
          btn: '\\sec^{-1}',
          cursorPos: 5,
        },
        {
          id: 'acsc',
          value: 'acsc()',
          btn: '\\csc^{-1}',
          cursorPos: 5,
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
          value: 'sinh()',
          btn: '\\sinh',
          cursorPos: 5,
        },
        {
          id: 'cosh',
          value: 'cosh()',
          btn: '\\cosh',
          cursorPos: 5,
        },
        {
          id: 'tanh',
          value: 'tanh()',
          btn: '\\tanh',
          cursorPos: 5,
        },
        {
          id: 'coth',
          value: 'coth()',
          btn: '\\coth',
          cursorPos: 5,
        },
        {
          id: 'sech',
          value: 'sech()',
          btn: '\\text{sech}',
          cursorPos: 5,
        },
        {
          id: 'csch',
          value: 'csch()',
          btn: '\\text{csch}',
          cursorPos: 5,
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
    label: isMobile ? 'f(x)' : 'Функції',
    keys: [
      [
        {
          id: 'x_n',
          value: 'x^n',
          btn: 'x^n',
        },
        {
          id: 'square',
          value: 'x^2',
          btn: 'x^2',
        },
        {
          id: 'cube',
          value: 'x^3',
          btn: 'x^3',
        },
        {
          id: 'two_n',
          value: '2^n',
          btn: '2^n',
        },
        {
          id: 'ten_n',
          value: '10^n',
          btn: '10^n',
        },
      ],
      [
        {
          id: 'root_n',
          value: 'nthRoot(x, n)',
          btn: '\\sqrt[n]{x}',
          cursorPos: 9,
        },
        {
          id: 'sqrt',
          value: 'sqrt()',
          btn: '\\sqrt{x}',
          cursorPos: 5,
        },
        {
          id: 'cbrt',
          value: 'cbrt()',
          btn: '\\sqrt[3]{x}',
          cursorPos: 5,
        },
        {
          id: 'modulo',
          value: 'abs()',
          btn: '\\text{abs}',
          cursorPos: 4,
        },
        {
          id: 'sgn',
          value: 'sign()',
          btn: '\\text{sgn}',
          cursorPos: 5,
        },
      ],
      [
        {
          id: 'log',
          value: `log(a, b)`,
          btn: '\\log_{x}',
          cursorPos: 5,
        },
        {
          id: 'log10',
          value: 'log10()',
          btn: '\\log',
          cursorPos: 6,
        },
        {
          id: 'ln',
          value: 'log()',
          btn: '\\ln',
          cursorPos: 4,
        },
        {
          id: 'e',
          value: 'e',
          btn: 'e',
        },
        {
          id: 'exp',
          value: 'exp()',
          btn: '\\exp',
          cursorPos: 4,
        },
      ],
      [],
    ],
  },
];

export const shared: Key[] = [
  {
    id: 'move_left',
    btn: (
      <span className="material-symbols-outlined text-xl">chevron_left</span>
    ),
  },
  {
    id: 'move_right',
    btn: (
      <span className="material-symbols-outlined text-xl">chevron_right</span>
    ),
  },
  {
    id: 'delete',
    btn: <span className="material-symbols-outlined text-xl">backspace</span>,
  },
  {
    id: 'clear',
    btn: <span className="material-symbols-outlined text-xl">close</span>,
  },
];
