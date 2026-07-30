import { useState } from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";

function EditProfileModal({ isOpen, onClose, currentData, onSave }) {
  // Initialize form state with current student data
  const [formData, setFormData] = useState({
    phone: currentData.phone,
    maritalStatus: currentData.maritalStatus,
    homeAddress: currentData.homeAddress,
    permanentAddress: currentData.permanentAddress,
    emergency: { ...currentData.emergency },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("em_")) {
      // Handle nested emergency object
      const emField = name.replace("em_", "");
      setFormData((prev) => ({
        ...prev,
        emergency: { ...prev.emergency, [emField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClass = "mb-1 block text-xs font-semibold text-slate-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Profile</h2>
            <p className="text-sm text-slate-500">
              Update your personal and contact information.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6">
          <form
            id="edit-profile-form"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Personal Section */}
            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Personal Info
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Home Address</label>
                  <input
                    type="text"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Permanent Address</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Emergency Section */}
            <section>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                Emergency Contact
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Contact Name</label>
                  <input
                    type="text"
                    name="em_name"
                    value={formData.emergency.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Relationship</label>
                  <input
                    type="text"
                    name="em_relationship"
                    value={formData.emergency.relationship}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="text"
                    name="em_phone"
                    value={formData.emergency.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Contact Address</label>
                  <input
                    type="text"
                    name="em_address"
                    value={formData.emergency.address}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="edit-profile-form">
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
