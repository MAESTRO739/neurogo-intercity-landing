import { useEffect, useState } from 'react';

export default function DriverIntake() {
  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '', phone: '', city: '',
    car_make: '', car_model: '', car_plate: '',
    child_seat: false, taxi_license: false,
  });
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [carFile, setCarFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get('t');
    const fromSession = sessionStorage.getItem('driver-intake-token');
    const t = fromQuery || fromSession;

    if (t) {
      setToken(t);
      sessionStorage.setItem('driver-intake-token', t);
      if (fromQuery) {
        url.searchParams.delete('t');
        window.history.replaceState({}, '', url.toString());
      }
    } else {
      setToken(null);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!token) { setErr('Нет доступа'); return; }

    setBusy(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === 'boolean') fd.append(k, v ? '1' : '0');
        else if (v != null) fd.append(k, String(v));
      });
      if (licenseFile) fd.append('license_photo', licenseFile);
      if (carFile) fd.append('car_photo', carFile);

      const API_BASE = import.meta.env.VITE_API_BASE || '';
      const res = await fetch(`${API_BASE}/api/public/driver-intake?t=${encodeURIComponent(token)}`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || 'Ошибка отправки формы');
      }
      setDone(true);
    } catch (e: any) {
      setErr(e?.message || 'Ошибка отправки формы');
    } finally {
      setBusy(false);
    }
  }

  if (token === null) {
    return (
      <div className="max-w-xl mx-auto rounded-lg border p-6 bg-white text-center my-20">
        <h2 className="text-xl font-semibold mb-2">Доступ по приглашению</h2>
        <p className="text-muted-foreground">
          Для заполнения анкеты используйте персональную ссылку из сообщения.
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto rounded-lg border p-6 bg-white my-20 text-center">
        <h2 className="text-xl font-semibold mb-2">Заявка принята</h2>
        <p className="text-muted-foreground">Мы свяжемся с вами после проверки данных.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto rounded-lg border p-6 bg-white my-20">
      <h2 className="text-xl font-semibold mb-4">Анкета водителя</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="ФИО *"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="w-full border rounded px-3 py-2" placeholder="Телефон *"
               value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
        <input className="w-full border rounded px-3 py-2" placeholder="Город"
               value={form.city||''} onChange={e=>setForm({...form, city:e.target.value})}/>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input className="border rounded px-3 py-2" placeholder="Марка авто"
                 value={form.car_make||''} onChange={e=>setForm({...form, car_make:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Модель"
                 value={form.car_model||''} onChange={e=>setForm({...form, car_model:e.target.value})}/>
          <input className="border rounded px-3 py-2" placeholder="Госномер"
                 value={form.car_plate||''} onChange={e=>setForm({...form, car_plate:e.target.value})}/>
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.child_seat}
                 onChange={e=>setForm({...form, child_seat:e.target.checked})}/>
          Детское кресло
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.taxi_license}
                 onChange={e=>setForm({...form, taxi_license:e.target.checked})}/>
          Лицензия на такси
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-sm mb-1">Фото водительского удостоверения</div>
            <input type="file" accept="image/*" onChange={e=>setLicenseFile(e.target.files?.[0]||null)} />
          </div>
          <div>
            <div className="text-sm mb-1">Фото автомобиля</div>
            <input type="file" accept="image/*" onChange={e=>setCarFile(e.target.files?.[0]||null)} />
          </div>
        </div>

        {err && <div className="text-sm text-red-600">{err}</div>}

        <button disabled={busy}
                className="w-full rounded bg-black text-white py-2 disabled:opacity-60">
          {busy ? 'Отправка…' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}
