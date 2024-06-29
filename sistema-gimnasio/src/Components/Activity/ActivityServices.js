import api from "../../api";

const getAllActivities = (sendRequest) => {
  return sendRequest({ method: "get", url: "/api/Activity" });
  // return api.get("/api/Activity");
};

const getActivityByName = (activityName) => {
  return api.get(`/api/Activity/${activityName}`)
}

const deleteActivity = (activityName) => {
  return api.delete(`/api/Activity/${activityName}`);
};
const createActivity = (activityName, activityDescription) => {
  return api.post("/api/Activity", {
    ActivityName: activityName,
    ActivityDescription: activityDescription,
  });
};

const updateActivity = (
  activityName,
  activityNameUpdate,
  activityDescription
) => {
  // eslint-disable-next-line no-sequences
  return api.put(`/api/Activity?activityName=${activityName}`, {
    ActivityName: activityNameUpdate,
    ActivityDescription: activityDescription,
  });
};
export { getAllActivities, getActivityByName, deleteActivity, createActivity, updateActivity };
