import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMotionValue } from 'framer-motion';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    { name: 'Елена Морозова', rating: 5, text: 'Великолепный сервис! Водитель приехал точно в назначенное время, машина чистая и комфортная. В аэропорт добрались без опозданий.'},
    { name: 'Андрей Петров',  rating: 5, text: 'Заказывал поездку в Тулу на важную встречу. Очень доволен качеством обслуживания и профессионализмом водителя.'},
    { name: 'Мария Иванова',  rating: 5, text: 'Отличная компания! Пользуюсь их услугами уже полгода для поездок на дачу. Всегда вовремя, всегда чисто.'},
    { name: 'Дмитрий Козлов', rating: 5, text: 'Заказывал минивэн для семьи из 6 человек. Просторно, удобно, водитель помог с багажом. Рекомендую!'},
    { name: 'Ольга Сидорова', rating: 5, text: 'Быстро, надёжно, по адекватной цене. Особенно понравилось, что можно заказать детское кресло. Спасибо!'},
  ];

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % testimonials.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + testimonials.length) % testimonials.length);

  const x = useMotionValue(0);

  return (
    <section id="testimonials" className="relative py-20 bg-[#0A0E22] overflow-hidden">
      {/* background wash + very subtle glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#0A0E22 0%,#0B122B 55%,#0A0E22 100%)' }} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(700px 320px at 12% 12%, rgba(123,97,255,0.10), transparent 62%),' +
              'radial-gradient(820px 360px at 88% 80%, rgba(0,230,168,0.08), transparent 64%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Отзывы{' '}
            <span className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">
              наших клиентов
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Более 500 довольных пассажиров каждый месяц
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative max-w-4xl mx-auto hover:cursor-grab">
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ y: 22, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {/* draggable layer */}
            <motion.div
              drag="x"
              dragMomentum={false}
              style={{ x }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) nextSlide();
                else if (info.offset.x > 60) prevSlide();
                x.set(0);
              }}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((t, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <Card className="mx-auto max-w-2xl bg-white/[0.04] border border-white/10">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl
                                        bg-gradient-to-br from-[#7B61FF] to-[#00E6A8] text-white/90 opacity-90">
                          <Quote className="w-6 h-6" />
                        </div>

                        <div className="flex justify-center mb-4">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>

                        <p className="text-lg text-white/80 mb-6 italic leading-relaxed">
                          “{t.text}”
                        </p>

                        <div>
                          <h4 className="font-semibold text-lg text-white">{t.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-white/20 hover:bg-white/10 group"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeft className="w-4 h-4 text-[#7B61FF] group-hover:text-[#00E6A8]" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={[
                    'w-3 h-3 rounded-full transition-all',
                    i === currentSlide
                      ? 'bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] shadow-[0_0_8px_rgba(0,230,168,.45)]'
                      : 'bg-white/25 hover:bg-white/40',
                  ].join(' ')}
                  aria-label={`Перейти к отзыву ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-white/20 hover:bg-white/10 group"
              aria-label="Следующий отзыв"
            >
              <ChevronRight className="w-4 h-4 text-[#7B61FF] group-hover:text-[#00E6A8]" />
            </Button>
          </div>
        </div>

        {/* Stats block */}
        <motion.div
          className="text-center mt-12"
          initial={{ y: 18, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="inline-block bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-6 px-8 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-sm text-white/60">Средний рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent">
                  2 000+
                </div>
                <div className="text-sm text-white/60">Отзывов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-white/60">Рекомендуют</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
