import { HTMLAttributes, useEffect, useRef, useState } from 'react';

type ExpandingInputProps = {
  fontSize: number;
  value: string;
  onValueChange: (value: string) => void;
} & HTMLAttributes<HTMLInputElement>;

export const ExpandingInput = ({
  fontSize,
  value,
  onValueChange,
  ...props
}: ExpandingInputProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(16);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth + 24 || 16);
    }
  }, [value]);

  return (
    <>
      <input
        style={{ width, fontSize }}
        value={value}
        onChange={e => onValueChange(e.target.value)}
        {...props}
      />
      <span
        ref={spanRef}
        style={{ fontSize }}
        className="absolute left-0 top-0 opacity-0"
      >
        {value}
      </span>
    </>
  );
};
