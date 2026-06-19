import { useState, useEffect } from "react";

/**
 * Custom Hook: useDebounce
 *
 * Returns a debounced value after the specified delay.
 * Useful for search inputs to avoid making API calls
 * on every keystroke.
 *
 * Example:
 * const debouncedSearch = useDebounce(search, 400);
 */

function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;