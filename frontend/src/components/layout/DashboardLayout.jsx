import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      {/* Top Navbar */}
      <Navbar
        onMenuClick={() => setMobileOpen(true)}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* Main Content */}
        <main className="flex min-h-[calc(100vh-64px)] flex-1 flex-col overflow-hidden">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;