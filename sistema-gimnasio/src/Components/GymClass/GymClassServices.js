import api from "../../api";

const getAllGymClasses = () => {
    return api.get('/api/GymClass');
  };
  
  const deleteGymClass = (idGymClass) => {
    return api.delete(`/api/GymClass/${idGymClass}`);
  };
  
  const createGymClass = (data) => {
    return api.post('/api/GymClass', {
      IdTrainerActivity: data.IdTrainerActivity,
      TimeClass: data.TimeClass,
      Days: data.Days,
      Capacity: data.Capacity,
    });
  };
  
  const updateGymClass = (idGymClass, idTrainerActivity, timeClass, days, capacity) => {
    return api.put(`/api/GymClass/${idGymClass}`, {
      IdTrainerActivity: idTrainerActivity,
      TimeClass: timeClass,
      Days: days,
      Capacity: capacity,
    });
  };
  
  export { getAllGymClasses, deleteGymClass, createGymClass, updateGymClass };
