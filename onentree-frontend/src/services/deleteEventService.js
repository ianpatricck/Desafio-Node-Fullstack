import api from "./_api";

export const deleteEventService = async (id) => {
  const response = await api.delete(`/events/delete/${id}`);
  return response;
};

