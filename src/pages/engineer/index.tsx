import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { evaluate, chain, format } from 'mathjs';
import { Keyboard } from 'widgets/keyboard';

export const Engineer = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>('0');
  const [result, setResult] = useState<string | object>(value);
  const [caretPos, setCaretPos] = useState(1);

  useEffect(() => {
    inputRef.current?.focus();
    document.addEventListener('click', () => inputRef.current?.focus());
  }, []);

  const onValueChange1 = (v: ChangeEvent<HTMLInputElement>) => {
    if (v.target.value.length == 0) {
      setValue('0');
      setCaretPos(1);
      return;
    }
    if (v.target.value[0] == '0') {
      setValue(v.target.value.slice(1));
      setCaretPos(1);
    } else {
      setValue(v.target.value);
    }
  };

  const onValueChange2 = (v: string) => {
    setValue(v);
  };

  const onCaretPosChange = (newCaretPos: number) => {
    setCaretPos(newCaretPos);
  };

  useEffect(() => {
    inputRef.current?.setSelectionRange(caretPos, caretPos);
  }, [caretPos]);

  useEffect(() => {
    try {
      setResult(
        format(chain(evaluate(value)).round(15).done(), { upperExp: 9 }),
      );
    } catch (error) {
      setResult(error as object);
    }
  }, [value]);

  return (
    <div className="mx-auto grid h-[calc(100vh-64px)] max-w-4xl grid-rows-2 p-2">
      <div className="flex flex-col items-end gap-8 pr-8">
        <div className="flex w-full flex-1 flex-col justify-end text-5xl">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={onValueChange1}
            onClick={() => setCaretPos(inputRef.current?.selectionStart || 0)}
            className="w-full bg-neutral-950 text-right caret-blue-700 outline-none"
          />
        </div>
        <div className="flex-1 text-3xl text-neutral-400">
          {typeof result == 'string' ? result : 'Введіть коректний вираз'}
        </div>
      </div>
      <Keyboard
        caretPos={caretPos}
        value={value}
        onChange={onValueChange2}
        onCaretPosChange={onCaretPosChange}
      />
    </div>
  );
};
