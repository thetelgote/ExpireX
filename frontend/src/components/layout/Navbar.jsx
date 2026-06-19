import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import NotificationBell from "../common/NotificationBell";

function Navbar({ onMenuClick }) {

  const {
    isDark,
    toggleTheme,
  } = useTheme();

  return (

    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-900">

      <button
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <FiMenu size={22} />
      </button>

      <h1 className="text-lg font-bold">
        Smart Inventory
      </h1>

      <div className="flex items-center gap-3">

        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDark ? (
            <FiSun />
          ) : (
            <FiMoon />
          )}
        </button>

        <NotificationBell />

      </div>

    </header>

  );
}

export default Navbar;