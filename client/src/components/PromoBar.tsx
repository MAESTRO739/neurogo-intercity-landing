const PromoBar = () => {
  return (
    <div className="bg-violet-600 text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-4 text-sm sm:text-base">
          <span className="text-center">
            Первая поездка? Используйте промокод <strong>NEURO20</strong> и получите скидку 20%.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;