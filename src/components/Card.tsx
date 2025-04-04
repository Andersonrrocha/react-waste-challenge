import { Skip } from '../hooks/useSkips';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useSelectedSkip } from '../contexts/SelectedSkipContext';
import skipWastePlaceholder from '../assets/skip-waste-placeholder.webp';

interface CardProps {
  skip: Skip;
}

export const Card = ({ skip }: CardProps) => {
  const { selectedSkip, selectSkip, clearSelection } = useSelectedSkip();
  const isDisabled = !skip.allowed_on_road || !skip.allows_heavy_waste;
  const isSelected = selectedSkip?.id === skip.id;

  const handleClick = () => {
    if (isDisabled) return;
    if (isSelected) {
      clearSelection();
    } else {
      selectSkip(skip);
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      className={`
        skip-card
        relative w-[19rem] 2xl:w-[23.75rem] h-[17.5rem]
        ${isDisabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected ? 'bg-primary' : ''}
        transition-all duration-200 hover:scale-[1.02]
        rounded-[1.5rem]
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
      `}
    >
      <div className="absolute -top-2 left-4 z-30 space-y-2">
        {!skip.allowed_on_road && (
          <div
            role="status"
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/95 dark:bg-amber-600/95 text-white rounded-sm shadow-lg"
          >
            <ExclamationTriangleIcon className="w-4 h-4 dark:text-amber-500" aria-hidden="true" />
            <span className="text-xs font-medium whitespace-nowrap">Private Property Only</span>
          </div>
        )}
        {!skip.allows_heavy_waste && (
          <div
            role="status"
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/95 dark:bg-red-800/95 text-white rounded-sm shadow-lg"
          >
            <ExclamationTriangleIcon className="w-4 h-4 dark:text-red-500" aria-hidden="true" />
            <span className="text-xs font-medium whitespace-nowrap">
              Not Suitable for Heavy Waste
            </span>
          </div>
        )}
      </div>

      <div
        className={`
        absolute w-[11.25rem] h-[17.5rem] 
        rounded-[1.5rem] overflow-hidden
        ${isDisabled ? 'bg-neutral-400 dark:bg-neutral-500' : 'bg-primary'}
      `}
      >
        <span
          className={`absolute bottom-2 left-2 text-[2.5rem] 2xl:text-[3rem] font-extrabold opacity-30 leading-none
          ${isDisabled ? 'text-neutral-700 dark:text-gray-700' : 'text-hover dark:opacity-50'}
        `}
        >
          {skip.size}Y
        </span>
      </div>

      <div className="absolute text-center overflow-visible left-[30%] w-[320px] h-[240px] top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 rounded-[23px] shadow-lg sm:block hidden">
        <div className="absolute top-1/2 left-0 transform -translate-x-1/3 -translate-y-1/2">
          <img
            src={skipWastePlaceholder}
            alt={`${skip.size} Yard Skip`}
            className={`
              w-48 object-contain transform transition-transform duration-300
              ${isDisabled ? 'grayscale' : 'hover:scale-105'}
            `}
          />
        </div>

        <div className="w-[160px] ml-[140px] mt-[30px]">
          <h2 className="font-extrabold text-xl uppercase leading-tight mb-2 text-neutral-700 dark:text-neutral-700">
            {skip.size} yard skip
          </h2>
          <div className="w-full h-[0.0625rem] bg-neutral-300 dark:bg-neutral-700 my-2" />
          {skip.price_before_vat ? (
            <div className="h-[3.25rem] mb-2">
              <span
                className={`
            font-light text-2xl tracking-wide mb-4
            ${isDisabled ? 'text-neutral-500' : 'text-primary'}
          `}
              >
                £{skip.price_before_vat}
              </span>
              <div className="block">
                <span className="font-bold text-xs tracking-[0.125rem] uppercase text-neutral-600 dark:text-neutral-400">
                  per week
                </span>
              </div>
            </div>
          ) : (
            <span className="pt-3 font-bold text-xs tracking-[0.125rem] uppercase text-neutral-600 dark:text-neutral-400 h-[3.25rem] flex items-start justify-center">
              price on request
            </span>
          )}
          <div className="w-full h-[0.0625rem] bg-neutral-300 dark:bg-neutral-700 mb-3" />
          <div className="text-center">
            <h4 className="font-bold text-xs tracking-[0.125rem] mb-2 uppercase text-neutral-600 dark:text-neutral-400">
              {skip.hire_period_days} day hire period
            </h4>
          </div>
        </div>

        <div className="px-4">
          <button
            className={`
            w-full h-[2.5rem] mt-7 self-end rounded-[1.5rem] px-4 text-xs font-light 
            transition-colors duration-200 flex items-center justify-center gap-2
            ${
              isDisabled
                ? 'bg-neutral-400 dark:bg-neutral-500 dark:text-neutral-900 cursor-not-allowed'
                : isSelected
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-primary hover:bg-primary-hover text-neutral-50'
            }
          `}
            disabled={isDisabled}
            aria-label={
              isDisabled ? 'Not available' : isSelected ? 'Skip selected' : 'Select this skip'
            }
          >
            {isSelected && <CheckCircleIcon className="w-4 h-4" aria-hidden="true" />}
            {isDisabled ? 'NOT AVAILABLE' : isSelected ? 'SKIP SELECTED' : 'SELECT THIS SKIP '}
            {!isSelected && !isDisabled && (
              <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
