import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import UploadResultForm from "../../components/admin/uploadResults/UploadResultForm";
import UploadPreviewCard from "../../components/admin/uploadResults/UploadPreviewCard";
import UploadSummaryCard from "../../components/admin/uploadResults/UploadSummaryCard";
import UploadNotesCard from "../../components/admin/uploadResults/UploadNotesCard";

import {
  SESSIONS,
  SEMESTERS,
  DEPARTMENTS,
  LEVELS,
} from "../../constants/options";

import { courses } from "../../constants/admin/courses";

import { getCourseOptions } from "../../utils/courseOptions";

function UploadResults() {
  const [formData, setFormData] = useState({
    session: "",
    semester: "",
    department: "",
    course: "",
    level: "",
    uploadType: "new",
    file: null,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const courseOptions = getCourseOptions(courses);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Upload Results"
        subtitle="Upload student results in bulk using an Excel file."
      />

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <UploadResultForm
          formData={formData}
          updateField={updateField}
          sessions={SESSIONS}
          semesters={SEMESTERS}
          departments={DEPARTMENTS}
          levels={LEVELS}
          courseOptions={courseOptions}
        />
        <div className="space-y-6">
          <UploadPreviewCard formData={formData} />

          <UploadSummaryCard />

          <UploadNotesCard />
        </div>
      </div>
    </div>
  );
}

export default UploadResults;
