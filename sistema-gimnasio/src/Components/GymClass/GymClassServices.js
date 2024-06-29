import api from "../../api";

const getAllGymClasses = () => {
  return api.get("/api/GymClass");
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
<<<<<<< HEAD
    `api/GymClass/cancel?idGymClass=${idGymClass}&dateToCancel=${dateToCancel}`,)
}
=======
    `/api/GymClass/cancel?idGymClass=${idGymClass}&dateToCancel=${dateToCancel}`
  );
};
>>>>>>> ac7928a1f7a7b92a4ce8e2e4b58ebb2d8466c979

export {
  getAllGymClasses,
  getGymClassById,
  createGymClass,
  updateGymClass,
  deleteGymClass,
  cancelGymClassOnDate,
};
