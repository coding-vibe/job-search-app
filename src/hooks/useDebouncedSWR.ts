import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import useSWR, { Key } from 'swr';

interface useDebouncedSWROptions<T> {
  cacheKey?: Key;
  fetchFn: () => Promise<T>;
  debounceDelay: number;
}

const useDebouncedSWR = <T>({ cacheKey, fetchFn, debounceDelay }: useDebouncedSWROptions<T>) => {
  const [uniqueKey, setUniqueKey] = useState<null | Key>(null);

  useEffect(() => {
    const cacheKeyHandler = debounce(() => setUniqueKey(cacheKey), debounceDelay);

    cacheKeyHandler();

    return () => cacheKeyHandler.cancel();
  }, [debounceDelay, cacheKey]);

  return useSWR(uniqueKey, fetchFn);
};

export default useDebouncedSWR;
