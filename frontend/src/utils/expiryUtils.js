export const STATUS_META = {
  fresh: {
    label: "Fresh",
    color: "#3FA66E",
    text: "text-fresh",
    dot: "bg-fresh",
  },
  soon: {
    label: "Soon",
    color: "#E8A33D",
    text: "text-soon",
    dot: "bg-soon",
  },
  critical: {
    label: "Critical",
    color: "#FF6B35",
    text: "text-orange-500",
    dot: "bg-orange-500",
  },
  expired: {
    label: "Expired",
    color: "#E2543D",
    text: "text-expired",
    dot: "bg-expired",
  },
};

export function getExpiryStatus(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  const diff = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) return "expired";
  if (diff <= 3) return "critical";
  if (diff <= 7) return "soon";
  return "fresh";
}

export function getCountdownLabel(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  const diff = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) return "Expired";
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";

  return `${diff} days left`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN");
}

export function getFreshnessPercent(
  expiryDate,
  shelfLifeDays = 14
) {
  const today = new Date();
  const expiry = new Date(expiryDate);

  const diff = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  const percent = (diff / shelfLifeDays) * 100;

  return Math.min(100, Math.max(0, percent));
}