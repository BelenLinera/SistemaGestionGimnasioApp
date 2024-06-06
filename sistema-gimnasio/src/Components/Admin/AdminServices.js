import api from "../../api";

const getAllAdmins = () => {
  return api.get("/api/Admin");
};
const getAdminByEmail=(email) =>{
  return api.get(`/api/Admin/${email}`)
}

const deleteAdmin = (email) => {
  return api.delete(`/api/Admin/${email}`);
};
const createAdmin = (email, nameAdmin, lastName, password) => {
  return api.post("/api/Admin", {
    Email: email,
    Name: nameAdmin,
    Lastname: lastName,
    Password: password,
  });
};

const updateAdmin = (email, nameAdmin, lastName) => {
  // eslint-disable-next-line no-sequences
  return api.put(`/api/Admin?emailAdmin=${email}`, {
    Name: nameAdmin,
    Lastname: lastName,
  });
};
export { getAllAdmins, getAdminByEmail,deleteAdmin, createAdmin, updateAdmin };
