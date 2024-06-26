import api from "./_api";

export const getEventsLatestService = async () => {
  const response = await api.get("/events/latest/3");
  return response;
};

