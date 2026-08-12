import { useState, useEffect } from "react";
import Button from "../../ui/Button";

function PromotionRulesForm({ onSubmit }) {
  const [rule, setRule] = useState({
    departmentid: "",
    current_levelid: "",
    next_levelid: "",
    min_cgpa: 1.5,
    min_earned_units: 24,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(rule);
      }}
      className="space-y-4 p-6 bg-white rounded-xl border"
    >
      <h3 className="font-semibold text-lg">Define Promotion Rule</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* You should fetch your departments/levels list to populate these selects */}
        <select
          className="p-2 border rounded"
          onChange={(e) => setRule({ ...rule, departmentid: e.target.value })}
        >
          <option>Select Department</option>
          {/* Map your departments here */}
        </select>

        <input
          type="number"
          step="0.01"
          placeholder="Min CGPA"
          className="p-2 border rounded"
          onChange={(e) => setRule({ ...rule, min_cgpa: e.target.value })}
        />

        <input
          type="number"
          placeholder="Min Units"
          className="p-2 border rounded"
          onChange={(e) =>
            setRule({ ...rule, min_earned_units: e.target.value })
          }
        />
      </div>

      <Button type="submit">Save Promotion Rule</Button>
    </form>
  );
}
export default PromotionRulesForm;
