const SIZE = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

function Loader({
  size = "md",
  fullScreen = false,
  label,
}) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`${SIZE[size]} animate-spin rounded-full border-brand-200 border-t-brand-500`}
      />

      {label && (
        <p className="text-sm text-gray-500">
          {label}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export default Loader;