import React, {useEffect, useMemo, useRef, useState} from 'react';

type Props = {
  valueHHMM: string;                      // "HH:MM" or ""
  onChangeHHMM: (hhmm: string) => void;   // emit "" when cleared/invalid
  stepMinutes?: number;                   // default 15
  placeholder?: string;                   // "чч:мм"
  leftIcon?: React.ReactNode;
  inputClassName?: string;
};

function maskTimeTyping(v: string) {
  const d = v.replace(/\D/g,'').slice(0,4);
  if (d.length <= 2) return d;
  return `${d.slice(0,2)}:${d.slice(2)}`;
}
function parseHHMM(s: string) {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(s);
  return m ? `${m[1]}:${m[2]}` : null;
}

export default function TimeInput24({
  valueHHMM, onChangeHHMM, stepMinutes=15, placeholder="чч:мм",
  leftIcon, inputClassName=""
}: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(valueHHMM || '');
  const wrapRef = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{ setText(valueHHMM || ''); }, [valueHHMM]);

  // close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const options = useMemo(() => {
    const out: string[] = [];
    const step = Math.max(1, Math.min(60, stepMinutes|0));
    for (let h=0; h<24; h++) {
      for (let m=0; m<60; m+=step) {
        out.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
      }
    }
    return out;
  }, [stepMinutes]);

  function commit(s: string) {
    onChangeHHMM(s);
    setText(s);
    setOpen(false);
  }

  function handleBlur() {
    if (!text) { onChangeHHMM(''); return; }
    const p = parseHHMM(text);
    if (p) commit(p);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;                     // only when the dropdown is open
    if (e.key === 'Enter') {
      e.preventDefault();                  // avoid form submit
      const parsed = parseHHMM(text);
      if (parsed) commit(parsed);          // commit typed value if valid
      else setOpen(false);                 // otherwise just close
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    }
}

  const hasIconPad = leftIcon ? 'pl-10' : 'pl-4';

  return (
    <div ref={wrapRef} className="relative w-full">
      {leftIcon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {leftIcon}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e)=>setText(maskTimeTyping(e.target.value))}
        onFocus={()=>setOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown} 
        className={`w-full ${hasIconPad} pr-9 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${inputClassName}`}
      />
      <button
        type="button"
        onMouseDown={(e)=>e.preventDefault()}
        onClick={()=>setOpen(o=>!o)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
        aria-label="Открыть список времени"
      >
        ▾
      </button>

      {open && (
        <div className="absolute z-20 mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-auto">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onMouseDown={(e)=>e.preventDefault()}
              onClick={()=>commit(opt)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${opt===valueHHMM ? 'bg-violet-600 text-white hover:bg-violet-600' : ''}`}
            >
              {opt}
            </button>
          ))}
          <div className="flex justify-between px-2 py-1">
            <button
              type="button"
              className="text-xs px-2 py-1 rounded hover:bg-gray-100"
              onClick={()=>{ onChangeHHMM(''); setText(''); setOpen(false); }}
            >Очистить</button>
          </div>
        </div>
      )}
    </div>
  );
}
