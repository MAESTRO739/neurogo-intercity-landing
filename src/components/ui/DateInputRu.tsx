import React, {useEffect, useMemo, useRef, useState} from 'react';

type Props = {
  valueISO: string;                         // "YYYY-MM-DD" or ""
  onChangeISO: (iso: string) => void;       // emit "" when cleared or invalid
  minISO?: string;                          // inclusive, default: today
  maxISO?: string;                          // inclusive, default: today+1y
  placeholder?: string;                     // e.g. "дд.мм.гггг"
  leftIcon?: React.ReactNode;               // optional icon on the left
  inputClassName?: string;                  // tailwind classes for input
};

function toISO(d: Date) {
  const dd = new Date(d); dd.setHours(0,0,0,0);
  return dd.toISOString().slice(0,10);
}
function fromISO(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(+m[1], +m[2]-1, +m[3]);
  return isNaN(d.getTime()) ? null : d;
}
function fmtRU(iso: string) {
  const d = fromISO(iso);
  if (!d) return '';
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}
function parseRuToISO(s: string) {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);
  if (!m) return null;
  const d = new Date(+m[3], +m[2]-1, +m[1]);
  if (isNaN(d.getTime())) return null;
  // exactness check
  if (d.getFullYear() !== +m[3] || d.getMonth() !== +m[2]-1 || d.getDate() !== +m[1]) return null;
  return toISO(d);
}
function maskDateTyping(v: string) {
  const digits = v.replace(/\D/g, '').slice(0,8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0,2)}.${digits.slice(2)}`;
  return `${digits.slice(0,2)}.${digits.slice(2,4)}.${digits.slice(4)}`;
}
function clampISO(iso: string, minISO: string, maxISO: string) {
  if (!iso) return '';
  const d = fromISO(iso); if (!d) return '';
  const min = fromISO(minISO)!, max = fromISO(maxISO)!;
  if (d < min) return minISO;
  if (d > max) return maxISO;
  return iso;
}
function daysInMonth(y: number, m: number) {
  return new Date(y, m+1, 0).getDate();
}
// Monday-first index
function dowMon0(d: Date){ return (d.getDay()+6)%7; }

export default function DateInputRu({
  valueISO, onChangeISO, minISO, maxISO, placeholder="дд.мм.гггг",
  leftIcon, inputClassName=""
}: Props) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const defaultMin = toISO(today);
  const defaultMax = (() => { const d=new Date(today); d.setFullYear(d.getFullYear()+1); return toISO(d); })();

  const min = minISO || defaultMin;
  const max = maxISO || defaultMax;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState(valueISO ? fmtRU(valueISO) : '');
  const [view, setView] = useState(() => fromISO(valueISO || min) || today);
  const wrapRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => { setText(valueISO ? fmtRU(valueISO) : ''); }, [valueISO]);

  // close popover when clicking outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Build calendar matrix (6 rows x 7 days, Monday first)
  const grid = useMemo(() => {
    const y = view.getFullYear();
    const m = view.getMonth();
    const first = new Date(y, m, 1);
    const startOffset = dowMon0(first); // 0..6
    const daysCur = daysInMonth(y,m);
    const prevMonthDays = daysInMonth(y, m-1);
    const cells: {date: Date; inMonth: boolean; iso: string; disabled: boolean}[] = [];
    for (let i=0;i<42;i++){
      const dayNum = i - startOffset + 1;
      let d: Date;
      if (dayNum < 1) d = new Date(y, m-1, prevMonthDays + dayNum);
      else if (dayNum > daysCur) d = new Date(y, m+1, dayNum - daysCur);
      else d = new Date(y, m, dayNum);
      d.setHours(0,0,0,0);
      const iso = toISO(d);
      const disabled = iso < min || iso > max;
      cells.push({ date: d, inMonth: d.getMonth()===m, iso, disabled });
    }
    return cells;
  }, [view, min, max]);

  function commitISO(iso: string) {
    const clamped = clampISO(iso, min, max);
    onChangeISO(clamped);
    setText(clamped ? fmtRU(clamped) : '');
  }

  function handleTextChange(v: string) {
    setText(maskDateTyping(v));
  }

  function handleBlur() {
    if (!text) { onChangeISO(''); return; }
    const iso = parseRuToISO(text);
    if (iso) commitISO(iso);
    // if invalid: keep typed text; submit-time validation can handle it
  }

  function pick(d: Date) {
    const iso = toISO(d);
    commitISO(iso);
    setOpen(false);
    setView(d);
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
        onChange={(e)=>handleTextChange(e.target.value)}
        onFocus={()=>setOpen(true)}
        onBlur={handleBlur}
        className={`w-full ${hasIconPad} pr-9 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${inputClassName}`}
      />
      {/* right opener button (no native icon) */}
      <button
        type="button"
        onMouseDown={(e)=>e.preventDefault()}
        onClick={()=>setOpen(o=>!o)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
        aria-label="Открыть календарь"
      >
        ▾
      </button>

      {open && (
        <div className="absolute z-20 mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
          <div className="flex items-center justify-between px-1 py-1">
            <button
              type="button"
              className="px-2 py-1 rounded hover:bg-gray-100"
              onClick={()=>setView(new Date(view.getFullYear(), view.getMonth()-1, 1))}
            >‹</button>
            <div className="text-sm font-medium">
              {view.toLocaleDateString('ru-RU', {month:'long', year:'numeric'})}
            </div>
            <button
              type="button"
              className="px-2 py-1 rounded hover:bg-gray-100"
              onClick={()=>setView(new Date(view.getFullYear(), view.getMonth()+1, 1))}
            >›</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 px-1">
            {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d=>(
              <div key={d} className="text-center py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 px-1 pb-2">
            {grid.map((c, i)=> {
              const selected = valueISO && c.iso === valueISO;
              const muted = !c.inMonth;
              const dis = c.disabled;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={dis}
                  onClick={()=>pick(c.date)}
                  className={[
                    'h-8 rounded text-sm',
                    'hover:bg-gray-100',
                    muted ? 'text-gray-400' : 'text-gray-900',
                    dis ? 'opacity-40 cursor-not-allowed' : '',
                    selected ? 'bg-violet-600 text-white hover:bg-violet-600' : ''
                  ].join(' ')}
                >
                  {c.date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between px-1 pb-1">
            <button
              type="button"
              className="text-xs px-2 py-1 rounded hover:bg-gray-100"
              onClick={()=>{ const t = fromISO(clampISO(toISO(today), min, max))!; setView(t); pick(t); }}
            >Сегодня</button>
            <button
              type="button"
              className="text-xs px-2 py-1 rounded hover:bg-gray-100"
              onClick={()=>{ onChangeISO(''); setText(''); setOpen(false); }}
            >Очистить</button>
          </div>
        </div>
      )}
    </div>
  );
}
