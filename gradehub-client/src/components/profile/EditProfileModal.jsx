import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import { profileFormConfig } from "../../constants/profile/profileFormConfig";

function EditProfileModal({
  isOpen,
  onClose,
  currentData,
  onSave,
  type = "student",
}) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(currentData || {});
  }, [currentData]);

  if (!isOpen) return null;

  const fields = profileFormConfig[type] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const modalTitle = {
    student: "Edit Student Profile",
    admin: "Edit Administrator Profile",
  };

  const buttonText = {
    student: "Save Student Profile",
    admin: "Save Administrator Profile",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {modalTitle[type]}
            </h2>

            <p className="text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">
          <form
            id="edit-profile-form"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Personal Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                {fields.map((field) => (
                  <Input
                    key={field.key}
                    label={field.label}
                    type={field.type}
                    required={field.required}
                    value={form[field.key] || ""}
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
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                  Emergency Contact
                </h3>

                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    label="Contact Name"
                    value={form.emergency.name || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        emergency: {
                          ...prev.emergency,
                          name: e.target.value,
                        },
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
                        emergency: {
                          ...prev.emergency,
                          phone: e.target.value,
                        },
                      }))
                    }
                  />

                  <Input
                    label="Address"
                    value={form.emergency.address || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        emergency: {
                          ...prev.emergency,
                          address: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </section>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" form="edit-profile-form">
            {buttonText[type]}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
