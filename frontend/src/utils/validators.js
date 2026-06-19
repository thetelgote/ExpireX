// // Email Validation
// export const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

// // Strong Password Validation
// export const isStrongPassword = (password) => {
//   return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
// };

// // Check Validation Errors
// export const hasErrors = (errors) => {
//   return Object.values(errors).some(Boolean);
// };

// // Login Validation
// export const validateLoginForm = (form) => {
//   const errors = {};

//   if (!form.email.trim()) {
//     errors.email = "Email is required";
//   } else if (!isValidEmail(form.email)) {
//     errors.email = "Enter a valid email";
//   }

//   if (!form.password) {
//     errors.password = "Password is required";
//   }

//   return errors;
// };

// // Register Validation
// export const validateRegisterForm = (form) => {
//   const errors = {};

//   if (!form.name.trim()) {
//     errors.name = "Full name is required";
//   }

//   if (!form.email.trim()) {
//     errors.email = "Email is required";
//   } else if (!isValidEmail(form.email)) {
//     errors.email = "Enter a valid email";
//   }

//   if (!isStrongPassword(form.password)) {
//     errors.password =
//       "Password must contain at least 8 characters and one number";
//   }

//   if (form.password !== form.confirmPassword) {
//     errors.confirmPassword = "Passwords do not match";
//   }

//   return errors;
// };

// // Item Validation
// export const validateItemForm = (form) => {
//   const errors = {};

//   if (!form.name.trim()) {
//     errors.name = "Item name is required";
//   }

//   if (!form.category) {
//     errors.category = "Category is required";
//   }

//   if (!form.quantity || Number(form.quantity) <= 0) {
//     errors.quantity = "Quantity must be greater than zero";
//   }

//   if (!form.expiryDate) {
//     errors.expiryDate = "Expiry date is required";
//   }

//   return errors;
// };



// Email Validation
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Strong Password Validation
export const isStrongPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
};

// Check Validation Errors
export const hasErrors = (errors) => {
  return Object.values(errors).some(Boolean);
};

// Login Validation
export const validateLoginForm = (form) => {
  const errors = {};

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  return errors;
};

// Register Validation
export const validateRegisterForm = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Enter a valid email";
  }

  if (!isStrongPassword(form.password)) {
    errors.password =
      "Password must contain at least 8 characters and one number";
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

// Item Validation
export const validateItemForm = (form) => {
  const errors = {};

  if (!form.itemName.trim()) {
    errors.itemName = "Item name is required";
  }

  if (!form.category) {
    errors.category = "Category is required";
  }

  if (!form.quantity || Number(form.quantity) <= 0) {
    errors.quantity = "Quantity must be greater than zero";
  }

  if (!form.expiryDate) {
    errors.expiryDate = "Expiry date is required";
  }

  return errors;
};