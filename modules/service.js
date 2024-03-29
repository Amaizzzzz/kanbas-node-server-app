import axios from "axios";
const COURSES_URL = "http://kanbas-node-server-app-gucen.onrender.com/api/courses";
const MODULES_URL = "http://kanbas-node-server-app-gucen.onrender.com/api/modules";
export const deleteModule = async (moduleId) => {
  const response = await axios
    .delete(`${MODULES_URL}/${moduleId}`);
  return response.data;
};
export const updateModule = async (module) => {
    const response = await axios.
      put(`${MODULES_URL}/${module._id}`, module);
    return response.data;
};
  