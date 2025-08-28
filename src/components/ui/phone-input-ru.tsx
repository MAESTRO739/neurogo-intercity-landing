import React, { useEffect, useRef, useState } from 'react';

type Props = {
  valueE164: string;                       // "+7XXXXXXXXXX" или ""
  onChangeE164: (val: string) => void;     // эмитим валидное или "" (если не валидно)
  placeholder?: string;
  leftIcon?: React.ReactNode;
  inputClassName?: string;
};

function normalizeDigits(raw: string) {
  let d = raw.replace(/\D/g, '');
  if (!d) return '';
  // если пользователь начинает с 8 → считаем как +7
  if (d[0] === '8') d = '7' + d.slice(1);
  // если начинается с 9 (часто так вводят) → добавим код страны 7
  if (d[0] === '9') d = '7' + d;
  // оставим только первую "7" + ещё 10 цифр максимум
  if (d[0] !== '7') d = '7' + d.slice(0, 10);
  return d.slice(0, 11);
}

function toE164(digits: string) {
  return digits.length === 11 && digits[0] === '7' ? `+7${digits.slice(1)}` : '';
}

function formatDisplay(digits: string) {
  // "+7 999 123-45-67"
  if (!digits) return '';
  const local = digits[0] === '7' ? digits.slice(1) : digits;
  const a = local.slice(0, 3);
  const b = local.slice(3, 6);
  const c = local.slice(6, 8);
  const e = local.slice(8, 10);
  let out = '+7';
  if (a) out += ' ' + a;
  if (b) out += ' ' + b;
  if (c) out += '-' + c;
  if (e) out += '-' + e;
  return out;
}

export default function PhoneInputRu({
  valueE164, onChangeE164, placeholder = '+7 ___ ___-__-__', leftIcon, inputClassName = ''
}: Props) {
  const [digits, setDigits] = useState(''); // "7XXXXXXXXXX"
  const inputRef = useRef<HTMLInputElement | null>(null);

  // sync from parent
  useEffect(() => {
    if (!valueE164) { setDigits(''); return; }
    const d = valueE164.replace(/\D/g, '');
    if (d.length === 11 && d.startsWith('7')) setDigits(d);
  }, [valueE164]);

  function commit(newDigits: string) {
    setDigits(newDigits);
    onChangeE164(toE164(newDigits)); // отдаём валидный е164 или ""
  }

  function onInputChange(v: string) {
    const nd = normalizeDigits(v);
    commit(nd);
  }

  const hasIconPad = leftIcon ? 'pl-10' : 'pl-4';

  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {leftIcon}
        </div>
      )}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder={placeholder}
        value={formatDisplay(digits)}
        onChange={(e) => onInputChange(e.target.value)}
        className={`w-full ${hasIconPad} pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${inputClassName}`}
      />
    </div>
  );
}
