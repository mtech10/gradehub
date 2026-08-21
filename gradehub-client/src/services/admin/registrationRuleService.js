import api from "../api";

export const getRules = async () => {
  
  const response = await api.get("/departments/registration-rules");
  return response.data;
};

export const saveRule = async (data) => {
  const response = await api.post("/departments/registration-rules", data);
  return response.data;
};

export const deleteRule = async (id) => {
  const response = await api.delete(`/departments/registration-rules/${id}`);
  return response.data;
};

const registrationRuleService = {
  getRules,
  saveRule,
  deleteRule,
};

export default registrationRuleService;
