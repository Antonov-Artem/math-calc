import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { AnimatePresence, motion } from 'motion/react';
import { clsx } from 'clsx/lite';
import colors from 'tailwindcss/colors';
import { Keyboard } from 'widgets/keyboard';
import { isMobile } from 'react-device-detect';
import { useOnClickOutside } from 'usehooks-ts';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { abs, range, round } from 'mathjs';
import { math } from 'shared/config';

type Value = {
  id: string;
  value: string;
  color: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

const x = range(-100, 100, 0.1, true).toArray();

export const Graphic = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Value[]>([
    {
      id: uuid(),
      value: '',
      color: colors.red[600],
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [caretPos, setCaretPos] = useState(0);
  const [selectedInputId, setSelectedInputId] = useState(values[0]?.id);

  const onAddValueClick = () =>
    setValues([
      ...values,
      {
        id: uuid(),
        value: '',
        // @ts-ignore
        color: Object.keys(colors).map(c => colors[c][600])[
          Math.floor(Math.random() * 16) + 10
        ],
      },
    ]);

  const onDeleteValueClick = (id: string) => {
    setValues(values.filter(v => v.id != id));
  };

  const onInputValueChange = (value: Value) => {
    setValues(
      values.map(v => (v.id == value.id ? { ...v, value: value.value } : v)),
    );
    setCaretPos(inputRef.current?.selectionStart || 0);
  };

  const onKeyboardValueChange = (value: string, id?: string) => {
    setValues(values.map(v => (v.id == id ? { ...v, value } : v)));
  };

  const onCaretPosChange = (newCaretPos: number) => {
    setCaretPos(newCaretPos);
  };

  useEffect(() => {
    inputRef.current?.setSelectionRange(caretPos, caretPos);
  }, [caretPos]);

  useEffect(() => {
    if (values.length == 0) {
      const id = uuid();
      setValues([
        {
          id,
          value: '',
          // @ts-ignore
          color: Object.keys(colors).map(c => colors[c][600])[
            Math.floor(Math.random() * 16) + 10
          ],
        },
      ]);
      setSelectedInputId(id);
    }
  }, [values]);

  useOnClickOutside([inputRef, keyboardRef], () => setIsKeyboardVisible(false));

  return (
    <div className="h-[calc(100svh-64px)] bg-white">
      <motion.button
        initial={{
          x: isMobile ? 0 : isDrawerOpen ? '25rem' : 0,
          y: isMobile
            ? isDrawerOpen
              ? innerHeight / 2 - 111
              : innerHeight - 111
            : 0,
        }}
        animate={{
          x: isMobile ? 0 : isDrawerOpen ? '25rem' : 0,
          y: isMobile
            ? isDrawerOpen
              ? innerHeight / 2 - 111
              : innerHeight - 111
            : 0,
        }}
        transition={{ duration: 0.25 }}
        className={clsx(
          'absolute z-[1] m-1 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 transition-colors hover:bg-neutral-800',
          isMobile ? 'right-0' : 'left-0',
        )}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <span className="material-symbols-outlined text-xl">
          {isMobile
            ? isDrawerOpen
              ? 'keyboard_double_arrow_down'
              : 'keyboard_double_arrow_up'
            : isDrawerOpen
              ? 'keyboard_double_arrow_left'
              : 'keyboard_double_arrow_right'}
        </span>
      </motion.button>
      <AnimatePresence>
        {isKeyboardVisible && (
          <motion.div
            ref={keyboardRef}
            exit={{ y: '20rem' }}
            initial={{ y: '20rem' }}
            animate={{ y: '0' }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 z-[2] flex h-80 w-screen justify-center border-t border-neutral-600 bg-neutral-950 p-2"
          >
            <div className={isMobile ? 'w-full' : 'w-1/2'}>
              <Keyboard
                inputId={selectedInputId}
                value={values.find(v => v.id == selectedInputId)?.value || ''}
                onChange={onKeyboardValueChange}
                caretPos={caretPos}
                onCaretPosChange={onCaretPosChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            exit={{
              x: isMobile ? 0 : isDrawerOpen ? -550 : 0,
              y: isMobile ? innerHeight - 64 : 0,
            }}
            initial={{
              x: isMobile ? 0 : isDrawerOpen ? -550 : 0,
              y: isMobile ? innerHeight - 64 : 0,
            }}
            animate={{
              x: isMobile ? 0 : isDrawerOpen ? 0 : -550,
              y: isMobile ? innerHeight / 2 - 64 : 0,
            }}
            transition={{ duration: 0.25 }}
            className={clsx(
              'absolute flex flex-col items-center gap-2 overflow-auto bg-neutral-950 p-2',
              isMobile ? 'h-[50svh] w-full' : 'h-[calc(100svh-64px)] w-[400px]',
            )}
          >
            <AnimatePresence>
              {values.map((v, i) => (
                <motion.div
                  key={v.id}
                  exit={{ x: -15, opacity: 0 }}
                  initial={{ x: -15, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="grid h-12 w-full grid-cols-[2.5rem_auto_3rem] rounded-lg bg-neutral-900"
                >
                  <div
                    className="flex h-12 w-10 items-center justify-center rounded-lg text-sm"
                    style={{
                      background: v.color,
                    }}
                  >
                    {i + 1}
                  </div>
                  <input
                    ref={inputRef}
                    value={values[i].value}
                    onChange={e =>
                      onInputValueChange({ ...v, value: e.target.value })
                    }
                    onClick={() => {
                      setIsKeyboardVisible(true);
                      setSelectedInputId(v.id);
                      setCaretPos(v.value.length);
                    }}
                    className="bg-transparent px-3 outline-none"
                  />
                  <button
                    className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:bg-neutral-800"
                    onClick={() => onDeleteValueClick(v.id)}
                  >
                    <span className="material-symbols-outlined text-xl text-neutral-300">
                      close
                    </span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <button
              className={clsx(
                'flex h-9 w-fit items-center gap-2 rounded-lg bg-blue-700 pl-3 pr-4 text-sm transition-colors hover:bg-blue-800',
                values.length ? 'my-4' : 'my-2',
              )}
              onClick={onAddValueClick}
            >
              <span className="material-symbols-outlined text-xl">add</span>
              Додати вираз
            </button>
            {!isMobile && (
              <motion.button
                animate={{ y: isKeyboardVisible ? '-20rem' : '0' }}
                transition={{ duration: 0.25 }}
                className="fixed bottom-0 left-0 m-3 flex h-9 items-center justify-center gap-1 rounded-lg bg-blue-700 pl-3 pr-2 transition-colors hover:bg-blue-800"
                onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
              >
                <span className="material-symbols-outlined text-xl">
                  keyboard
                </span>
                <motion.span
                  animate={{ rotate: isKeyboardVisible ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="material-symbols-outlined text-xl"
                >
                  keyboard_arrow_up
                </motion.span>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Line
        options={{
          responsive: true,
          animation: false,
          maintainAspectRatio: false,
          aspectRatio: 1,
          scales: {
            x: {
              type: 'linear',
              min: -10,
              max: 10,
              grid: {
                color(ctx) {
                  if (round(abs(ctx.tick.value)) <= 1e-9) {
                    return 'rgba(0, 0, 0, 1)';
                  }

                  return 'rgba(0, 0, 0, 0.1)';
                },
              },
            },
            y: {
              type: 'linear',
              min: -5,
              max: 5,
              grid: {
                color(ctx) {
                  if (round(abs(ctx.tick.value)) <= 1e-9) {
                    return 'rgba(0, 0, 0, 1)';
                  }

                  return 'rgba(0, 0, 0, 0.1)';
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            decimation: {
              enabled: true,
              algorithm: 'lttb',
              threshold: 1000,
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
        }}
        data={{
          labels: [...x],
          datasets: values.map(v => ({
            data: x.map(xi => {
              try {
                return Number(math.evaluate(v.value, { x: xi }));
              } catch (error: any) {
                return null;
              }
            }),
            borderColor: v.color,
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.4,
          })),
        }}
      />
    </div>
  );
};
