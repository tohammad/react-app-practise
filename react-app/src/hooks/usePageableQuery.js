import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50];

function calculateQueryParams(pageSize, currentPage, extraParams, funcParams) {
  const pageSizeTemp = extraParams && extraParams.pageSize ? extraParams.pageSize : pageSize;
  const currentPageTemp =
    extraParams && extraParams.currentPage ? extraParams.currentPage : currentPage;
  return {
    size: pageSizeTemp,
    skip: pageSizeTemp * (currentPageTemp - 1),
    ...extraParams,
    ...funcParams,
  };
}

function trimQueryParams(queryParams) {
  if (queryParams) {
    return Object.keys(queryParams).reduce((accumulator, currentFilter) => {
      const next = accumulator;
      const value = queryParams[currentFilter];
      if (!value && value !== 0 && value !== false) {
        return accumulator;
      }
      next[currentFilter] = typeof value === 'string' ? value.trim() : value;
      return next;
    }, {});
  }
  return {};
}

const usePageableQuery = (
  queryFunction,
  initialQueryParams,
  onQueryChanged = () => {},
  initialPageSize,
  initialCurrentPage,
  funcParams
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage || 1);
  const [pageSize, setPageSize] = useState(initialPageSize || DEFAULT_PAGE_SIZE_OPTIONS[0]);
  const [extraParams, setExtraParams] = useState(initialQueryParams);
  const [queryParams, setQueryParams] = useState(undefined);
  const debouncedQueryParams = useDebounce(queryParams, 500);
  // Used for preventing double API calls
  const [lastQueryParams, setLastQueryParams] = useState(undefined);

  const [totalCount, setTotalCount] = useState(undefined);
  const [data, setData] = useState([]);
  function handleResponse(newData, newTotalCount) {
    setData(newData);
    setTotalCount(newTotalCount);
  }

  async function refreshData() {
    if (queryParams && queryFunction !== null) {
      setIsLoading(true);
      try {
        const trimmedQueryParams = trimQueryParams(queryParams);
        setLastQueryParams(JSON.stringify(trimmedQueryParams));
        const response = await queryFunction(trimmedQueryParams);
        if (response && response.data && response.headers) {
          handleResponse(response.data, parseInt(response.headers['x-total-count'], 10));
        } else {
          handleResponse([], 0);
        }
      } catch (err) {
        handleResponse([], undefined);
      }
      setIsLoading(false);
    }
  }

  const resetFilter = () => {
    setCurrentPage(1);
    setPageSize(initialPageSize || DEFAULT_PAGE_SIZE_OPTIONS[0]);
    setExtraParams(initialQueryParams);
    setQueryParams(undefined);
    setLastQueryParams(undefined);
    setQueryParams(calculateQueryParams(pageSize, currentPage, extraParams, funcParams));
  };

  useEffect(() => {
    setQueryParams(calculateQueryParams(pageSize, currentPage, extraParams, funcParams));
  }, [currentPage, pageSize, extraParams]);

  useEffect(() => {
    onQueryChanged(queryParams);
  }, [queryParams]);

  useEffect(() => {
    const stringifiedQueryParams = JSON.stringify(trimQueryParams(debouncedQueryParams));
    if (lastQueryParams !== stringifiedQueryParams) {
      refreshData();
    }
  }, [debouncedQueryParams]);

  return {
    isLoading,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    extraParams,
    ...funcParams,
    setExtraParams,
    totalCount,
    data,
    refreshData,
    resetFilter,
  };
};

export default usePageableQuery;
