import { useEffect, useState, useContext } from 'react';
import useDebounce from './useDebounce';
import { UrlParamsContext } from '../contexts/UrlParams/UrlParamsProvider';

const useFilters = ({ initialFilters, useUrlReflection, debounceTimeMs = 0 }) => {
  const { urlParams, assignUrlParams } = useContext(UrlParamsContext);
  const initialFiltersIncludingUrl = Object.assign(
    {},
    initialFilters,
    useUrlReflection && urlParams
  );
  const [filters, setFilters] = useState(initialFiltersIncludingUrl);
  const debouncedFilters = useDebounce(filters, debounceTimeMs);

  useEffect(() => {
    if (useUrlReflection) {
      setFilters(Object.assign({}, initialFilters, urlParams));
    }
  }, [urlParams]);

  useEffect(() => {
    if (useUrlReflection) {
      assignUrlParams(debouncedFilters);
    }
  }, [debouncedFilters]);

  return {
    filters,
    debouncedFilters,
    setFilters,
  };
};

export default useFilters;
