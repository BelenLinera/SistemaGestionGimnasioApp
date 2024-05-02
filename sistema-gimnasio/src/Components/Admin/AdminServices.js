import api from "../../api";

const getAllAdmins = () => {
  return api.get("/api/Admin");
};

const deleteAdmin = (email) => {
  return api.delete(`/api/Admin/${email}`);
};
const createAdmin = (email, nameAdmin, lastName, password) => {
  return api.post("/api/Admin"), { email, nameAdmin, lastName, password };
};
const updateAdmin = (email, nameAdmin, lastName) => {
  return api.put(`/Admin/${email}`), {nameAdmin, lastName };
};

export { getAllAdmins, deleteAdmin, createAdmin, updateAdmin };
