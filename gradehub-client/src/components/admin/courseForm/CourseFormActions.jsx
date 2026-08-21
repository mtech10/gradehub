import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ConfirmModal from "../../ui/ConfirmModal";
import { useToast } from "../../../context/ToastContext";

function CourseFormActions({ mode = "create", onSave, isSubmitting = false }) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleConfirmSave = async () => {
    setShowSaveModal(false);

    try {
      if (onSave) {
        await onSave();
      }

      addToast({
        title: mode === "edit" ? "Course Updated" : "Course Created",
        message: `The course has been successfully ${mode === "edit" ? "updated" : "created"}.`,
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
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-slate-200 pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowCancelModal(true)}
          disabled={isSubmitting}
          className="w-full sm:w-auto justify-center"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={() => setShowSaveModal(true)}
          disabled={isSubmitting}
          className="w-full sm:w-auto justify-center"
        >
          {isSubmitting
            ? mode === "edit"
              ? "Updating Course..."
              : "Creating Course..."
            : mode === "edit"
              ? "Update Course"
              : "Create Course"}
        </Button>
      </div>

      {}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => navigate("/admin/courses")}
        title="Discard Changes"
        message="Are you sure you want to leave? Any unsaved changes you have made will be lost."
        confirmText="Yes, discard changes"
        cancelText="Stay here"
        isDestructive={true}
      />

      {}
      <ConfirmModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleConfirmSave}
        title={mode === "edit" ? "Confirm Update" : "Confirm Creation"}
        message={`Are you sure you want to ${mode === "edit" ? "update this course" : "create this new course"}?`}
        confirmText={mode === "edit" ? "Yes, Update" : "Yes, Create"}
        cancelText="Review Form"
        isDestructive={false}
      />
    </>
  );
}

export default CourseFormActions;
