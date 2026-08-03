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
  initialAdminData,
  generateAdminProfile,
} from "../../constants/profile/profileData";

function Profile() {
  // Store the raw, API-ready data in state
  const [admin, setAdmin] = useState(initialAdminData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate the formatted UI data on the fly
  const Data = generateAdminProfile(admin);

  const handleSaveProfile = (updatedFields) => {
    setAdmin((prev) => ({
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

      {/* Pass the dynamically generated  Data to the components */}
      <ProfileMainCard data={Data} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ContactInfoCard
          title="Personal Information"
          items={Data.personalInfo}
        />

        <InfoCard title="Employment Information" items={Data.employmentInfo} />

        <InfoCard title="Account Information" items={Data.accountInfo} />
      </div>

      <ProfileNotice />

      {/* The Edit Modal */}
      <EditProfileModal
        type="admin"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentData={admin}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default Profile;
