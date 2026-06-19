// import { forwardRef, useState } from "react";
// import {
//   FiEye,
//   FiEyeOff,
// } from "react-icons/fi";

// const InputField = forwardRef(
//   (
//     {
//       label,
//       error,
//       icon,
//       type = "text",
//       className = "",
//       ...props
//     },
//     ref
//   ) => {
//     const [show, setShow] = useState(false);

//     const isPassword =
//       type === "password";

//     return (
//       <div>

//         {label && (
//           <label className="mb-2 block text-sm font-medium">
//             {label}
//           </label>
//         )}

//         <div className="relative">

//           {icon && (
//             <span className="absolute left-3 top-3.5 text-gray-400">
//               {icon}
//             </span>
//           )}

//           <input
//             ref={ref}
//             type={
//               isPassword
//                 ? show
//                   ? "text"
//                   : "password"
//                 : type
//             }
//             className={`
//             w-full rounded-xl border
//             px-4 py-3
//             ${icon ? "pl-10" : ""}
//             ${isPassword ? "pr-10" : ""}
//             focus:border-brand-500
//             outline-none
//             ${className}
//           `}
//             {...props}
//           />

//           {isPassword && (
//             <button
//               type="button"
//               onClick={() =>
//                 setShow(!show)
//               }
//               className="absolute right-3 top-3"
//             >
//               {show ? (
//                 <FiEyeOff />
//               ) : (
//                 <FiEye />
//               )}
//             </button>
//           )}

//         </div>

//         {error && (
//           <p className="mt-1 text-xs text-red-500">
//             {error}
//           </p>
//         )}

//       </div>
//     );
//   }
// );

// InputField.displayName = "InputField";

// export default InputField;

import { forwardRef, useState } from "react";
import {
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const InputField = forwardRef(
  (
    {
      label,
      error,
      icon,
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    const isPassword =
      type === "password";

    return (
      <div>

        {label && (
          <label className="mb-2 block text-sm font-medium">
            {label}
          </label>
        )}

        <div className="relative">

          {icon && (
            <span className="pointer-events-none absolute left-3 top-3.5 text-gray-400">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={
              isPassword
                ? show
                  ? "text"
                  : "password"
                : type
            }
            className={`
            w-full rounded-xl border
            px-4 py-3
            ${icon ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}
            focus:border-brand-500
            outline-none
            ${className}
          `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() =>
                setShow(!show)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center text-gray-400 hover:text-gray-600"
            >
              {show ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>
          )}

        </div>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;