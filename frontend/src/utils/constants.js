export const ITEM_CATEGORIES = [
  "Dairy",
  "Bakery",
  "Fruits & Vegetables",
  "Meat & Seafood",
  "Beverages",
  "Snacks",
  "Frozen Foods",
  "Condiments & Sauces",
  "Grains & Pulses",
  "Personal Care",
  "Medicine",
  "Other",
];

export const UNIT_OPTIONS = [
  "pcs",
  "kg",
  "g",
  "l",
  "ml",
  "pack",
  "box",
  "bottle",
];

export const DEFAULT_SHELF_LIFE_DAYS = 14;

// Used as <select> filter options on the Item List page.
// value: "all" is treated as "no filter" by buildQueryParams().
export const ITEM_STATUS_FILTERS = [
  { value: "all", label: "All Status" },
  { value: "fresh", label: "Fresh" },
  { value: "soon", label: "Expiring Soon" },
  { value: "critical", label: "Critical" },
  { value: "expired", label: "Expired" },
];

export const SORT_OPTIONS = [
  { value: "expiryDate-asc", label: "Expiry Date (Earliest)" },
  { value: "expiryDate-desc", label: "Expiry Date (Latest)" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "createdAt-desc", label: "Recently Added" },
];

export const PAGE_SIZE = 9;
