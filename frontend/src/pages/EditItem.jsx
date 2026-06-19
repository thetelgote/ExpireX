import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

import ItemForm from "../components/dashboard/ItemForm.jsx";
import Loader from "../components/common/Loader.jsx";

import itemService from "../services/itemService.js";
import { extractErrorMessage } from "../utils/helpers.js";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);

      try {
        const data = await itemService.getItemById(id);

        const currentItem = data.item || data;

        setItem({
          ...currentItem,
          expiryDate: currentItem.expiryDate
            ? currentItem.expiryDate.slice(0, 10)
            : "",
        });
      } catch (err) {
        toast.error(
          extractErrorMessage(
            err,
            "Unable to load item."
          )
        );

        navigate("/items");
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      await itemService.updateItem(id, formData);

      toast.success("Item updated successfully");

      navigate("/items");
    } catch (err) {
      toast.error(
        extractErrorMessage(
          err,
          "Unable to update item."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader
          size="lg"
          label="Loading item..."
        />
      </div>
    );
  }

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
          Edit Item
        </h1>

        <p className="mt-2 text-sm text-ink/55 dark:text-paper/55">
          Update your inventory item information.
        </p>

        <div className="mt-8">

          <ItemForm
            initialValues={item}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Save Changes"
          />

        </div>

      </div>

    </div>
  );
}

export default EditItem;