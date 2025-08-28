import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, Tag, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import SuggestInput from '@/components/SuggestInput';
import DateInputRu from '@/components/ui/DateInputRu';
import TimeInput24 from '@/components/ui/TimeInput24';


type Mode = 'form' | 'confirm' | 'success';

const CLASS_MAP: Record<string, 'Эконом' | 'Комфорт' | 'Бизнес' | 'Минивэн'> = {
  economy: 'Эконом',
  comfort: 'Комфорт',
  business: 'Бизнес',
  minivan: 'Минивэн',
};

const BookingFlow = () => {
  const [mode, setMode] = useState<Mode>('form');

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    carClass: 'comfort',
    promoCode: '',
    childSeat: false,
  });

  type Picked = { uri: string; label: string } | null;

  const [fromPick, setFromPick] = useState<Picked>(null);
  const [toPick, setToPick] = useState<Picked>(null);

  const [showPromoCode, setShowPromoCode] = useState(false);
  const [km, setKm] = useState<number | null>(null);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [phone, setPhone] = useState('');
  const [submitState, setSubmitState] = useState<'idle'|'submitting'|'done'>('idle');

  const [dateText, setDateText] = useState(''); // dd.mm.yyyy
  const [timeText, setTimeText] = useState(''); // HH:MM

  const [estimating, setEstimating] = useState(false);

  function parseRuDateToISO(ddmmyyyy: string): string | null {
    const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(ddmmyyyy);
    if (!m) return null;
    const dd = +m[1], mm = +m[2], yyyy = +m[3];
    // limit: today..+1 year
    const today = new Date(); today.setHours(0,0,0,0);
    const max = new Date(today); max.setFullYear(max.getFullYear() + 1);
    const d = new Date(yyyy, mm - 1, dd);
    if (isNaN(d.getTime())) return null;
    // exactness check (handles 31/02 etc.)
    if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) return null;
    if (d < today || d > max) return null;
    return d.toISOString().slice(0,10); // YYYY-MM-DD
  }

  function parseTimeHHMM(t: string): string | null {
    const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(t);
    if (!m) return null;
    return `${m[1]}:${m[2]}`;
  }

  function isoToRu(iso: string): string {
    // for displaying in Confirm step if needed
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
    const [y,m,d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }

  async function handleEstimate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEstimating(true);
    const { from, to, carClass, childSeat, promoCode } = formData;
    if (!from || !to) { setError('Введите адреса'); return; }

    // derive from display if formData missing
    const vDate = formData.date || parseRuDateToISO(dateText || '');
    const vTime = formData.time || parseTimeHHMM(timeText || '');

    if (!vDate || !vTime) {
      setError('Проверьте дату и время (дд.мм.гггг и чч:мм, сегодня…+1 год)');
      return;
    }

    // ensure canonical values are set once valid
    if (vDate !== formData.date || vTime !== formData.time) {
      setFormData({ ...formData, date: vDate, time: vTime });
    }

    const datetimeLocal = `${vDate}T${vTime}`;

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || ''; // use vite proxy or env
      const res = await fetch(`${API_BASE}/api/route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromPick?.uri ? { uri: fromPick.uri } : { text: from },
          to:   toPick?.uri   ? { uri: toPick.uri }   : { text: to },
          datetimeLocal,
          childSeat,
          promoCode,
          carClass  
        })
      });
      console.log('route response', res);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Ошибка сервера при расчёте маршрута');
      }

      const data = await res.json();
      const dKm = Number(data.km) || (data.distance_m ? data.distance_m / 1000 : 0);
      setKm(dKm);

      setEstimate(data.price ?? null);
      setMode('confirm');
    } catch (err: any) {
      setError(err?.message || 'Не удалось получить маршрут');
    } finally {
      setEstimating(false);
    }
  }

  function handleBack() {
    setMode('form');
    setError(null);
  }

  async function handlePlaceOrder() {
    if (!estimate) { setError('Сначала рассчитайте стоимость'); return; }
    if (!phone || phone.replace(/\D/g,'').length < 10) { setError('Укажите телефон'); return; }
    setSubmitState('submitting');
    setTimeout(() => {
      setSubmitState('done');
      setMode('success');
    }, 600);
  }

  // === STEP 1: WHITE FORM (unchanged visual style) ===
  if (mode === 'form') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full max-w-[470px] mx-auto">
        <form onSubmit={handleEstimate} className="space-y-4 sm:space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              Узнать стоимость поездки
            </h3>

            {/* FROM */}
            <SuggestInput
              value={formData.from}
              onChange={(v) => {
                setFormData({ ...formData, from: v });
                if (fromPick && v !== fromPick.label) setFromPick(null);
              }}
              onSelect={(item) => setFromPick({ uri: item.uri, label: item.title })}
              placeholder="Откуда"
              leftIcon={<MapPin className="h-5 w-5" />}
            />

            {/* TO */}
            <SuggestInput
              value={formData.to}
              onChange={(v) => {
                setFormData({ ...formData, to: v });
                if (toPick && v !== toPick.label) setToPick(null);
              }}
              onSelect={(item) => setToPick({ uri: item.uri, label: item.title })}
              placeholder="Куда"
              leftIcon={<MapPin className="h-5 w-5" />}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DateInputRu
                valueISO={formData.date}
                onChangeISO={(iso) => setFormData({ ...formData, date: iso })}
                leftIcon={<Calendar className="h-5 w-5" />}
              />
              <TimeInput24
                valueHHMM={formData.time}
                onChangeHHMM={(hhmm) => setFormData({ ...formData, time: hhmm })}
                leftIcon={<Clock className="h-5 w-5" />}
                stepMinutes={15}
              />
            </div>

            {/* Тариф + Детское кресло */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={formData.carClass}
                  onChange={(e) => setFormData({ ...formData, carClass: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white focus:outline-none"
                >
                  <option value="economy">Эконом</option>
                  <option value="comfort">Комфорт</option>
                  <option value="business">Бизнес</option>
                  <option value="minivan">Минивэн</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={formData.childSeat}
                  onChange={(e) => setFormData({ ...formData, childSeat: e.target.checked })}
                  className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 focus:ring-2 focus:outline-none"
                />
                <span className="text-gray-700 font-medium text-sm">Детское кресло</span>
              </label>
            </div>

            {/* Промокод */}
            <div className="border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => setShowPromoCode(!showPromoCode)}
                className="flex items-center justify-between w-full text-left text-gray-600 hover:text-violet-600 transition-colors"
              >
                <span className="font-medium">У меня есть промокод</span>
                {showPromoCode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showPromoCode && (
                <div className="mt-3 relative">
                  <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:outline-none"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="mt-2 rounded-md bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 text-sm">
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={estimating}
            className="w-full bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white py-3 sm:py-4 rounded-lg hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-all font-medium text-base sm:text-lg flex items-center justify-center gap-2"
          >
            {estimating && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
            {estimating ? 'Считаем…' : 'Рассчитать стоимость'}
          </button>
        </form>
      </div>
    );
  }

  // === STEP 2: CONFIRM (white card + cleaner buttons layout) ===
  if (mode === 'confirm') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 lg:p-7 w-full">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">Проверьте детали</h3>

        <div className="space-y-3 text-sm sm:text-base text-gray-800">
          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Маршрут</span>
            <span className="text-right">
              {(fromPick?.label || formData.from || '—')} → {(toPick?.label || formData.to || '—')}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Дата и время</span>
            <span className="text-right">
              {formData.date ? isoToRu(formData.date) : (dateText || '—')} {formData.time || timeText || ''}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Тариф</span>
            <span className="text-right">{CLASS_MAP[formData.carClass]}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Детское кресло</span>
            <span className="text-right">{formData.childSeat ? 'Да (+300₽)' : 'Нет'}</span>
          </div>
          {km !== null && (
            <div className="flex justify-between gap-3">
              <span className="text-gray-500">Расстояние</span>
              <span className="text-right">{km.toFixed(1)} км</span>
            </div>
          )}
        </div>

        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Оценочная стоимость</span>
            <strong className="text-2xl text-gray-900">{estimate ? `${estimate} ₽` : '—'}</strong>
          </div>
        </div>

        {/* Cleaner responsive controls: grid with clear structure */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Назад
          </button>

          <input
            type="tel"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            placeholder="+7 ___ ___-__-__"
            className="sm:col-span-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={submitState==='submitting'}
            className="rounded-lg px-5 py-3 bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-white hover:opacity-90 disabled:opacity-70"
          >
            {submitState==='submitting' ? 'Отправляем…' : 'Оформить заказ'}
          </button>
        </div>

        {error && (
          <div className="mt-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}
      </div>
    );
  }

  // === STEP 3: SUCCESS ===
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Заказ принят!</h3>
      <p className="text-gray-700">
        Диспетчер позвонит в течение 3 минут для подтверждения деталей. Затем водитель свяжется с вами,
        и придёт SMS с информацией о поездке.
      </p>
      <button
        type="button"
        onClick={() => { setMode('form'); setSubmitState('idle'); setEstimate(null); setKm(null); setPhone(''); }}
        className="mt-5 rounded-lg px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Создать новый расчёт
      </button>
    </div>
  );
};

export default BookingFlow;
