import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import api from "../../../services/api";

function PromotionManager() {
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rule, setRule] = useState({
    departmentid: "",
    current_levelid: "",
    next_levelid: "",
    min_cgpa: 1.5,
    min_earned_units: 24,
  });

  const fetchData = async () => {
    try {
      const [deptRes, levelRes, ruleRes] = await Promise.all([
        api.get("/departments"),
        api.get("/levels"),
        api.get("/promotion-rules").catch(() => ({ data: [] })),
      ]);

      setDepartments(deptRes.data?.data || deptRes.data || []);
      setLevels(levelRes.data?.data || levelRes.data || []);
      setRules(ruleRes.data?.data || ruleRes.data || []);
      setSelectedIds([]);
    } catch (e) {
      console.error("Failed to fetch meta data:", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveRule = async (e) => {
    e.preventDefault();
    try {
      await api.post("/promotion-rules", rule);
      alert("Promotion rule saved successfully!");
      fetchData();
    } catch (e) {
      alert("Failed to save rule.");
    }
  };

  const handleDeleteRule = async (id) => {
    if (!window.confirm("Are you sure you want to delete this promotion rule?"))
      return;
    try {
      await api.delete(`/promotion-rules/${id}`);
      alert("Promotion rule deleted successfully!");
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Failed to delete rule.");
    }
  };

  const handleBatchDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} rule(s)?`,
      )
    )
      return;

    try {
      await api.post("/promotion-rules/batch-delete", { ids: selectedIds });
      alert("Rules deleted successfully!");
      fetchData();
    } catch (e) {
      console.error(e);
      alert("Failed to delete selected rules.");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === rules.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(rules.map((r) => r.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Rule Configuration Form */}
      <form
        onSubmit={handleSaveRule}
        className="space-y-4 p-4 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
      >
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-slate-800">
            Define Department Promotion Rules
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure academic progression criteria between levels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          <select
            className="p-2.5 text-sm border rounded-lg bg-white w-full border-slate-200"
            value={rule.departmentid}
            onChange={(e) => setRule({ ...rule, departmentid: e.target.value })}
            required
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            className="p-2.5 text-sm border rounded-lg bg-white w-full border-slate-200"
            value={rule.current_levelid}
            onChange={(e) =>
              setRule({ ...rule, current_levelid: e.target.value })
            }
            required
          >
            <option value="">From Level</option>
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>

          <select
            className="p-2.5 text-sm border rounded-lg bg-white w-full border-slate-200"
            value={rule.next_levelid}
            onChange={(e) => setRule({ ...rule, next_levelid: e.target.value })}
            required
          >
            <option value="">To Level</option>
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Min CGPA"
            className="p-2.5 text-sm border rounded-lg w-full border-slate-200"
            value={rule.min_cgpa}
            onChange={(e) => setRule({ ...rule, min_cgpa: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Min Units"
            className="p-2.5 text-sm border rounded-lg w-full border-slate-200"
            value={rule.min_earned_units}
            onChange={(e) =>
              setRule({ ...rule, min_earned_units: e.target.value })
            }
            required
          />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full sm:w-auto justify-center">
            Save Rule
          </Button>
        </div>
      </form>

      {/* Existing Rules Table */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-semibold text-base sm:text-lg text-slate-800">
            Existing Promotion Rules
          </h3>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBatchDelete}
              className="flex items-center justify-center gap-2 px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors w-full sm:w-auto"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600 whitespace-nowrap">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer rounded"
                    checked={
                      rules.length > 0 && selectedIds.length === rules.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-3">Department</th>
                <th className="p-3">From Level</th>
                <th className="p-3">To Level</th>
                <th className="p-3">Min CGPA</th>
                <th className="p-3">Min Earned Units</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r) => (
                <tr
                  key={r.id}
                  className="border-b hover:bg-slate-50 whitespace-nowrap"
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer rounded"
                      checked={selectedIds.includes(r.id)}
                      onChange={() => toggleSelect(r.id)}
                    />
                  </td>
                  <td className="p-3 font-medium text-slate-900">
                    {r.department_name}
                  </td>
                  <td className="p-3 text-slate-600">{r.current_level_name}</td>
                  <td className="p-3 text-slate-600">{r.next_level_name}</td>
                  <td className="p-3 text-slate-600">{r.min_cgpa}</td>
                  <td className="p-3 text-slate-600">{r.min_earned_units}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteRule(r.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-slate-100"
                      title="Delete Rule"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-500">
                    No promotion rules configured yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PromotionManager;
