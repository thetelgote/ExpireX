import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "../../context/ThemeContext.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function BarChartCard({
  labels = [],
  values = [],
  title = "Items by Category",
}) {
  const { isDark } = useTheme();

  const gridColor = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(0,0,0,0.08)";

  const textColor = isDark
    ? "#F9FAFB"
    : "#111827";

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Products",
          data: values,
          backgroundColor: "#22C55E",
          hoverBackgroundColor: "#16A34A",
          borderRadius: 10,
          maxBarThickness: 40,
        },
      ],
    }),
    [labels, values]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: isDark
          ? "#1F2937"
          : "#111827",

        padding: 10,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: textColor,
          font: {
            family: "Inter",
            size: 12,
          },
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: gridColor,
        },

        ticks: {
          color: textColor,
          precision: 0,
        },
      },
    },
  };

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
          {title}
        </h2>

        <p className="text-sm text-gray-500">
          Category Distribution
        </p>

      </div>

      <div className="relative h-72">

        {labels.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Data Available
          </div>
        ) : (
          <Bar
            data={data}
            options={options}
          />
        )}

      </div>

    </div>
  );
}

export default BarChartCard;