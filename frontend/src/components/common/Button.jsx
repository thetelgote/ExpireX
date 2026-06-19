import { forwardRef } from "react";
import Loader from "./Loader.jsx";

const VARIANTS = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/20",
  secondary:
    "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
  outline:
    "border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

const SIZES = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      isLoading = false,
      disabled = false,
      className = "",
      fullWidth = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
        {...props}
      >
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          <>
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;