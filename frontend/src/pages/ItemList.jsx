import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiPackage,
  FiFilter,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import SearchBar from "../components/common/SearchBar.jsx";
import Button from "../components/common/Button.jsx";
import Loader from "../components/common/Loader.jsx";
import ItemCard from "../components/dashboard/ItemCard.jsx";

import itemService from "../services/itemService.js";

import useDebounce from "../hooks/useDebounce.js";

import {
  ITEM_CATEGORIES,
  ITEM_STATUS_FILTERS,
  SORT_OPTIONS,
  PAGE_SIZE,
} from "../utils/constants.js";

import {
  buildQueryParams,
  extractErrorMessage,
} from "../utils/helpers.js";

function ItemList() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const [category, setCategory] =
    useState("all");

  const [sort, setSort] = useState(
    "expiryDate-asc"
  );

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [showFilters, setShowFilters] =
    useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const debouncedSearch =
    useDebounce(search, 400);

  const loadItems = useCallback(async () => {
    setLoading(true);

    try {
      const [sortField, sortDir] =
        sort.split("-");

      const params = buildQueryParams({
        search: debouncedSearch,
        status,
        category,
        sortField,
        sortDir,
        page,
        limit: PAGE_SIZE,
      });

      const data =
        await itemService.getItems(params);

      setItems(data.items || data || []);

      setTotalPages(
        data.totalPages || 1
      );
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Failed to load items."
        )
      );
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearch,
    status,
    category,
    sort,
    page,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    status,
    category,
    sort,
  ]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleDeleteConfirm =
    async () => {
      if (!deleteTarget) return;

      setIsDeleting(true);

      try {
        await itemService.deleteItem(
          deleteTarget._id
        );

        setItems((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              deleteTarget._id
          )
        );

        toast.success(
          `"${deleteTarget.name}" deleted successfully`
        );

        setDeleteTarget(null);
      } catch (err) {
        toast.error(
          extractErrorMessage(
            err,
            "Unable to delete item"
          )
        );
      } finally {
        setIsDeleting(false);
      }
    };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="font-display text-3xl font-bold text-ink dark:text-paper">
            Inventory Items
          </h1>

          <p className="mt-1 text-sm text-ink/55 dark:text-paper/55">
            Manage and monitor all your inventory products.
          </p>

        </div>

        <Link to="/items/add">

          <Button icon={<FiPlus size={16} />}>
            Add Item
          </Button>

        </Link>

      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 rounded-2xl border border-ink/5 bg-white p-5 shadow-card dark:border-paper/5 dark:bg-ink-soft">

        <div className="flex flex-col gap-3 sm:flex-row">

          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search item..."
            className="flex-1"
          />

          <button
            type="button"
            onClick={() =>
              setShowFilters((prev) => !prev)
            }
            className="flex items-center justify-center gap-2 rounded-xl border border-ink/10 px-5 py-3 text-sm font-medium hover:bg-ink/5 dark:border-paper/10 dark:hover:bg-paper/5"
          >
            <FiFilter size={16} />

            Filters
          </button>

        </div>

        {/* Filters */}

        <AnimatePresence>

          {showFilters && (

            <div className="grid gap-4 pt-3 md:grid-cols-3">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-brand-500 dark:border-paper/10 dark:bg-ink"
                >
                  {ITEM_STATUS_FILTERS.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-brand-500 dark:border-paper/10 dark:bg-ink"
                >
                  <option value="all">
                    All Categories
                  </option>

                  {ITEM_CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Sort By
                </label>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 outline-none focus:border-brand-500 dark:border-paper/10 dark:bg-ink"
                >
                  {SORT_OPTIONS.map(
                    (option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

          )}

        </AnimatePresence>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex h-72 items-center justify-center">

          <Loader
            size="lg"
            label="Loading inventory..."
          />

        </div>

      ) : items.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-ink/10 bg-white py-20 text-center shadow-card dark:border-paper/10 dark:bg-ink-soft">

          <FiPackage
            size={50}
            className="mx-auto text-ink/30 dark:text-paper/30"
          />

          <h2 className="mt-5 text-xl font-semibold text-ink dark:text-paper">
            No Items Found
          </h2>

          <p className="mt-2 text-sm text-ink/50 dark:text-paper/50">
            Try changing your filters or add a new item.
          </p>

          <div className="mt-6">

            <Link to="/items/add">

              <Button
                icon={<FiPlus size={15} />}
              >
                Add Item
              </Button>

            </Link>

          </div>

        </div>

      ) : (        <>
          {/* Item Grid */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onDelete={setDeleteTarget}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">

              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium transition hover:bg-brand-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-paper/10"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`h-10 w-10 rounded-lg text-sm font-semibold transition ${
                    page === number
                      ? "bg-brand-500 text-white"
                      : "border border-ink/10 hover:bg-brand-100 dark:border-paper/10 dark:hover:bg-paper/10"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium transition hover:bg-brand-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-paper/10"
              >
                Next
              </button>

            </div>
          )}
        </>
      )}

      {/* Delete Modal */}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-ink-soft">

            <h2 className="font-display text-xl font-bold text-ink dark:text-paper">
              Delete Item
            </h2>

            <p className="mt-3 text-sm text-ink/60 dark:text-paper/60">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                "{deleteTarget.name}"
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                isLoading={isDeleting}
                onClick={handleDeleteConfirm}
              >
                Delete
              </Button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ItemList;


