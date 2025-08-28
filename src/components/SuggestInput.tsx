// SuggestInput.tsx
import { Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Highlight = { b: number; e: number };
type SuggestItem = {
  title: string;
  subtitle?: string;
  locality?: string;
  uri: string;
  titleHl?: Highlight[];
  subtitleHl?: Highlight[];
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSelect: (item: SuggestItem) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;        // wrapper
  inputClassName?: string;   // input only
  leftIcon?: React.ReactNode;
};

function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export default function SuggestInput({
  value, onChange, onSelect, placeholder, disabled,
  className, inputClassName, leftIcon
}: Props) {
  const debounced = useDebounced(value, 250);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<SuggestItem[]>([]);
  const [active, setActive] = useState(0);
  const abortRef = useRef<AbortController | null>(null);
  const skipNextFetchRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  type HlRange = { b: number; e: number };

  useEffect(() => {
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    if (!debounced || debounced.trim().length < 2) {
      setItems([]); setOpen(false); return;
    }
    setLoading(true);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    
    const API_BASE = (import.meta as any).env?.VITE_API_BASE || '';
    fetch(`${API_BASE}/api/geosuggest?text=${encodeURIComponent(debounced)}`, { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`geosuggest ${r.status}`)))
      .then((data: SuggestItem[]) => {
        setItems(data || []); setOpen(!!(data && data.length)); setActive(0);
      })
      .catch((err) => { if (!ctrl.signal.aborted) { console.warn('geosuggest failed:', err); setItems([]); setOpen(false); } })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [debounced]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function renderHL(text: string, ranges?: HlRange[], fallbackQuery?: string) {
    if (!text) return null;

    // Use Yandex-provided ranges if present
    if (ranges && ranges.length) {
      const out: React.ReactNode[] = [];
      let cursor = 0;

      // Sort and clamp ranges
      const sorted = [...ranges]
        .map(r => ({ b: Math.max(0, r.b|0), e: Math.max(0, r.e|0) }))
        .filter(r => r.b < r.e && r.b < text.length)
        .sort((a,b) => a.b - b.b);

      sorted.forEach((r, idx) => {
        const start = Math.min(r.b, text.length);
        const end = Math.min(r.e, text.length);
        if (cursor < start) out.push(<span key={`n-${idx}-${cursor}`}>{text.slice(cursor, start)}</span>);
        out.push(<mark key={`h-${idx}-${start}`} className="bg-transparent text-violet-600 font-semibold">{text.slice(start, end)}</mark>);
        cursor = end;
      });
      if (cursor < text.length) out.push(<span key={`tail-${cursor}`}>{text.slice(cursor)}</span>);
      return out;
    }

    // Fallback: highlight first case-insensitive match of user input
    const q = (fallbackQuery || '').trim();
    if (!q) return text;

    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return text;
    const j = i + q.length;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-transparent text-violet-600 font-semibold">{text.slice(i, j)}</mark>
        {text.slice(j)}
      </>
    );
  }

    // Inside SuggestInput.tsx
  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log('handleKey', { key: e.key, open, items, active });
    if (!open || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const pick = items[active];
      if (pick) {
        // prevent immediate re-fetch right after selection
        skipNextFetchRef.current = true;
        abortRef.current?.abort();

        onSelect(pick);
        onChange(pick.title);

        // fully close & clear the list so it doesn't reopen
        setItems([]);
        setOpen(false);
        setActive(0);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const hasIcon = !!leftIcon;

  return (
    <div ref={wrapRef} className={`relative ${className || ''}`}>
      {hasIcon && (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {leftIcon}
        </div>
      )}

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => { onChange(e.target.value); }}
        onFocus={() => { if (items.length) setOpen(true); }}
        onKeyDown={handleKey}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:outline-none"
      />

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-auto">
          {loading && (
            <div className="px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Ищем адрес…
            </div>
          )}
          {!loading && items.length === 0 && <div className="px-3 py-2 text-sm text-gray-500">Ничего не найдено</div>}
          {items.map((it, idx) => (
            <button
              key={it.uri}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                skipNextFetchRef.current = true;
                abortRef.current?.abort();
                onSelect(it);
                onChange(it.title);
                setItems([]);
                setOpen(false);
                setActive(0);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${idx === active ? 'bg-gray-50' : ''}`}
              >
                <div className="text-gray-900 text-sm font-medium">
                  {renderHL(it.title, it.titleHl, debounced)}
                </div>
                <div className="text-gray-500 text-xs">
                  {it.subtitle
                    ? renderHL(it.subtitle, it.subtitleHl, debounced)
                    : renderHL(it.locality || '', undefined, debounced)
                  }
                </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
