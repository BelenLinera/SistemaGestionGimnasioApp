import api from "../../api";

const getAllGymClasses = () => {
    return api.get('/api/GymClass');
  };
  
  const deleteGymClass = (idGymClass) => {
    return api.delete(`/api/GymClass/${idGymClass}`);
  };
  
  const createGymClass = (idTrainerActivity, timeClass, days, capacity) => {
    return api.post('/api/GymClass', {
      IdTrainerActivity: idTrainerActivity,
      TimeClass: timeClass,
      Days: days,
      Capacity: capacity,
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
