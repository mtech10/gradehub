import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import api from "../../../services/api";

function PromotionSettings() {
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [rules, setRules] = useState([]);
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
        api.get("/promotion-rules").catch(() => ({ data: [] })), // safe fallback if endpoint fails
      ]);

      console.log("Departments Response:", deptRes.data);
      console.log("Levels Response:", levelRes.data);

      // Handles both array responses and nested object responses (e.g. res.data.data)
      setDepartments(deptRes.data.data || deptRes.data || []);
      setLevels(levelRes.data.data || levelRes.data || []);
      setRules(ruleRes.data.data || ruleRes.data || []);
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
      fetchData(); // Refresh list
    } catch (e) {
      alert("Failed to save rule.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Rule Configuration Form */}
      <form
        onSubmit={handleSaveRule}
        className="space-y-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <h3 className="font-semibold text-lg text-slate-800">
          Set Department Promotion Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="p-2 border rounded-lg bg-white"
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
            className="p-2 border rounded-lg bg-white"
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
            className="p-2 border rounded-lg bg-white"
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
            className="p-2 border rounded-lg"
            value={rule.min_cgpa}
            onChange={(e) => setRule({ ...rule, min_cgpa: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Min Units"
            className="p-2 border rounded-lg"
            value={rule.min_earned_units}
            onChange={(e) =>
              setRule({ ...rule, min_earned_units: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit">Save Promotion Rule</Button>
      </form>

      {/* Existing Rules Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-semibold text-lg text-slate-800">
          Existing Promotion Rules
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600">
                <th className="p-3">Department</th>
                <th className="p-3">From Level</th>
                <th className="p-3">To Level</th>
                <th className="p-3">Min CGPA</th>
                <th className="p-3">Min Earned Units</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r.id} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">
                    {r.department_name}
                  </td>
                  <td className="p-3 text-slate-600">{r.current_level_name}</td>
                  <td className="p-3 text-slate-600">{r.next_level_name}</td>
                  <td className="p-3 text-slate-600">{r.min_cgpa}</td>
                  <td className="p-3 text-slate-600">{r.min_earned_units}</td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-slate-500">
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

export default PromotionSettings;
