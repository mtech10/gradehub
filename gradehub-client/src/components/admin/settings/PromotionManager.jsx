// import { useState, useEffect } from "react";
// import { Trash2 } from "lucide-react";
// import Button from "../../ui/Button";
// import api from "../../../services/api";

// function PromotionManager() {
//   const [departments, setDepartments] = useState([]);
//   const [levels, setLevels] = useState([]);
//   const [rules, setRules] = useState([]);
//   const [rule, setRule] = useState({
//     departmentid: "",
//     current_levelid: "",
//     next_levelid: "",
//     min_cgpa: 1.5,
//     min_earned_units: 24,
//   });

//   const fetchData = async () => {
//     try {
//       const [deptRes, levelRes, ruleRes] = await Promise.all([
//         api.get("/departments"),
//         api.get("/levels"),
//         api.get("/promotion-rules").catch(() => ({ data: [] })),
//       ]);

//       setDepartments(deptRes.data?.data || deptRes.data || []);
//       setLevels(levelRes.data?.data || levelRes.data || []);
//       setRules(ruleRes.data?.data || ruleRes.data || []);
//     } catch (e) {
//       console.error("Failed to fetch meta data:", e);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSaveRule = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/promotion-rules", rule);
//       alert("Promotion rule saved successfully!");
//       fetchData(); // Instantly refresh the table
//     } catch (e) {
//       alert("Failed to save rule.");
//     }
//   };

//   const handleDeleteRule = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this promotion rule?"))
//       return;

//     try {
//       await api.delete(`/promotion-rules/${id}`);
//       alert("Promotion rule deleted successfully!");
//       fetchData(); // Instantly refresh the table to remove the deleted row
//     } catch (e) {
//       console.error(e);
//       alert("Failed to delete rule.");
//     }
//   };

//   return (
//     <div className="space-y-8 p-6">
//       {/* Rule Configuration Form */}
//       <form
//         onSubmit={handleSaveRule}
//         className="space-y-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
//       >
//         <h3 className="font-semibold text-lg text-slate-800">
//           Define Department Promotion Rules
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <select
//             className="p-2 border rounded-lg bg-white"
//             value={rule.departmentid}
//             onChange={(e) => setRule({ ...rule, departmentid: e.target.value })}
//             required
//           >
//             <option value="">Select Department</option>
//             {departments.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>
//           <select
//             className="p-2 border rounded-lg bg-white"
//             value={rule.current_levelid}
//             onChange={(e) =>
//               setRule({ ...rule, current_levelid: e.target.value })
//             }
//             required
//           >
//             <option value="">From Level</option>
//             {levels.map((l) => (
//               <option key={l.id} value={l.id}>
//                 {l.name}
//               </option>
//             ))}
//           </select>
//           <select
//             className="p-2 border rounded-lg bg-white"
//             value={rule.next_levelid}
//             onChange={(e) => setRule({ ...rule, next_levelid: e.target.value })}
//             required
//           >
//             <option value="">To Level</option>
//             {levels.map((l) => (
//               <option key={l.id} value={l.id}>
//                 {l.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             step="0.01"
//             placeholder="Min CGPA"
//             className="p-2 border rounded-lg"
//             value={rule.min_cgpa}
//             onChange={(e) => setRule({ ...rule, min_cgpa: e.target.value })}
//             required
//           />
//           <input
//             type="number"
//             placeholder="Min Units"
//             className="p-2 border rounded-lg"
//             value={rule.min_earned_units}
//             onChange={(e) =>
//               setRule({ ...rule, min_earned_units: e.target.value })
//             }
//             required
//           />
//         </div>
//         <Button type="submit">Save Rule</Button>
//       </form>

//       {/* Existing Rules Table */}
//       <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
//         <h3 className="font-semibold text-lg text-slate-800">
//           Existing Promotion Rules
//         </h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse text-sm">
//             <thead>
//               <tr className="border-b bg-slate-50 text-slate-600">
//                 <th className="p-3">Department</th>
//                 <th className="p-3">From Level</th>
//                 <th className="p-3">To Level</th>
//                 <th className="p-3">Min CGPA</th>
//                 <th className="p-3">Min Earned Units</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rules.map((r) => (
//                 <tr key={r.id} className="border-b hover:bg-slate-50">
//                   <td className="p-3 font-medium text-slate-900">
//                     {r.department_name}
//                   </td>
//                   <td className="p-3 text-slate-600">{r.current_level_name}</td>
//                   <td className="p-3 text-slate-600">{r.next_level_name}</td>
//                   <td className="p-3 text-slate-600">{r.min_cgpa}</td>
//                   <td className="p-3 text-slate-600">{r.min_earned_units}</td>
//                   <td className="p-3 text-center">
//                     <button
//                       onClick={() => handleDeleteRule(r.id)}
//                       className="p-1 text-slate-400 hover:text-red-600 transition-colors"
//                       title="Delete Rule"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {rules.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="p-4 text-center text-slate-500">
//                     No promotion rules configured yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PromotionManager;

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Button from "../../ui/Button";
import api from "../../../services/api";

function PromotionManager() {
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // NEW: Tracks selected rows
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
      setSelectedIds([]); // Clear selection when data refreshes
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

  // --- NEW BATCH DELETE LOGIC ---
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
      setSelectedIds([]); // Deselect all
    } else {
      setSelectedIds(rules.map((r) => r.id)); // Select all
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id)); // Remove
    } else {
      setSelectedIds([...selectedIds, id]); // Add
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Rule Configuration Form */}
      <form
        onSubmit={handleSaveRule}
        className="space-y-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <h3 className="font-semibold text-lg text-slate-800">
          Define Department Promotion Rules
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
        <Button type="submit">Save Rule</Button>
      </form>

      {/* Existing Rules Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-slate-800">
            Existing Promotion Rules
          </h3>

          {/* Show Batch Delete button only if items are selected */}
          {selectedIds.length > 0 && (
            <button
              onClick={handleBatchDelete}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600">
                {/* Select All Checkbox */}
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
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
                <tr key={r.id} className="border-b hover:bg-slate-50">
                  {/* Single Item Checkbox */}
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
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
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete Rule"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-slate-500">
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
