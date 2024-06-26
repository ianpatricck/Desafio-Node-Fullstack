import api from "./_api";

export const deletePlaceService = async (id) => {
  const response = await api.delete(`/places/delete/${id}`);
  return response;
};

