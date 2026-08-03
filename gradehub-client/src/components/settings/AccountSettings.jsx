import { Camera } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";

function AccountSettings({ data, onChange }) {
  return (
    <Card title="Account Information">
      <div className="mt-2 flex flex-col gap-8 md:flex-row md:items-start">
        {/* Avatar Upload */}
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md">
            <img
              src="https://i.pravatar.cc/150?u=ade"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-slate-50">
            <Camera size={14} />
            Change Photo
          </button>
          <p className="text-center text-[10px] text-slate-500">
            JPG, PNG or GIF.
            <br />
            Max size 2MB.
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-5">
          <Input
            label="Full Name"
            value={data.fullName}
            onChange={(e) => onChange("account", "fullName", e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            defaultValue="adeyelusi20@stu.gradehub.edu.ng"
            disabled
          />
          <Input
            label="Phone Number"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("account", "phone", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Current Level"
              options={[{ value: "400", label: "400 Level" }]}
              value="400"
              disabled
            />
            <Select
              label="Department"
              options={[{ value: "age", label: "Agricultural Engineering" }]}
              value="age"
              disabled
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AccountSettings;
