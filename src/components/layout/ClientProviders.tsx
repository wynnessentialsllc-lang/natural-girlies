'use client';

import { useState } from 'react';
import { SearchModal } from '@/components/SearchModal';
import { NewsletterPopup } from '@/components/NewsletterPopup';

// Context for search modal open state
import { createContext, useContext } from 'react';

interface SearchContextType {
  openSearch: () => void;
}

export const SearchContext = createContext<SearchContextType>({ openSearch: () => {} });

export function useSearch() {
  return useContext(SearchContext);
}

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ openSearch: () => setSearchOpen(true) }}>
      {children}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NewsletterPopup />
    </SearchContext.Provider>
  );
}
