import { useEffect, useState } from "react";
import {
  FiBell,
  FiCheck,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Loader from "../components/common/Loader.jsx";
import Button from "../components/common/Button.jsx";
import notificationService from "../services/notificationService.js";
import { extractErrorMessage } from "../utils/helpers.js";
import { STATUS_META } from "../utils/expiryUtils.js";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    setLoading(true);

    try {
      const data =
        await notificationService.getNotifications();

      setNotifications(data.notifications || data || []);
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Unable to load notifications."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch {
      toast.error("Unable to mark notification.");
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Unable to update notifications.");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);

      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            notification._id !== id
        )
      );

      toast.success("Notification deleted.");
    } catch {
      toast.error("Unable to delete notification.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader
          size="lg"
          label="Loading notifications..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-ink dark:text-paper">

            <FiBell />

            Notifications

          </h1>

          <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
            Stay updated with inventory alerts.
          </p>

        </div>

        {notifications.length > 0 && (
          <Button
            size="sm"
            onClick={markAllAsRead}
          >
            Mark All Read
          </Button>
        )}

      </div>

      {notifications.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-ink/10 bg-white py-20 text-center shadow-card dark:border-paper/10 dark:bg-ink-soft">

          <FiBell
            size={50}
            className="mx-auto text-ink/30"
          />

          <h2 className="mt-5 text-xl font-semibold">
            No Notifications
          </h2>

          <p className="mt-2 text-sm text-ink/50">
            You're all caught up.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((notification) => {

            const meta =
              STATUS_META[
                notification.status
              ] || STATUS_META.fresh;

            return (

              <div
                key={notification._id}
                className={`rounded-2xl border p-5 shadow-card transition ${
                  notification.isRead
                    ? "bg-white dark:bg-ink-soft"
                    : "border-brand-300 bg-brand-50 dark:bg-brand-900/20"
                }`}
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-3">

                    <span
                      className={`mt-2 h-3 w-3 rounded-full ${meta.dot}`}
                    />

                    <div>

                      <h3 className="font-semibold text-ink dark:text-paper">
                        {notification.title}
                      </h3>

                      <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">
                        {notification.message}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-2">

                    {!notification.isRead && (

                      <button
                        onClick={() =>
                          markAsRead(
                            notification._id
                          )
                        }
                        className="rounded-lg p-2 text-green-600 transition hover:bg-green-100"
                      >
                        <FiCheck />
                      </button>

                    )}

                    <button
                      onClick={() =>
                        deleteNotification(
                          notification._id
                        )
                      }
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-100"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default Notifications;