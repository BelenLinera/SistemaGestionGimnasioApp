import api from "../../api";

const getAllClients = () => {
  return api.get("/api/Client");
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
export { getAllClients, deleteClient, createClient, updateClient };
