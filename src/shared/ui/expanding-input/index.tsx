import {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

type ExpandingInputProps = {
  fontSize: number;
  value: string;
  onValueChange: (value: string) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const ExpandingInput = forwardRef<HTMLInputElement, ExpandingInputProps>(
  ({ fontSize, value, onValueChange, ...props }: ExpandingInputProps, ref) => {
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
          ref={ref}
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
  },
);
