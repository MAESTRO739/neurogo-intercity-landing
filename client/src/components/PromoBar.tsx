const PromoBar = () => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-sm border-b border-white/20 py-3 px-4">
      <p className="text-center text-white/90 font-medium">
        Первая поездка со скидкой 20% по промокоду{' '}
        <span className="font-bold text-white bg-white/20 px-2 py-1 rounded">NEURO20</span>
      </p>
    </div>
  );
};

export default PromoBar;