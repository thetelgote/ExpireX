import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

import ItemForm from "../components/dashboard/ItemForm.jsx";
import itemService from "../services/itemService.js";
import { extractErrorMessage } from "../utils/helpers.js";

function AddItem() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await itemService.createItem(formData);
       console.log("Form Data:", formData);

      toast.success(`${formData.itemName} added successfully`);

      navigate("/items");
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Unable to add item."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">

      <Link
        to="/items"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition hover:text-brand-500 dark:text-paper/60"
      >
        <FiArrowLeft size={16} />
        Back to Items
      </Link>

      <div className="rounded-2xl border border-ink/5 bg-white p-6 shadow-card dark:border-paper/5 dark:bg-ink-soft dark:shadow-card-dark">

        <h1 className="font-display text-3xl font-bold text-ink dark:text-paper">
          Add New Item
        </h1>

        <p className="mt-2 text-sm text-ink/55 dark:text-paper/55">
          Fill in the details below to add a new product to your inventory.
        </p>

        <div className="mt-8">

          <ItemForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Add Item"
          />

        </div>

      </div>

    </div>
  );
}

export default AddItem;