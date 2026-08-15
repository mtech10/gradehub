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
import ProfileSkeleton from "../../components/ui/skeletons/ProfileSkeleton";
import { generateProfileUI } from "../../constants/profile/profileData";

import { useEffect, useState } from "react";
import profileService from "../../services/profileService";

function Profile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getStudentProfile();
        setStudent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const profileData = student ? generateProfileUI(student) : null;

  const handleProfileUpdate = async (updatedFields) => {
    try {
      // 1. Optimistic Update: Instantly update the UI and deeply merge the nested emergency object
      setStudent((prev) => ({
        ...prev,
        ...updatedFields,
        emergency: {
          ...(prev?.emergency || {}),
          ...(updatedFields.emergency || {}),
        },
      }));

      setIsModalOpen(false);

      // 2. Background API Update
      const updatedProfile =
        await profileService.updateStudentProfile(updatedFields);

      // 3. Sync with backend response, but protect the emergency object if the backend drops it
      setStudent((prev) => ({
        ...updatedProfile,
        emergency: updatedProfile.emergency || prev.emergency,
      }));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profileData) {
    return (
      <div className="p-10 text-center text-red-500">
        Unable to load profile.
      </div>
    );
  }

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
