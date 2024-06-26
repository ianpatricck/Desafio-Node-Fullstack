import api from "./_api";

export const getEventsSelectService = async (params) => {
  const response = await api.get("/events/select/all", { params });
  return response;
};

