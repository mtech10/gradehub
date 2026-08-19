import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import ConfirmModal from "../ui/ConfirmModal";
import { profileFormConfig } from "../../constants/profile/profileFormConfig";
import { useToast } from "../../context/ToastContext";

function EditProfileModal({
  isOpen,
  onClose,
  currentData,
  onSave,
  type = "student",
}) {
  const [form, setForm] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    setForm(currentData || {});
  }, [currentData]);

  const fields = profileFormConfig[type] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSave = () => {
    setShowConfirm(false);
    onSave(form);

    addToast({
      title: "Profile Updated",
      message: "Your profile information has been successfully saved.",
      type: "success",
    });
  };

  const modalTitle = {
    student: "Edit Student Profile",
    admin: "Edit Administrator Profile",
  };

  const buttonText = {
    student: "Save Student Profile",
    admin: "Save Administrator Profile",
  };

  const modalFooter = (
    <div className="flex flex-col-reverse sm:flex-row gap-2 w-full sm:w-auto">
      <Button
        type="button"
        variant="ghost"
        onClick={onClose}
        className="w-full sm:w-auto justify-center"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="edit-profile-form"
        className="w-full sm:w-auto justify-center"
      >
        {buttonText[type]}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={modalTitle[type]}
        subtitle="Update your personal information."
        footer={modalFooter}
        maxWidth="max-w-2xl"
      >
        <form
          id="edit-profile-form"
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8 p-1"
        >
          <section>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
              Personal Information
            </h3>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
              {fields.map((field) => (
                <Input
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  required={field.required}
                  value={form[field.key] || ""}
                  disabled={field.key === "email" || field.type === "email"}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                />
              ))}
            </div>
          </section>

          {type === "student" && form.emergency && (
            <section>
              <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
                Emergency Contact
              </h3>
              <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2">
                <Input
                  label="Contact Name"
                  value={form.emergency.name || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      emergency: { ...prev.emergency, name: e.target.value },
                    }))
                  }
                />
                <Input
                  label="Relationship"
                  value={form.emergency.relationship || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      emergency: {
                        ...prev.emergency,
                        relationship: e.target.value,
                      },
                    }))
                  }
                />
                <Input
                  label="Phone Number"
                  value={form.emergency.phone || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      emergency: { ...prev.emergency, phone: e.target.value },
                    }))
                  }
                />
                <Input
                  label="Address"
                  value={form.emergency.address || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      emergency: { ...prev.emergency, address: e.target.value },
                    }))
                  }
                />
              </div>
            </section>
          )}
        </form>
      </Modal>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSave}
        title="Confirm Profile Update"
        message="Are you sure you want to save these changes to your profile?"
        confirmText="Yes, Save Changes"
        cancelText="Review Changes"
        isDestructive={false}
      />
    </>
  );
}

export default EditProfileModal;
