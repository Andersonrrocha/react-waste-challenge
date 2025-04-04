import { ThemeToggle } from '../components/ThemeToggle';
import { Card } from '../components/Card';
import { Timeline } from '../components/Timeline';
import { useSkips } from '../hooks/useSkips';
import { SelectedSkipProvider } from '../contexts/SelectedSkipContext';
import { SelectedSkipDrawer } from '../components/SelectedSkipDrawer';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { MobileCard } from '../components/MobileCard';
import { Spinner } from '../components/Spinner';

export const Home = () => {
  const { data: skips, isLoading, error } = useSkips();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#efe1b8] dark:bg-gray-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#efe1b8] dark:bg-gray-800 text-error flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <SelectedSkipProvider>
      <div className="min-h-screen bg-[#efe1b8] dark:bg-gray-800">
        <ThemeToggle />
        <Timeline />
        <div className="text-center mt-10 px-3">
          <h1 className="text-5xl font-bold text-primary-darker">Choose Your Skip Size</h1>
          <p className="mt-2 text-neutral-600 text-xl dark:text-neutral-500">
            Select the skip size that best suits your needs
          </p>
        </div>
        <div className="max-w-[1920px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {skips && skips.length > 0 ? (
              skips.map((skip) => (
                <>
                  <div className="hidden lg:block">
                    <Card key={skip.id} skip={skip} />
                  </div>
                  <div className="lg:hidden">
                    <MobileCard key={skip.id} skip={skip} />
                  </div>
                </>
              ))
            ) : (
              <div className="col-span-full text-3xl font-extralight flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400">
                <ExclamationTriangleIcon className="w-12 h-12 stroke-1 mb-4" />
                No skips available.
              </div>
            )}
          </div>
        </div>
        <SelectedSkipDrawer />
      </div>
    </SelectedSkipProvider>
  );
};
