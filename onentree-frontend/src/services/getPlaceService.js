import api from "./_api";

export const getPlaceService = async (id) => {
  const response = await api.get(`/places/${id}`);
  return response;
};

