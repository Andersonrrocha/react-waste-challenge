import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useSelectedSkip } from '../contexts/SelectedSkipContext';
import { useEffect, useRef } from 'react';

export const SelectedSkipDrawer = () => {
  const { selectedSkip, isDrawerOpen, closeDrawer } = useSelectedSkip();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.skip-card')
      ) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <div
      ref={drawerRef}
      style={{ transform: `translateX(${isDrawerOpen ? '0' : '100%'})` }}
      className={`
        fixed inset-y-0 right-0 w-[400px] bg-white dark:bg-gray-900 shadow-xl 
        transition-transform duration-300 ease-out z-50
      `}
    >
      {selectedSkip && (
        <>
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                Selected Skip
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-neutral-500" />
            </button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)] hide-scrollbar">
            <div className="text-center">
              <img
                src="./src/assets/skip-waste-placeholder-2.webp"
                alt={`${selectedSkip.size} Yard Skip`}
                className="w-64 mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-700 uppercase">
                {selectedSkip.size} Yard Skip
              </h3>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-200 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-500 mb-1 uppercase">
                  Hire Period
                </h4>
                <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-700">
                  {selectedSkip.hire_period_days} days
                </p>
              </div>
              <div className="bg-neutral-200 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-600 dark:text-neutral-500 mb-1 uppercase">
                  Price
                </h4>
                <p className="text-lg font-semibold text-primary">
                  £{selectedSkip.price_before_vat}
                  <span className="text-sm text-neutral-600 dark:text-neutral-700"> per week</span>
                </p>
              </div>

              <div className="space-y-2">
                {!selectedSkip.allowed_on_road && (
                  <div className="flex items-center gap-2 text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Private Property Only</span>
                  </div>
                )}
                {!selectedSkip.allows_heavy_waste && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">Not Suitable for Heavy Waste</span>
                  </div>
                )}
              </div>

              {selectedSkip.transport_cost && (
                <div className="bg-neutral-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Transport Cost
                  </h4>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    £{selectedSkip.transport_cost}
                  </p>
                </div>
              )}

              {selectedSkip.per_tonne_cost && (
                <div className="bg-neutral-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    Cost per Tonne
                  </h4>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    £{selectedSkip.per_tonne_cost}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 sticky bottom-0 bg-white dark:bg-gray-900 pt-8">
              <button className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-full transition-colors">
                Continue to Permit Check
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
