import { createContext, useContext, useState, ReactNode } from 'react';
import { Skip } from '../hooks/useSkips';

interface SelectedSkipContextType {
  selectedSkip: Skip | null;
  isDrawerOpen: boolean;
  selectSkip: (skip: Skip) => void;
  clearSelection: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const SelectedSkipContext = createContext<SelectedSkipContextType | undefined>(undefined);

export function SelectedSkipProvider({ children }: { children: ReactNode }) {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
    setIsDrawerOpen(true);
  };

  const clearSelection = () => {
    setSelectedSkip(null);
    setIsDrawerOpen(false);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <SelectedSkipContext.Provider 
      value={{ 
        selectedSkip, 
        isDrawerOpen, 
        selectSkip, 
        clearSelection, 
        openDrawer, 
        closeDrawer 
      }}
    >
      {children}
    </SelectedSkipContext.Provider>
  );
}

export function useSelectedSkip() {
  const context = useContext(SelectedSkipContext);
  if (context === undefined) {
    throw new Error('useSelectedSkip must be used within a SelectedSkipProvider');
  }
  return context;
} 