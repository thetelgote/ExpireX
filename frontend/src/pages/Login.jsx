import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

import InputField from "../components/common/InputField.jsx";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  validateLoginForm,
  hasErrors,
} from "../utils/validators.js";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation =
      validateLoginForm(form);

    if (hasErrors(validation)) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);

    try {
      await login(
        form.email,
        form.password
      );

      toast.success("Welcome Back!");

      const redirectTo =
        location.state?.from?.pathname ||
        "/dashboard";

      navigate(redirectTo, {
        replace: true,
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      <h2 className="font-display text-3xl font-bold text-ink dark:text-paper">
        Welcome Back
      </h2>

      <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
        Login to continue managing your inventory.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={<FiMail />}
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          icon={<FiLock />}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-brand-500"
          >
            Forgot Password?
          </Link>

        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
        >
          Login
        </Button>

      </form>

      <p className="mt-6 text-center text-sm">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="font-semibold text-brand-500"
        >
          Register
        </Link>

      </p>

    </div>
  );
}

export default Login;