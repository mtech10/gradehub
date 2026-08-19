import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import ConfirmModal from "../../ui/ConfirmModal";
import { useToast } from "../../../context/ToastContext";

function StudentFormActions({ mode = "create", onSave, isSubmitting }) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleConfirmSave = async () => {
    setShowSaveModal(false);

    try {
      await onSave();

      addToast({
        title: mode === "edit" ? "Student Updated" : "Student Saved",
        message: `The student profile has been successfully ${mode === "edit" ? "updated" : "created"}.`,
        type: "success",
      });
    } catch (error) {
      console.error("Form action failed:", error);

      addToast({
        title: "Action Failed",
        message:
          error.message ||
          "An error occurred while saving. Please check your data and try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t border-slate-200 pt-6">
        <Button
          variant="secondary"
          onClick={() => setShowCancelModal(true)}
          disabled={isSubmitting}
          className="w-full sm:w-auto justify-center"
        >
          Cancel
        </Button>

        <Button
          onClick={() => setShowSaveModal(true)}
          disabled={isSubmitting}
          className="w-full sm:w-auto justify-center"
        >
          {isSubmitting
            ? mode === "edit"
              ? "Updating Student..."
              : "Saving Student..."
            : mode === "edit"
              ? "Update Student"
              : "Save Student"}
        </Button>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => navigate("/admin/students")}
        title="Discard Changes"
        message="Are you sure you want to leave? Any unsaved changes you have made to this student profile will be lost."
        confirmText="Yes, discard changes"
        cancelText="Stay here"
        isDestructive={true}
      />

      {/* Save Confirmation Modal */}
      <ConfirmModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={handleConfirmSave}
        title={mode === "edit" ? "Confirm Update" : "Confirm Save"}
        message={`Are you sure you want to ${mode === "edit" ? "update this student's profile" : "save this new student"}?`}
        confirmText={mode === "edit" ? "Yes, Update" : "Yes, Save"}
        cancelText="Review Form"
        isDestructive={false}
      />
    </>
  );
}

export default StudentFormActions;
