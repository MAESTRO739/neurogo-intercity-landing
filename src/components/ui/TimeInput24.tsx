import React, {useEffect, useMemo, useRef, useState} from 'react';

type Props = {
  valueHHMM: string;                      // "HH:MM" or ""
  onChangeHHMM: (hhmm: string) => void;   // emit "" when cleared/invalid
  stepMinutes?: number;                   // default 15
  placeholder?: string;                   // "чч:мм"
  leftIcon?: React.ReactNode;
  inputClassName?: string;
};

function clamp(n: number, lo: number, hi: number) { return Math.min(hi, Math.max(lo, n)); }

function smartTimeMask(raw: string, prev: string) {
  let s = raw.replace(/[^\d:]/g, '');
  const colonIdx = s.indexOf(':');

  // If colon present, respect user's typing and pad hour
  if (colonIdx >= 0) {
    let h = s.slice(0, colonIdx).replace(/\D/g,'').slice(0,2);
    let m = s.slice(colonIdx + 1).replace(/\D/g,'').slice(0,2);

    if (h.length === 0) h = '00';
    if (h.length === 1) h = h.padStart(2,'0'); // "7:…" -> "07:…"
    if (h.length === 2) h = String(clamp(+h || 0, 0, 23)).padStart(2,'0');

    // minutes: keep as typed (0..2 digits) while editing, clamp only when full
    if (m.length === 2) m = String(clamp(+m || 0, 0, 59)).padStart(2,'0');

    return `${h}:${m}`;
  }

  // No colon: infer intelligently from digits
  const d = s.replace(/\D/g,'').slice(0,4);
  if (d.length <= 2) return d;                // "7", "12"
  if (d.length === 3) {                       // prefer "hmm" → "0h:mm"
    const h = d.slice(0,1);
    const mm = d.slice(1);
    return `${h.padStart(2,'0')}:${mm}`;
  }
  // length 4 → "hhmm"
  let hh = d.slice(0,2);
  let mm = d.slice(2,4);
  hh = String(clamp(+hh || 0, 0, 23)).padStart(2,'0');
  mm = String(clamp(+mm || 0, 0, 59)).padStart(2,'0');
  return `${hh}:${mm}`;
}

function finalizeHHMM(text: string): string | null {
  // Normalize to "HH:MM" on blur/enter
  let s = text.trim();
  if (!s) return '';
  s = s.replace(/[^\d:]/g,'');
  if (!s.includes(':')) {
    // "h" or "hh" → HH:00 ; "hmm"/"hhmm" handled by mask path
    const d = s.replace(/\D/g,'');
    if (d.length === 1) return `0${d}:00`;
    if (d.length === 2) {
      const hh = String(clamp(+d, 0, 23)).padStart(2,'0');
      return `${hh}:00`;
    }
    if (d.length === 3) {
      const h = d.slice(0,1);
      const mm = String(clamp(+d.slice(1), 0, 59)).padStart(2,'0');
      return `${h.padStart(2,'0')}:${mm}`;
    }
    if (d.length === 4) {
      const hh = String(clamp(+d.slice(0,2), 0, 23)).padStart(2,'0');
      const mm = String(clamp(+d.slice(2,4), 0, 59)).padStart(2,'0');
      return `${hh}:${mm}`;
    }
    return null;
  } else {
    const [hRaw, mRaw=''] = s.split(':');
    const hh = String(clamp(+(hRaw || '0'), 0, 23)).padStart(2,'0');
    const mm = String(clamp(+(mRaw.padEnd(2,'0').slice(0,2) || '0'), 0, 59)).padStart(2,'0');
    return `${hh}:${mm}`;
  }
}

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
    const p = finalizeHHMM(text);
    if (p !== null) commit(p); // commit "" if user cleared; or normalized HH:MM
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      const p = finalizeHHMM(text);
      if (p !== null) commit(p);
      else setOpen(false);
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
        onChange={(e) => setText(smartTimeMask(e.target.value, text))}
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
