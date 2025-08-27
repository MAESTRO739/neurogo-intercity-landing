import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Car, Tag, ChevronDown, ChevronUp } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    carClass: 'comfort',
    promoCode: '',
    childSeat: false
  });

  const [showPromoCode, setShowPromoCode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Booking form submitted:', formData);
    alert('Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения заказа.');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        Быстрый заказ поездки
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Откуда"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Куда"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="relative">
            <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={formData.carClass}
              onChange={(e) => setFormData({ ...formData, carClass: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="economy">Эконом</option>
              <option value="comfort">Комфорт</option>
              <option value="business">Бизнес</option>
              <option value="minivan">Минивэн</option>
            </select>
          </div>

          {/* Child Seat Checkbox */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.childSeat}
                onChange={(e) => setFormData({ ...formData, childSeat: e.target.checked })}
                className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Детское кресло</span>
            </label>
          </div>

          {/* Expandable Promo Code */}
          <div className="border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => setShowPromoCode(!showPromoCode)}
              className="flex items-center justify-between w-full text-left text-gray-600 hover:text-violet-600 transition-colors"
            >
              <span className="font-medium">У меня есть промокод</span>
              {showPromoCode ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {showPromoCode && (
              <div className="mt-3 relative">
                <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Введите промокод"
                  value={formData.promoCode}
                  onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-teal-600 text-white py-3 sm:py-4 rounded-lg hover:from-violet-700 hover:to-teal-700 transition-all font-medium text-base sm:text-lg"
        >
          Заказать поездку
        </button>

        <p className="text-sm text-gray-500 text-center">
          После отправки заявки мы свяжемся с вами для уточнения деталей
        </p>
      </form>
    </div>
  );
};

export default BookingForm;