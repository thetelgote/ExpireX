// import { useState, useEffect } from "react";
// import {
//   FiPackage,
//   FiHash,
//   FiCalendar,
//   FiTag,
// } from "react-icons/fi";

// import InputField from "../common/InputField.jsx";
// import Button from "../common/Button.jsx";

// import {
//   ITEM_CATEGORIES,
//   UNIT_OPTIONS,
//   DEFAULT_SHELF_LIFE_DAYS,
// } from "../../utils/constants.js";

// import {
//   validateItemForm,
//   hasErrors,
// } from "../../utils/validators.js";

// const EMPTY_FORM = {
//   name: "",
//   category: "",
//   quantity: "",
//   unit: "pcs",
//   expiryDate: "",
//   shelfLifeDays: DEFAULT_SHELF_LIFE_DAYS,
//   notes: "",
// };

// function ItemForm({
//   initialValues,
//   onSubmit,
//   isSubmitting,
//   submitLabel = "Save Item",
// }) {
//   const [form, setForm] = useState({
//     ...EMPTY_FORM,
//     ...initialValues,
//   });

//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (initialValues) {
//       setForm({
//         ...EMPTY_FORM,
//         ...initialValues,
//       });
//     }
//   }, [initialValues]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const validation =
//       validateItemForm(form);

//     if (hasErrors(validation)) {
//       setErrors(validation);
//       return;
//     }

//     onSubmit({
//       ...form,
//       quantity: Number(form.quantity),
//       shelfLifeDays: Number(
//         form.shelfLifeDays
//       ),
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6"
//     >
//       {/* Item Name */}

//       <InputField
//         label="Item Name"
//         name="name"
//         value={form.name}
//         onChange={handleChange}
//         icon={<FiPackage />}
//         placeholder="Milk"
//         error={errors.name}
//       />

//       {/* Category */}

//       <div>

//         <label className="mb-2 block text-sm font-medium">
//           Category
//         </label>

//         <div className="relative">

//           <FiTag
//             className="absolute left-3 top-3.5 text-gray-400"
//           />

//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="
//             w-full
//             rounded-xl
//             border
//             py-3
//             pl-10
//             pr-4
//             outline-none
//             focus:border-brand-500
//           "
//           >
//             <option value="">
//               Select Category
//             </option>

//             {ITEM_CATEGORIES.map(
//               (category) => (
//                 <option
//                   key={category}
//                   value={category}
//                 >
//                   {category}
//                 </option>
//               )
//             )}
//           </select>

//         </div>

//         {errors.category && (
//           <p className="mt-1 text-xs text-red-500">
//             {errors.category}
//           </p>
//         )}

//       </div>

//       {/* Quantity */}

//       <div className="grid gap-5 md:grid-cols-2">

//         <InputField
//           label="Quantity"
//           name="quantity"
//           type="number"
//           value={form.quantity}
//           onChange={handleChange}
//           icon={<FiHash />}
//           error={errors.quantity}
//         />

//         <div>

//           <label className="mb-2 block text-sm font-medium">
//             Unit
//           </label>

//           <select
//             name="unit"
//             value={form.unit}
//             onChange={handleChange}
//             className="
//             w-full
//             rounded-xl
//             border
//             px-4
//             py-3
//             outline-none
//             focus:border-brand-500
//           "
//           >
//             {UNIT_OPTIONS.map(
//               (unit) => (
//                 <option
//                   key={unit}
//                   value={unit}
//                 >
//                   {unit}
//                 </option>
//               )
//             )}
//           </select>

//         </div>

//       </div>

//       {/* Expiry */}

//       <div className="grid gap-5 md:grid-cols-2">

//         <InputField
//           label="Expiry Date"
//           name="expiryDate"
//           type="date"
//           value={form.expiryDate}
//           onChange={handleChange}
//           icon={<FiCalendar />}
//           error={errors.expiryDate}
//         />

//         <InputField
//           label="Shelf Life (Days)"
//           name="shelfLifeDays"
//           type="number"
//           value={form.shelfLifeDays}
//           onChange={handleChange}
//         />

//       </div>

//       {/* Notes */}

//       <div>

//         <label className="mb-2 block text-sm font-medium">
//           Notes
//         </label>

//         <textarea
//           rows={4}
//           name="notes"
//           value={form.notes}
//           onChange={handleChange}
//           placeholder="Additional Notes..."
//           className="
//           w-full
//           rounded-xl
//           border
//           px-4
//           py-3
//           outline-none
//           focus:border-brand-500
//         "
//         />

//       </div>

//       {/* Button */}

//       <Button
//         type="submit"
//         isLoading={isSubmitting}
//       >
//         {submitLabel}
//       </Button>

//     </form>
//   );
// }

// export default ItemForm;





import { useState, useEffect } from "react";
import {
  FiPackage,
  FiHash,
  FiCalendar,
  FiTag,
} from "react-icons/fi";

import InputField from "../common/InputField.jsx";
import Button from "../common/Button.jsx";

import {
  ITEM_CATEGORIES,
  UNIT_OPTIONS,
  DEFAULT_SHELF_LIFE_DAYS,
} from "../../utils/constants.js";

import {
  validateItemForm,
  hasErrors,
} from "../../utils/validators.js";

const EMPTY_FORM = {
  itemName: "",
  category: "",
  quantity: "",
  unit: "pcs",
  expiryDate: "",
  shelfLifeDays: DEFAULT_SHELF_LIFE_DAYS,
  notes: "",
};

function ItemForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Item",
}) {
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...EMPTY_FORM,
        ...initialValues,
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation =
      validateItemForm(form);

    if (hasErrors(validation)) {
      setErrors(validation);
      return;
    }

    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      shelfLifeDays: Number(
        form.shelfLifeDays
      ),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Item Name */}

      <InputField
        label="Item Name"
        name="itemName"
        value={form.itemName}
        onChange={handleChange}
        icon={<FiPackage />}
        placeholder="Milk"
        error={errors.itemName}
      />

      {/* Category */}

      <div>

        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <div className="relative">

          <FiTag
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            border
            py-3
            pl-10
            pr-4
            outline-none
            focus:border-brand-500
          "
          >
            <option value="">
              Select Category
            </option>

            {ITEM_CATEGORIES.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

        </div>

        {errors.category && (
          <p className="mt-1 text-xs text-red-500">
            {errors.category}
          </p>
        )}

      </div>

      {/* Quantity */}

      <div className="grid gap-5 md:grid-cols-2">

        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          icon={<FiHash />}
          error={errors.quantity}
        />

        <div>

          <label className="mb-2 block text-sm font-medium">
            Unit
          </label>

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            border
            px-4
            py-3
            outline-none
            focus:border-brand-500
          "
          >
            {UNIT_OPTIONS.map(
              (unit) => (
                <option
                  key={unit}
                  value={unit}
                >
                  {unit}
                </option>
              )
            )}
          </select>

        </div>

      </div>

      {/* Expiry */}

      <div className="grid gap-5 md:grid-cols-2">

        <InputField
          label="Expiry Date"
          name="expiryDate"
          type="date"
          value={form.expiryDate}
          onChange={handleChange}
          icon={<FiCalendar />}
          error={errors.expiryDate}
        />

        <InputField
          label="Shelf Life (Days)"
          name="shelfLifeDays"
          type="number"
          value={form.shelfLifeDays}
          onChange={handleChange}
        />

      </div>

      {/* Notes */}

      <div>

        <label className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          rows={4}
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional Notes..."
          className="
          w-full
          rounded-xl
          border
          px-4
          py-3
          outline-none
          focus:border-brand-500
        "
        />

      </div>

      {/* Button */}

      <Button
        type="submit"
        isLoading={isSubmitting}
      >
        {submitLabel}
      </Button>

    </form>
  );
}

export default ItemForm;