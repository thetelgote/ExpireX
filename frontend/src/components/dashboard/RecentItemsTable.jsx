import { Link } from "react-router-dom";
import { FiArrowRight, FiPackage } from "react-icons/fi";
import ExpiryBadge from "../common/ExpiryBadge.jsx";
import { formatDate } from "../../utils/expiryUtils.js";

function RecentItemsTable({ items = [] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Products
          </h2>
          <p className="text-sm text-gray-500">
            Latest inventory items
          </p>
        </div>

        <Link
          to="/items"
          className="flex items-center gap-1 text-sm font-semibold text-brand-500 hover:text-brand-600"
        >
          View All
          <FiArrowRight size={15} />
        </Link>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">

          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <FiPackage
              size={28}
              className="text-gray-400"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            No Products Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Add your first inventory item.
          </p>

        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-50 dark:bg-gray-800">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Product
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Category
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Added
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item) => (

                <tr
                  key={item._id}
                  className="border-t border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >

                  <td className="px-6 py-4">

                    <Link
                      to={`/items/edit/${item._id}`}
                      className="font-semibold text-gray-900 hover:text-brand-500 dark:text-white"
                    >
                      {item.name}
                    </Link>

                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {item.category || "-"}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(item.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    <ExpiryBadge
                      expiryDate={item.expiryDate}
                    />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default RecentItemsTable;