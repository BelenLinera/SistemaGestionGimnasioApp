import api from "../../api";

const getAllTrainers = () => {
  return api.get("/api/Trainer");
};

const getTrainerByEmail=(email) =>{
  return api.get(`/api/Trainer/${email}`)
}

const deleteByEmail = (email) => {
  return api.delete(`/api/Trainer/${email}`);
};
const createTrainer = (email, nameTrainer, lastName, password, activities) => {
  return api.post("/api/Trainer", {
    Email: email,
    Name: nameTrainer,
    Lastname: lastName,
    Password: password,
    Activities: activities?activities:[],
  });
};

const updateByEmail = (email, nameTrainer, lastName,activities) => {
  // eslint-disable-next-line no-sequences
  return api.put(`/api/Trainer/${email}`, {
    Name: nameTrainer,
    Lastname: lastName,
    Activities: activities?activities:[],
    
  });
};
export { getAllTrainers,getTrainerByEmail, deleteByEmail, createTrainer, updateByEmail };
