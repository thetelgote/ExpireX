import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiPackage } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 dark:bg-ink">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-3xl border border-ink/5 bg-white p-10 text-center shadow-card dark:border-paper/5 dark:bg-ink-soft dark:shadow-card-dark"
      >
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
          <FiPackage size={42} />
        </div>

        <h1 className="mt-8 font-display text-7xl font-bold text-ink dark:text-paper">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-ink dark:text-paper">
          Page Not Found
        </h2>

        <p className="mt-3 text-sm leading-6 text-ink/60 dark:text-paper/60">
          Sorry, the page you are looking for doesn't exist or has been
          moved. Please check the URL or return to your dashboard.
        </p>

        <Link
          to={isAuthenticated ? "/dashboard" : "/login"}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
        >
          <FiArrowLeft size={16} />
          {isAuthenticated
            ? "Back to Dashboard"
            : "Back to Login"}
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;