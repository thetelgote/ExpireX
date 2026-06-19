import { useEffect, useState, useCallback } from "react";
import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";
import toast from "react-hot-toast";

import DashboardCard from "../components/dashboard/DashboardCard.jsx";
import PieChartCard from "../components/dashboard/PieChartCard.jsx";
import BarChartCard from "../components/dashboard/BarChartCard.jsx";
import RecentItemsTable from "../components/dashboard/RecentItemsTable.jsx";
import Loader from "../components/common/Loader.jsx";

import { useAuth } from "../context/AuthContext.jsx";
import { useNotifications } from "../context/NotificationContext.jsx";

import itemService from "../services/itemService.js";
import dashboardService from "../services/dashboardService.js";

import {
  extractErrorMessage,
  formatNumber,
} from "../utils/helpers.js";

import { STATUS_META } from "../utils/expiryUtils.js";

function Dashboard() {
  const { user } = useAuth();
  const { notifications } = useNotifications();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expiringSoon: 0,
    expired: 0,
  });

  const [categoryData, setCategoryData] = useState({
    labels: [],
    values: [],
  });

  const [recentItems, setRecentItems] = useState([]);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    try {
      const [
        statsData,
        categoryData,
        recentData,
      ] = await Promise.all([
        dashboardService
          .getStats()
          .catch(() => itemService.getDashboardStats()),

        dashboardService
          .getCategoryBreakdown()
          .catch(() => ({
            labels: [],
            values: [],
          })),

        dashboardService
          .getRecentItems(5)
          .catch(() =>
            itemService.getItems({
              limit: 5,
              sort: "createdAt-desc",
            })
          ),
      ]);

      setStats({
        total:
          statsData.total ??
          statsData.totalProducts ??
          0,

        active:
          statsData.active ??
          statsData.activeProducts ??
          0,

        expiringSoon:
          statsData.expiringSoon ?? 0,

        expired:
          statsData.expired ??
          statsData.expiredProducts ??
          0,
      });

      setCategoryData({
        labels:
          categoryData.labels || [],
        values:
          categoryData.values || [],
      });

      setRecentItems(
        recentData.items ||
          recentData ||
          []
      );
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Failed to load dashboard"
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const latestNotifications =
    notifications.slice(0, 5);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader
          size="lg"
          label="Loading Dashboard..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="font-display text-3xl font-bold text-ink dark:text-paper">
          Welcome Back
          {user?.name &&
            `, ${user.name.split(" ")[0]}`}
        </h1>

        <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
          Monitor your inventory and expiry
          status in one place.
        </p>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Products"
          value={formatNumber(
            stats.total
          )}
          icon={<FiPackage />}
          tone="brand"
        />

        <DashboardCard
          title="Fresh Products"
          value={formatNumber(
            stats.active
          )}
          icon={<FiCheckCircle />}
          tone="fresh"
        />

        <DashboardCard
          title="Expiring Soon"
          value={formatNumber(
            stats.expiringSoon
          )}
          icon={<FiClock />}
          tone="soon"
        />

        <DashboardCard
          title="Expired"
          value={formatNumber(
            stats.expired
          )}
          icon={<FiAlertTriangle />}
          tone="expired"
        />

      </div>

      {/* Charts */}

      <div className="grid gap-5 lg:grid-cols-2">

        <PieChartCard
          fresh={stats.active}
          soon={stats.expiringSoon}
          expired={stats.expired}
        />

        <BarChartCard
          labels={categoryData.labels}
          values={categoryData.values}
        />

      </div>

      {/* Table + Notifications */}

      <div className="grid gap-5 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <RecentItemsTable
            items={recentItems}
          />
        </div>

        <div className="rounded-2xl border border-ink/5 bg-white shadow-card dark:border-paper/5 dark:bg-ink-soft">

          <div className="border-b border-ink/8 px-5 py-4 dark:border-paper/8">

            <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">
              Latest Notifications
            </h2>

          </div>

          {latestNotifications.length ===
          0 ? (
            <div className="py-10 text-center text-sm text-ink/50 dark:text-paper/50">
              No notifications found.
            </div>
          ) : (
            <ul className="divide-y divide-ink/5 dark:divide-paper/5">

              {latestNotifications.map(
                (notification) => {
                  const meta =
                    STATUS_META[
                      notification.status
                    ] ||
                    STATUS_META.fresh;

                  return (
                    <li
                      key={
                        notification._id
                      }
                      className="flex items-start gap-3 px-5 py-4"
                    >
                      <span
                        className={`mt-2 h-2.5 w-2.5 rounded-full ${meta.dot}`}
                      />

                      <div>

                        <p className="text-sm font-medium text-ink dark:text-paper">
                          {notification.title ||
                            "Notification"}
                        </p>

                        <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
                          {notification.message}
                        </p>

                      </div>

                    </li>
                  );
                }
              )}

            </ul>
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;