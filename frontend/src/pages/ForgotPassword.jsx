import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

import InputField from "../components/common/InputField.jsx";
import Button from "../components/common/Button.jsx";
import authService from "../services/authService.js";
import { isValidEmail } from "../utils/validators.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.forgotPassword(email);

      setEmailSent(true);

      toast.success("Reset link sent successfully");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Unable to send reset link"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <FiCheckCircle size={32} />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-ink dark:text-paper">
          Check Your Email
        </h2>

        <p className="mt-3 text-sm text-ink/60 dark:text-paper/60">
          We've sent a password reset link to
        </p>

        <p className="mt-2 font-semibold">
          {email}
        </p>

        <Link
          to="/login"
          className="mt-8 inline-block rounded-xl bg-brand-500 px-6 py-3 font-medium text-white"
        >
          Back to Login
        </Link>

      </div>
    );
  }

  return (
    <div>

      <h2 className="text-3xl font-bold text-ink dark:text-paper">
        Forgot Password
      </h2>

      <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">
        Enter your email to receive a password reset link.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >

        <InputField
          label="Email Address"
          type="email"
          icon={<FiMail />}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={error}
        />

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
        >
          Send Reset Link
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-ink/60 dark:text-paper/60">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-500"
        >
          Login
        </Link>
      </p>

    </div>
  );
}

export default ForgotPassword;