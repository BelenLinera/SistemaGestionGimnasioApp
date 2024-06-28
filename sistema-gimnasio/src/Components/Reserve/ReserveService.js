import api from "../../api";

const getAllReserves = () => {
  // return sendRequest({ method: "get", url: "/api/Reserve" });
  return api.get("/api/Reserve");
};

const getMyReserves = (sendRequest) => {
  return sendRequest({ method: "get", url: "/api/Reserve/my-reserves" });
  // return api.get("/api/Reserve/my-reserves");
};

const makeReserve = async (token, data) => {
  return await api.post(
    "/api/Reserve",
    {
      idGymClass: data.IdGymClass,
      dateClass: data.dateClass,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const confirmAssistance = async (token, id) => {
  return await api.patch(`api/Reserve/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const cancelReserve = async (token, id) => {
  return await api.delete(`/api/Reserve/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getAllReserves,
  getMyReserves,
  makeReserve,
  confirmAssistance,
  cancelReserve,
};
