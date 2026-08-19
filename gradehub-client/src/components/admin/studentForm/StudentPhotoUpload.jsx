import { Camera } from "lucide-react";

function StudentPhotoUpload({ formData, handleChange }) {
  let preview = "";

  if (formData.photo) {
    if (typeof formData.photo === "string") {
      preview = formData.photo;
    } else if (
      formData.photo instanceof File ||
      formData.photo instanceof Blob
    ) {
      preview = URL.createObjectURL(formData.photo);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      <div className="flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50">
        {preview ? (
          <img
            src={preview}
            alt="Student"
            className="h-full w-full object-cover"
          />
        ) : (
          <Camera size={36} className="text-slate-400 sm:w-10 sm:h-10" />
        )}
      </div>

      <div className="text-center">
        <label
          htmlFor="student-photo"
          className="cursor-pointer inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
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
