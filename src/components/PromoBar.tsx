const PromoBar = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] text-center text-black font-semibold py-1 text-xs sm:text-base">
      Первая поездка −15% по промокоду{' '}
      <span className="text-xs sm:text-base px-1.5 py-0.5 rounded bg-black/20 text-white">NEURO15</span>
    </div>
  );
};

export default PromoBar;
