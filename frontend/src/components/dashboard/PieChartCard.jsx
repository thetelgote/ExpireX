import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../context/ThemeContext.jsx";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PieChartCard({
  fresh = 0,
  soon = 0,
  expired = 0,
}) {
  const { isDark } = useTheme();

  const data = useMemo(
    () => ({
      labels: [
        "Fresh",
        "Expiring Soon",
        "Expired",
      ],
      datasets: [
        {
          data: [
            fresh,
            soon,
            expired,
          ],
          backgroundColor: [
            "#22C55E",
            "#F59E0B",
            "#EF4444",
          ],
          borderColor: isDark
            ? "#111827"
            : "#FFFFFF",
          borderWidth: 3,
          hoverOffset: 8,
        },
      ],
    }),
    [fresh, soon, expired, isDark]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: isDark
            ? "#F9FAFB"
            : "#111827",

          usePointStyle: true,

          pointStyle: "circle",

          padding: 18,

          font: {
            size: 12,
            family: "Inter",
          },
        },
      },

      tooltip: {
        backgroundColor: isDark
          ? "#1F2937"
          : "#111827",

        padding: 10,
      },
    },

    cutout: "65%",
  };

  const total =
    fresh + soon + expired;

  return (
    <div
      className="
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      shadow-md
      dark:border-gray-700
      dark:bg-gray-900
    "
    >
      <div className="mb-5">

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Inventory Overview
        </h2>

        <p className="text-sm text-gray-500">
          Product freshness status
        </p>

      </div>

      <div className="relative h-72">

        {total === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Data Available
          </div>
        ) : (
          <Pie
            data={data}
            options={options}
          />
        )}

      </div>
    </div>
  );
}

export default PieChartCard;