import {
  FiSearch,
  FiX,
} from "react-icons/fi";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative">

      <FiSearch
        size={18}
        className="absolute left-3 top-3.5 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="
        w-full
        rounded-xl
        border
        py-3
        pl-10
        pr-10
        outline-none
        focus:border-brand-500
      "
      />

      {value && (
        <button
          onClick={() =>
            onChange("")
          }
          className="absolute right-3 top-3"
        >
          <FiX />
        </button>
      )}

    </div>
  );
}

export default SearchBar;