import { SkipData } from '../pages/Home';

interface CardProps {
  skip: SkipData;
}

export const Card = ({ skip }: CardProps) => {
  return (
    <div className="bg-card hover:bg-card-hover rounded-lg overflow-hidden shadow-lg transition-colors duration-200">
      {/* Imagem e Badge */}
      <div className="relative">
        <img 
          src="https://picsum.photos/200" 
          alt={`${skip.size} Yard Skip`} 
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-md">
          {skip.size} Yards
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-text mb-1">
          {skip.size} Yard Skip
        </h2>
        <p className="text-text/80 mb-4">
          {skip.hire_period_days} day hire period
        </p>

        {/* Preço */}
        <div className="mb-4">
          <span className="text-primary text-3xl font-bold">
            £{skip.price_before_vat}
          </span>
          <span className="text-text/80 ml-2">per week</span>
        </div>

        {/* Botão */}
        <button className="w-full bg-button hover:bg-button-hover text-text py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-200">
          Select This Skip
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m-7-7l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};