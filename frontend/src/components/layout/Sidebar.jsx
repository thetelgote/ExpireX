import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiGrid,
  FiPackage,
  FiPlusCircle,
  FiBell,
  FiUser,
  FiX,
} from "react-icons/fi";

const menu = [
  {
    to: "/dashboard",
    icon: FiGrid,
    label: "Dashboard",
  },
  {
    to: "/items",
    icon: FiPackage,
    label: "Items",
  },
  {
    to: "/items/add",
    icon: FiPlusCircle,
    label: "Add Item",
  },
  {
    to: "/notifications",
    icon: FiBell,
    label: "Notifications",
  },
  {
    to: "/profile",
    icon: FiUser,
    label: "Profile",
  },
];

function SidebarNav({ onNavigate }) {
  return (
    <nav className="space-y-2 px-4">
      {menu.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 ${
                isActive
                  ? "bg-brand-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Icon size={18} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 border-r bg-white lg:block dark:border-gray-800 dark:bg-gray-900">
        <div className="p-6">
          <h2 className="text-xl font-bold">Smart Inventory</h2>
        </div>

        <SidebarNav />
      </aside>

      {/* Mobile sidebar (drawer + backdrop) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl lg:hidden dark:bg-gray-900"
            >
              <div className="flex items-center justify-between p-6">
                <h2 className="text-xl font-bold">Smart Inventory</h2>

                <button
                  onClick={onClose}
                  className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              <SidebarNav onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
