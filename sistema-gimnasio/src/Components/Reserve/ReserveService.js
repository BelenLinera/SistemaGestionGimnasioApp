import api from "../../api";

const getAllReserves = () => {
  return api.get("/api/Reserve");
};

const getMyReserves = () => {
  return api.get("/api/Reserve/my-reserves",
  );
}

const makeReserve = async (data) => {
  return await api.post(
    "/api/Reserve",
    {
      idGymClass: data.IdGymClass,
      dateClass: data.dateClass,
    },
  );
};
const confirmAssistance = async (id) => {
  return await api.patch(`api/Reserve/${id}`, null);
};
const cancelReserve = async (id) => {
  return await api.delete(`/api/Reserve/${id}`);
};

export { getAllReserves,getMyReserves, makeReserve, confirmAssistance, cancelReserve };
