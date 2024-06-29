import api from "../../api";

const getAllClients = (sendRequest) => {
  return sendRequest({ method: "get", url: "/api/Client" });
  // api.get("/api/Client")
};
const getClientByEmail = (email) => {
  return api.get(`/api/Client/${email}`);
};

const deleteClient = (email) => {
  return api.delete(`/api/Client/${email}`);
};
const createClient = (email, nameClient, lastName, password) => {
  return api.post("/api/Client", {
    Email: email,
    Name: nameClient,
    Lastname: lastName,
    Password: password,
  });
};

const updateClient = (email, nameClient, lastName) => {
  // eslint-disable-next-line no-sequences
  return api.put(`/api/Client?emailClient=${email}`, {
    Name: nameClient,
    Lastname: lastName,
  });
};

const updateClientActiveState = (email, autorizationToReserve) => {
  // eslint-disable-next-line no-sequences
  return api.patch(
    `/api/Client/${email}/state?autorizationToReserve=${autorizationToReserve}`
  );
};

export {
  getAllClients,
  getClientByEmail,
  deleteClient,
  createClient,
  updateClient,
  updateClientActiveState,
};
