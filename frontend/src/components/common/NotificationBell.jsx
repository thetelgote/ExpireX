import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../../context/NotificationContext";

function NotificationBell() {
  const { notifications, unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <FiBell size={20} />

        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        )}
      </button>

      <AnimatePresence>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl dark:bg-gray-900"
          >

            <div className="border-b p-4 font-semibold">
              Notifications
            </div>

            {notifications.length === 0 ? (
              <div className="p-5 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((n) => (
                <div
                  key={n._id}
                  className="border-b px-4 py-3 text-sm"
                >
                  {n.message}
                </div>
              ))
            )}

            <Link
              to="/notifications"
              className="block p-3 text-center font-semibold text-brand-500"
            >
              View All
            </Link>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}

export default NotificationBell;