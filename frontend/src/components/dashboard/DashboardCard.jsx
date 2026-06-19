import { motion } from "framer-motion";

const TONE_STYLES = {
  brand: {
    iconBg:
      "bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300",
    ring:
      "hover:ring-brand-200 dark:hover:ring-brand-800",
  },

  fresh: {
    iconBg:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    ring:
      "hover:ring-green-200 dark:hover:ring-green-800",
  },

  soon: {
    iconBg:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-300",
    ring:
      "hover:ring-yellow-200 dark:hover:ring-yellow-800",
  },

  expired: {
    iconBg:
      "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    ring:
      "hover:ring-red-200 dark:hover:ring-red-800",
  },
};

function DashboardCard({
  title,
  value,
  icon,
  tone = "brand",
  trend,
  onClick,
}) {
  const styles =
    TONE_STYLES[tone] ||
    TONE_STYLES.brand;

  return (
    <motion.button
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`
      group
      flex
      w-full
      flex-col
      gap-5
      rounded-2xl
      border
      border-gray-200
      bg-white
      p-6
      text-left
      shadow-md
      ring-1
      ring-transparent
      transition
      duration-200

      dark:border-gray-700
      dark:bg-gray-900

      ${styles.ring}
      `}
    >
      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>

        <span
          className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          text-xl

          ${styles.iconBg}
        `}
        >
          {icon}
        </span>

      </div>

      <div className="flex items-end justify-between">

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </h2>

        {trend && (
          <span
            className={`text-sm font-semibold ${
              trend.direction === "up"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {trend.direction === "up"
              ? "▲"
              : "▼"}{" "}
            {trend.value}
          </span>
        )}

      </div>
    </motion.button>
  );
}

export default DashboardCard;