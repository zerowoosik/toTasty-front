import { useState, useEffect } from 'react';

function formatWithComma(value: number | string): string {
  const num = typeof value === 'number' ? value : Number(value.toString().replace(/,/g, ''));
  return Number.isNaN(num) ? '' : num.toLocaleString();
}

function parseNumber(value: string): number {
  const num = Number(value.replace(/,/g, ''));
  return Number.isNaN(num) ? 0 : num;
}

export default function useCommaInput(initial: number) {
  const [inputValue, setInputValue] = useState(formatWithComma(initial));

  useEffect(() => {
    setInputValue(formatWithComma(initial));
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const numeric = parseNumber(raw);

    const onlyDigits = /^\d*$/.test(raw.replace(/,/g, ''));
    if (onlyDigits) {
      setInputValue(raw);
      return numeric;
    }

    return null;
  };

  const handleBlur = () => {
    setInputValue(formatWithComma(parseNumber(inputValue)));
  };

  const handleFocus = () => {
    setInputValue(String(parseNumber(inputValue)));
  };

  return {
    inputValue,
    handleChange,
    handleBlur,
    handleFocus,
  };
}
