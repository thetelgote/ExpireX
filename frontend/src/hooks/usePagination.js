import { useState } from "react";

function usePagination(initialPage = 1) {
  const [page, setPage] = useState(initialPage);

  const nextPage = () => setPage((p) => p + 1);

  const previousPage = () =>
    setPage((p) => Math.max(1, p - 1));

  const resetPage = () => setPage(1);

  return {
    page,
    setPage,
    nextPage,
    previousPage,
    resetPage,
  };
}

export default usePagination;