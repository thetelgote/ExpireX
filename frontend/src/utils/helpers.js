/**
 * Pulls the most useful, human-readable message out of an Axios error.
 * Falls back to a provided default message if nothing usable is found.
 *
 * Usage: extractErrorMessage(err, "Unable to load items.")
 */
export function extractErrorMessage(error, fallback = "Something went wrong.") {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
}

/**
 * Formats a number with locale-aware thousands separators.
 * Returns "0" for null/undefined/NaN values instead of throwing.
 */
export function formatNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "0";
  }

  return number.toLocaleString("en-IN");
}

/**
 * Builds a clean params object for axios by stripping out
 * undefined, null, empty-string, and "all" sentinel values.
 *
 * Usage: buildQueryParams({ search, status, category, page, limit })
 */
export function buildQueryParams(params = {}) {
  const cleaned = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "all"
    ) {
      return;
    }

    cleaned[key] = value;
  });

  return cleaned;
}

/**
 * Returns up to 2 uppercase initials from a person's name.
 * Falls back to "?" when no usable name is provided.
 *
 * Usage: getInitials("Sushant Patil") -> "SP"
 */
export function getInitials(name) {
  if (!name || typeof name !== "string") {
    return "?";
  }

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return initials || "?";
}
