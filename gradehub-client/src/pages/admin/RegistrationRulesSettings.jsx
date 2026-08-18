import { useState, useEffect } from "react";
import { Edit2, Trash2, ShieldAlert } from "lucide-react";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useToast } from "../../context/ToastContext";
import registrationRuleService from "../../services/admin/registrationRuleService";
import departmentService from "../../services/admin/departmentService";
import levelService from "../../services/admin/levelService";

function RegistrationRulesSettings() {
  const { addToast } = useToast();

  const [rules, setRules] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  // Modal States
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const [departmentId, setDepartmentId] = useState("");
  const [levelId, setLevelId] = useState("");
  const [minUnits, setMinUnits] = useState(12);
  const [maxUnits, setMaxUnits] = useState(48);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [rulesRes, deptsRes, levelsRes] = await Promise.all([
        registrationRuleService.getRules(),
        departmentService.getDepartments(),
        levelService.getLevels(),
      ]);

      setRules(rulesRes.data || rulesRes || []);
      setDepartments(deptsRes.data || deptsRes.departments || []);
      setLevels(levelsRes.data || levelsRes.levels || []);
    } catch (error) {
      console.error("Failed to load registration rules data:", error);
    }
  };

  // Intercept the form submission to validate and open the modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!departmentId || !levelId) {
      addToast({
        title: "Error",
        message: "Please select both a Department and Level.",
        type: "error",
      });
      return;
    }

    // If valid, open the confirmation modal
    setIsSaveModalOpen(true);
  };

  // Actually save the rule when confirmed
  const executeSaveRule = async () => {
    try {
      await registrationRuleService.saveRule({
        departmentid: departmentId,
        levelid: levelId,
        min_units: Number(minUnits),
        max_units: Number(maxUnits),
      });

      addToast({
        title: "Success",
        message: "Registration rule saved successfully!",
        type: "success",
      });

      // Reset form to defaults
      setDepartmentId("");
      setLevelId("");
      setMinUnits(12);
      setMaxUnits(48);

      fetchInitialData(); // Refresh list
    } catch (error) {
      addToast({
        title: "Error",
        message: error.response?.data?.message || "Failed to save rule.",
        type: "error",
      });
    } finally {
      setIsSaveModalOpen(false); // Close the modal
    }
  };

  const confirmDeleteRule = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const executeDeleteRule = async () => {
    if (!deleteModal.id) return;

    try {
      await registrationRuleService.deleteRule(deleteModal.id);
      addToast({
        title: "Deleted",
        message: "Rule deleted successfully.",
        type: "success",
      });
      fetchInitialData();
    } catch (error) {
      addToast({
        title: "Error",
        message: "Failed to delete rule.",
        type: "error",
      });
    } finally {
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleEditRule = (rule) => {
    setDepartmentId(rule.departmentid);
    setLevelId(rule.levelid);
    setMinUnits(rule.min_units);
    setMaxUnits(rule.max_units);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper to get selected department and level names for the modal message
  const selectedDeptName =
    departments.find((d) => d.id === departmentId)?.name ||
    "the selected department";
  const selectedLevelName =
    levels.find((l) => l.id === levelId)?.name || "the selected level";

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Course Registration Rules
        </h2>
        <p className="text-sm text-slate-500">
          Configure the minimum and maximum allowable credit units per
          department and level.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* FORM SECTION */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 h-fit">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Set Limit
          </h3>
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100"
          >
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Department
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                required
              >
                <option value="">Select Department...</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Level
              </label>
              <select
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                required
              >
                <option value="">Select Level...</option>
                {levels.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Min Units
                </label>
                <input
                  type="number"
                  min="0"
                  value={minUnits}
                  onChange={(e) => setMinUnits(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Max Units
                </label>
                <input
                  type="number"
                  min="1"
                  value={maxUnits}
                  onChange={(e) => setMaxUnits(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-2">
              Save Rule
            </Button>
          </form>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
            <ShieldAlert size={16} className="mt-0.5 shrink-0 text-blue-600" />
            <p>
              If a department and level don't have a specific rule set, the
              system defaults to <strong>12 Min</strong> and{" "}
              <strong>48 Max</strong> units.
            </p>
          </div>
        </div>

        {/* RULES LIST SECTION */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-900 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">Department</th>
                  <th className="px-4 py-3 font-semibold">Level</th>
                  <th className="px-4 py-3 font-semibold text-center">
                    Limits (Min - Max)
                  </th>
                  <th className="px-4 py-3 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No custom rules defined yet.
                    </td>
                  </tr>
                ) : (
                  rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {rule.department_name}
                      </td>
                      <td className="px-4 py-3">{rule.level_name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                          {rule.min_units}
                          <span className="text-slate-400">to</span>
                          {rule.max_units}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditRule(rule)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50"
                            title="Edit Rule"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => confirmDeleteRule(rule.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50"
                            title="Delete Rule"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onConfirm={executeSaveRule}
        title="Confirm Registration Rule"
        message={`Are you sure you want to set the limits to ${minUnits} - ${maxUnits} units for ${selectedDeptName} (${selectedLevelName})?`}
        confirmText="Save Rule"
        cancelText="Cancel"
        isDestructive={false}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={executeDeleteRule}
        title="Delete Registration Rule"
        message="Are you sure you want to delete this rule? This department and level will fallback to the default 12 - 48 unit limits."
        confirmText="Delete Rule"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}

export default RegistrationRulesSettings;
