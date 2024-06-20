import api from "../../api";

const getAllReserves = () => {
  return api.get("/api/Reserve");
};

const getReservesByUser = async (token) => {
  return await api.get("/api/Reserve/my-reserves", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

const cancelReserve = async (token, id) => {
  return await api.delete(`/api/Reserve/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getAllReserves, getReservesByUser, makeReserve, cancelReserve };
