import { useDebounce } from '@uidotdev/usehooks';
import { useState } from 'react';

const useSearchDebounce = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return {};
};
