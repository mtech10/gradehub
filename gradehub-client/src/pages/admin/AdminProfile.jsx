import { useState, useEffect } from "react";
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
import { generateAdminProfile } from "../../constants/profile/profileData";
import { profileService } from "../../services/admin/profileService";
import ProfileSkeleton from "../../components/ui/skeletons/ProfileSkeleton";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await profileService.getProfile();
        const rawData = response.data || response;

        setAdmin({
          ...rawData,
          firstName: rawData.firstName || rawData.firstname || "",
          lastName: rawData.lastName || rawData.lastname || "",
          phone: rawData.phone || "",
          email: rawData.email || "",
        });
      } catch (error) {
        console.error("Failed to fetch admin profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleSaveProfile = async (updatedFields) => {
    try {
      const response = await profileService.updateProfile(updatedFields);
      const rawData = response.data || response;

      setAdmin((prev) => ({
        ...prev,
        ...rawData,
        firstName: rawData.firstName || rawData.firstname || prev.firstName,
        lastName: rawData.lastName || rawData.lastname || prev.lastName,
      }));

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Check console for details.");
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!admin && !loading) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load profile data.
      </div>
    );
  }

  const Data = generateAdminProfile(admin);

  return (
    <div className="space-y-8">
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

export default AdminProfile;
