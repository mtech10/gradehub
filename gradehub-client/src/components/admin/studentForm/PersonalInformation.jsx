import Input from "../../ui/Input";
import Select from "../../ui/Select";

function PersonalInformation({ formData, handleChange, genders, states }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Personal Information
        </h2>

        <div className="mt-2 h-px bg-slate-200" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Input
          label="Matric Number"
          required
          value={formData.matricNumber}
          onChange={(e) => handleChange("matricNumber", e.target.value)}
          placeholder="e.g. 23/ENG/0123"
        />
        <Input
          label="First Name"
          required
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Enter first name"
        />

        <Input
          label="Last Name"
          required
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Enter last name"
        />
        <Input
          type="email"
          label="Email Address"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="student@gradehub.edu.ng"
        />

        <Input
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="08012345678"
        />
        <Input
          type="date"
          label="Date of Birth"
          required
          value={formData.dateOfBirth}
          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
        />
        <Select
          label="Gender"
          required
          value={formData.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          options={genders}
        />
        <Select
          label="State of Origin"
          required
          value={formData.state}
          onChange={(e) => handleChange("state", e.target.value)}
          options={states}
        />
        <Input
          label="Local Government"
          required
          value={formData.lga}
          onChange={(e) => handleChange("lga", e.target.value)}
          placeholder="Enter Local Government"
        />
      </div>
    </section>
  );
}

export default PersonalInformation;
