import {
  getExpiryStatus,
  STATUS_META,
} from "../../utils/expiryUtils";

function ExpiryBadge({ expiryDate }) {

  const status =
    getExpiryStatus(expiryDate);

  const meta =
    STATUS_META[status];

  return (

    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${meta.text}`}
      style={{
        background: `${meta.color}20`,
      }}
    >
      {meta.label}
    </span>

  );
}

export default ExpiryBadge;