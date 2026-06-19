import { Routes, Route, Navigate } from "react-router-dom";

// Authentication Pages
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

// Dashboard Pages
import Dashboard from "../pages/Dashboard.jsx";
import ItemList from "../pages/ItemList.jsx";
import AddItem from "../pages/AddItem.jsx";
import EditItem from "../pages/EditItem.jsx";
import ExpiredItems from "../pages/ExpiredItems.jsx";
import Notifications from "../pages/Notifications.jsx";
import Profile from "../pages/Profile.jsx";

// Layouts
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";

// Protected Route
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

// 404 Page
import NotFound from "../pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>

      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Protected Dashboard */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/items" element={<ItemList />} />

        <Route path="/items/add" element={<AddItem />} />

        <Route path="/items/edit/:id" element={<EditItem />} />

        <Route path="/items/expired" element={<ExpiredItems />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;