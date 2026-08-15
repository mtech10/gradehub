import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ConfirmModal from "../../ui/ConfirmModal";
import { useToast } from "../../../context/ToastContext"; // Adjust path if necessary

function DepartmentActions({ mode = "add", onSave, isSubmitting }) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleConfirmSave = async () => {
    setShowSaveModal(false); // Close the modal immediately for smooth UX

    try {
      // Execute the parent's save function
      if (onSave) {
        await onSave();
      }

      addToast({
        title: mode === "edit" ? "Department Updated" : "Department Created",
        message: `The department has been successfully ${mode === "edit" ? "updated" : "created"}.`,
        type: "success",
      });
    } catch (error) {
      console.error("Form action failed:", error);

      addToast({
        title: "Action Failed",
        message:
          error.message || "An error occurred while saving. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowCancelModal(true)}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        {/* Trigger the Save Confirmation Modal instead of standard submit */}
        <Button
          type="button"
          onClick={() => setShowSaveModal(true)}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? mode === "edit"
              ? "Updating Department..."
              : "Creating Department..."
            : mode === "edit"
              ? "Update Department"
              : "Create Department"}
        </Button>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => navigate("/admin/departments")}
        title="Discard Changes"
        message="Are you sure you want to leave? Any unsaved changes you have made will be lost."
        confirmText="Yes, discard changes"
        cancelText="Stay here"
        isDestructive={true}
      />

      {/* Save Confirmation Modal */}
      <ConfirmModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleConfirmSave}
        title={mode === "edit" ? "Confirm Update" : "Confirm Creation"}
        message={`Are you sure you want to ${mode === "edit" ? "update this department" : "create this new department"}?`}
        confirmText={mode === "edit" ? "Yes, Update" : "Yes, Create"}
        cancelText="Review Form"
        isDestructive={false}
      />
    </>
  );
}

export default DepartmentActions;
