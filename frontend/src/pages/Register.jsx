import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

import InputField from "../components/common/InputField.jsx";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import {
  validateRegisterForm,
  hasErrors,
} from "../utils/validators.js";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const validation = validateRegisterForm(form);

    if (hasErrors(validation)) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created successfully!");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      <h2 className="font-display text-3xl font-bold text-ink dark:text-paper">
        Create Account
      </h2>

      <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
        Create your Smart Inventory account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <InputField
          label="Full Name"
          name="name"
          icon={<FiUser />}
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={<FiMail />}
          placeholder="john@example.com"
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
          Create Account
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-ink/60 dark:text-paper/60">

        Already have an account?{" "}

        <Link
          to="/login"
          className="font-semibold text-brand-500"
        >
          Sign In
        </Link>

      </p>

    </div>
  );
}

export default Register;