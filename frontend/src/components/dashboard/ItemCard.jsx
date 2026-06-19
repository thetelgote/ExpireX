import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiEdit2,
  FiTrash2,
  FiTag,
  FiCalendar,
  FiPackage,
} from "react-icons/fi";

import ExpiryBadge from "../common/ExpiryBadge.jsx";

function ItemCard({ item, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
      overflow-hidden
      rounded-2xl
      border
      border-gray-200
      bg-white
      shadow-md
      transition
      hover:shadow-xl

      dark:border-gray-700
      dark:bg-gray-900
    "
    >
      {/* Header */}

      <div className="flex items-start justify-between p-5">

        <div className="min-w-0">

          <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white">
            {item.name}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

            <FiTag size={14} />

            <span>
              {item.category || "Uncategorized"}
            </span>

          </div>

        </div>

        <ExpiryBadge
          expiryDate={item.expiryDate}
        />

      </div>

      {/* Body */}

      <div className="space-y-3 border-t border-gray-100 p-5 dark:border-gray-800">

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

          <FiPackage size={16} />

          <span>
            {item.quantity} {item.unit || "pcs"}
          </span>

        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">

          <FiCalendar size={16} />

          <span>
            {new Date(item.expiryDate).toLocaleDateString()}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="grid grid-cols-2 border-t border-gray-100 dark:border-gray-800">

        <Link
          to={`/items/edit/${item._id}`}
          className="
          flex
          items-center
          justify-center
          gap-2
          py-3
          text-sm
          font-semibold
          text-brand-600
          transition
          hover:bg-brand-50

          dark:hover:bg-gray-800
        "
        >
          <FiEdit2 size={15} />

          Edit
        </Link>

        <button
          onClick={() => onDelete(item)}
          className="
          flex
          items-center
          justify-center
          gap-2
          py-3
          text-sm
          font-semibold
          text-red-500
          transition
          hover:bg-red-50

          dark:hover:bg-gray-800
        "
        >
          <FiTrash2 size={15} />

          Delete
        </button>

      </div>
    </motion.div>
  );
}

export default ItemCard;