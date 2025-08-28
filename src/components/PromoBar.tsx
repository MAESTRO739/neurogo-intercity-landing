const PromoBar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-center text-base text-black font-semibold py-1">
      Первая поездка −20% по промокоду{' '}
      <span className="px-1.5 py-0.5 rounded bg-black/20 text-white">NEURO20</span>
    </div>
  );
};

export default PromoBar;
