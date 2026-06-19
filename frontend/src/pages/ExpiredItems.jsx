import { useEffect, useState, useCallback } from "react";
import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import SearchBar from "../components/common/SearchBar.jsx";
import Loader from "../components/common/Loader.jsx";
import Button from "../components/common/Button.jsx";
import ItemCard from "../components/dashboard/ItemCard.jsx";

import itemService from "../services/itemService.js";
import useDebounce from "../hooks/useDebounce.js";

import {
  buildQueryParams,
  extractErrorMessage,
} from "../utils/helpers.js";

function ExpiredItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const debouncedSearch =
    useDebounce(search, 400);

  const loadExpiredItems =
    useCallback(async () => {
      setLoading(true);

      try {
        const params = buildQueryParams({
          search: debouncedSearch,
        });

        const data =
          await itemService.getExpiredItems(
            params
          );

        setItems(data.items || data || []);
      } catch (err) {
        toast.error(
          extractErrorMessage(
            err,
            "Unable to load expired items."
          )
        );
      } finally {
        setLoading(false);
      }
    }, [debouncedSearch]);

  useEffect(() => {
    loadExpiredItems();
  }, [loadExpiredItems]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);

    try {
      await itemService.deleteItem(
        deleteTarget._id
      );

      setItems((prev) =>
        prev.filter(
          (item) =>
            item._id !== deleteTarget._id
        )
      );

      toast.success(
        "Item removed successfully."
      );

      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Unable to remove item."
        )
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-ink dark:text-paper">

          <span className="rounded-xl bg-red-100 p-2 text-red-600">
            <FiAlertTriangle size={22} />
          </span>

          Expired Items

        </h1>

        <p className="mt-2 text-sm text-ink/55 dark:text-paper/55">
          Products that have already expired.
        </p>

      </div>

      {/* Search */}

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search expired products..."
        className="max-w-md"
      />

      {/* Loading */}

      {loading ? (

        <div className="flex h-64 items-center justify-center">
          <Loader
            size="lg"
            label="Loading expired items..."
          />
        </div>

      ) : items.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-ink/10 bg-white py-20 text-center shadow-card dark:border-paper/10 dark:bg-ink-soft">

          <FiAlertTriangle
            size={50}
            className="mx-auto text-green-500"
          />

          <h2 className="mt-5 text-xl font-semibold text-ink dark:text-paper">
            Great!
          </h2>

          <p className="mt-2 text-sm text-ink/50 dark:text-paper/50">
            No expired products found.
          </p>

        </div>

      ) : (

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

      )}

      {/* Delete Modal */}

      {deleteTarget && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-ink-soft">

            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink dark:text-paper">

              <FiTrash2 className="text-red-500" />

              Delete Item

            </h2>

            <p className="mt-4 text-sm text-ink/60 dark:text-paper/60">
              Are you sure you want to permanently
              delete

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
                onClick={() =>
                  setDeleteTarget(null)
                }
              >
                Cancel
              </Button>

              <Button
                variant="danger"
                isLoading={isDeleting}
                onClick={handleDelete}
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

export default ExpiredItems;