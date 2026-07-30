import { useState } from "react";
import { Edit3 } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import ProfileMainCard from "../../components/profile/ProfileMainCard";
import {
  ContactInfoCard,
  AcademicInfoCard,
  ProfileNotice,
} from "../../components/profile/ProfileCards";
import EditProfileModal from "../../components/profile/EditProfileModal";
import {
  initialStudentData,
  generateProfileUI,
} from "../../constants/profile/profileData";

function Profile() {
  // Store the raw, API-ready data in state
  const [student, setStudent] = useState(initialStudentData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate the formatted UI data on the fly
  const uiData = generateProfileUI(student);

  const handleSaveProfile = (updatedFields) => {
    // In a real app, this is where you'd fire your API PUT/PATCH request
    setStudent((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="My Profile"
          subtitle="View and manage your personal information."
        />
        <Button
          variant="outline"
          className="shrink-0 bg-white"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit3 size={18} />
          Edit Profile
        </Button>
      </div>

      {/* Pass the dynamically generated uiData to the components */}
      <ProfileMainCard data={uiData} />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ContactInfoCard
          title="Contact Information"
          items={uiData.contactInfo}
        />

        <ContactInfoCard
          title="Emergency Contact"
          items={uiData.emergencyContact}
        />

        <AcademicInfoCard
          title="Academic Information"
          items={uiData.academicInfo}
        />
      </div>

      <ProfileNotice />

      {/* The Edit Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={student}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default Profile;
