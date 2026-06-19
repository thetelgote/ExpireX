import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiSave,
} from "react-icons/fi";
import toast from "react-hot-toast";

import InputField from "../components/common/InputField.jsx";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import authService from "../services/authService.js";
import {
  isStrongPassword,
} from "../utils/validators.js";
import {
  extractErrorMessage,
  getInitials,
} from "../utils/helpers.js";

function Profile() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleProfileChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    setLoadingProfile(true);

    try {
      const data = await authService.updateProfile(profile);

      setUser(data.user || data);

      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Unable to update profile."
        )
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (
      !isStrongPassword(password.newPassword)
    ) {
      return toast.error(
        "Password must contain at least 8 characters, one letter and one number."
      );
    }

    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    setLoadingPassword(true);

    try {
      await authService.changePassword(
        password
      );

      toast.success(
        "Password updated successfully."
      );

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Unable to change password."
        )
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}

      <div>

        <h1 className="font-display text-3xl font-bold text-ink dark:text-paper">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
          Manage your account settings.
        </p>

      </div>

      {/* Avatar */}

      <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card dark:border-paper/5 dark:bg-ink-soft">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white">

            {getInitials(user?.name)}

          </div>

          <div>

            <h2 className="text-xl font-semibold">
              {user?.name}
            </h2>

            <p className="text-sm text-ink/60 dark:text-paper/60">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

      {/* Update Profile */}

      <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card dark:border-paper/5 dark:bg-ink-soft">

        <h2 className="mb-6 text-xl font-semibold">
          Personal Information
        </h2>

        <form
          onSubmit={updateProfile}
          className="space-y-5"
        >

          <InputField
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            icon={<FiUser />}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleProfileChange}
            icon={<FiMail />}
          />

          <Button
            type="submit"
            isLoading={loadingProfile}
            icon={<FiSave />}
          >
            Save Changes
          </Button>

        </form>

      </div>

      {/* Change Password */}

      <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card dark:border-paper/5 dark:bg-ink-soft">

        <h2 className="mb-6 text-xl font-semibold">
          Change Password
        </h2>

        <form
          onSubmit={updatePassword}
          className="space-y-5"
        >

          <InputField
            label="Current Password"
            name="currentPassword"
            type="password"
            icon={<FiLock />}
            value={password.currentPassword}
            onChange={handlePasswordChange}
          />

          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            icon={<FiLock />}
            value={password.newPassword}
            onChange={handlePasswordChange}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            icon={<FiLock />}
            value={password.confirmPassword}
            onChange={handlePasswordChange}
          />

          <Button
            type="submit"
            isLoading={loadingPassword}
          >
            Update Password
          </Button>

        </form>

      </div>

    </div>
  );
}

export default Profile;