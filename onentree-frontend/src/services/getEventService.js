import api from "./_api";

export const getEventService = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response;
};

