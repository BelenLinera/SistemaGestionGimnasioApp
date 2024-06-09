import api from "../../api";

const getAllGymClasses = () => {
  return api.get("/api/GymClass");
};

const getGymClassById = (idGymClass) => {
  return api.get(`/api/GymClass/${idGymClass}`);
};
const deleteGymClass = (idGymClass) => {
  return api.delete(`/api/GymClass/${idGymClass}`);
};

const createGymClass = (data) => {
  return api.post("/api/GymClass", {
    idTrainerActivity: data.IdTrainerActivity,
    timeClass: data.TimeClass,
    days: data.Days,
    capacity: data.Capacity,
  });
};

const updateGymClass = (
  idGymClass,
  data
) => {
  return api.put(`/api/GymClass?idGymClass=${idGymClass}`, {
    idTrainerActivity: data.IdTrainerActivity,
    timeClass: data.TimeClass,
    days: data.Days,
    capacity: data.Capacity,
  });
};

export {
  getAllGymClasses,
  getGymClassById,
  deleteGymClass,
  createGymClass,
  updateGymClass,
};
