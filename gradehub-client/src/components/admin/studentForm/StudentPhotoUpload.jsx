import { Camera } from "lucide-react";

function StudentPhotoUpload({ formData, handleChange }) {
  const preview = formData.photo ? URL.createObjectURL(formData.photo) : null;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50">
        {preview ? (
          <img
            src={preview}
            alt="Student"
            className="h-full w-full object-cover"
          />
        ) : (
          <Camera size={40} className="text-slate-400" />
        )}
      </div>

      <div className="text-center">
        <label
          htmlFor="student-photo"
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Upload Photo
        </label>

        <input
          id="student-photo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleChange("photo", e.target.files[0])}
        />

        <p className="mt-2 text-xs text-slate-500">JPG or PNG (Maximum 2MB)</p>
      </div>
    </div>
  );
}

export default StudentPhotoUpload;
