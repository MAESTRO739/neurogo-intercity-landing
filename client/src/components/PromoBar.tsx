const PromoBar = () => {
  return (
    <div className="gradient-accent py-3 text-center text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-sm font-medium">
            Первая поездка? Используйте промокод <strong>NEURO20</strong> и получите скидку 20%.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;