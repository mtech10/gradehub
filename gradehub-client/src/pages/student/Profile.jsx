import { useState } from "react";
import { Edit3 } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import ProfileMainCard from "../../components/profile/ProfileMainCard";
import {
  ContactInfoCard,
  InfoCard,
  ProfileNotice,
} from "../../components/profile/ProfileCards";

import EditProfileModal from "../../components/profile/EditProfileModal";

import {
  initialStudentData,
  generateProfileUI,
} from "../../constants/profile/profileData";

function Profile() {
  // Backend-ready student model
  const [student, setStudent] = useState(initialStudentData);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Presentation model
  const profileData = generateProfileUI(student);

  const handleProfileUpdate = (updatedFields) => {
    // Later:
    // await profileService.updateProfile(updatedFields);

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

      {/* Profile */}

      <ProfileMainCard data={profileData} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ContactInfoCard
          title="Contact Information"
          items={profileData.contactInfo}
        />

        <ContactInfoCard
          title="Emergency Contact"
          items={profileData.emergencyContact}
        />

        <InfoCard
          title="Academic Information"
          items={profileData.academicInfo}
        />
      </div>

      <ProfileNotice />

      <EditProfileModal
        type="student"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={student}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}

export default Profile;
