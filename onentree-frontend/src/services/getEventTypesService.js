import api from "./_api";

export const getEventTypesService = async () => {
  const response = await api.get("/event-types");
  return response;
};

