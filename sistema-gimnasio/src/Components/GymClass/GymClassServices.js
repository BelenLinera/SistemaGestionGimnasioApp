import api from "../../api";

const getAllGymClasses = (sendRequest) => {
  return sendRequest({ method: "get", url: "/api/GymClass" });
  
};

const getGymClassById = (idGymClass) => {
  return api.get(`/api/GymClass/${idGymClass}`);
};

const createGymClass = (data) => {
  return api.post("/api/GymClass", {
    idTrainerActivity: data.IdTrainerActivity,
    timeClass: data.TimeClass,
    days: data.Days,
    capacity: data.Capacity,
  });
};

const updateGymClass = (idGymClass, data) => {
  return api.put(`/api/GymClass?idGymClass=${idGymClass}`, {
    idTrainerActivity: data.IdTrainerActivity,
    timeClass: data.TimeClass,
    days: data.Days,
    capacity: data.Capacity,
  });
};
const deleteGymClass = (idGymClass) => {
  return api.delete(`/api/GymClass/${idGymClass}`);
};
const cancelGymClassOnDate = async (idGymClass, dateToCancel) => {
  return await api.post(
    `/api/GymClass/cancel?idGymClass=${idGymClass}&dateToCancel=${dateToCancel}`
  );
};

export {
  getAllGymClasses,
  getGymClassById,
  createGymClass,
  updateGymClass,
  deleteGymClass,
  cancelGymClassOnDate,
};
