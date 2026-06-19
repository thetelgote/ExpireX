import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

import InputField from "../components/common/InputField.jsx";
import Button from "../components/common/Button.jsx";
import authService from "../services/authService.js";
import { isStrongPassword } from "../utils/validators.js";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = {};

    if (!isStrongPassword(form.password)) {
      validation.password =
        "Password must contain at least 8 characters with one letter and one number";
    }

    if (form.password !== form.confirmPassword) {
      validation.confirmPassword =
        "Passwords do not match";
    }

    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.resetPassword(
        token,
        form.password
      );

      setSuccess(true);

      toast.success("Password updated successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Reset link expired or invalid"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <FiCheckCircle size={30} />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-ink dark:text-paper">
          Password Updated
        </h2>

        <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
          Redirecting to Login...
        </p>

      </div>
    );
  }

  return (
    <div>

      <h2 className="text-3xl font-bold text-ink dark:text-paper">
        Reset Password
      </h2>

      <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
        Enter your new password below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <InputField
          label="New Password"
          name="password"
          type="password"
          icon={<FiLock />}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          icon={<FiLock />}
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
        >
          Reset Password
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-ink/60 dark:text-paper/60">

        <Link
          to="/login"
          className="font-semibold text-brand-500"
        >
          Back to Login
        </Link>

      </p>

    </div>
  );
}

export default ResetPassword;