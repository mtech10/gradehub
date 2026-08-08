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

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch real admin data on mount
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await profileService.getProfile();
        // Normalize DB columns to match what your generateAdminProfile function expects
        const rawData = response.data || response;

        setAdmin({
          ...rawData,
          firstName: rawData.firstName || rawData.firstname || "",
          lastName: rawData.lastName || rawData.lastname || "",
          phone: rawData.phone || "",
          email: rawData.email || "",
          // Add any other mappings your generateAdminProfile requires here
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
      // Fire the update to the backend
      const response = await profileService.updateProfile(updatedFields);
      const rawData = response.data || response;

      // Update the local state so the UI reflects the changes instantly
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

  if (loading || !admin) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading profile data...
      </div>
    );
  }

  // Generate the formatted UI data on the fly using the real DB data
  const Data = generateAdminProfile(admin);

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

      {/* Pass the dynamically generated Data to the components */}
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

export default AdminProfile;
