export const Spinner = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      <span className="text-neutral-800 dark:text-neutral-300 text-xl font-medium animate-pulse">
        Loading...
      </span>
    </div>
  );
};
