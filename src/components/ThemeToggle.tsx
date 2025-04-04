import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-200 group z-50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <div className="flex items-center hover:gap-2">
          <SunIcon className="h-7 w-7 text-amber-400" />
          <span className="text-sm text-neutral-700 dark:text-neutral-800 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[200px] overflow-hidden transition-all duration-200 whitespace-nowrap">
            Light Mode
          </span>
        </div>
      ) : (
        <div className="flex items-center hover:gap-2">
          <MoonIcon className="h-7 w-7 text-indigo-600" />
          <span className="text-sm text-neutral-700 dark:text-neutral-100 opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[200px] overflow-hidden transition-all duration-200 whitespace-nowrap">
            Dark Mode
          </span>
        </div>
      )}
    </button>
  );
};
