import api from "./_api";

export const getPlacesSelectService = async (params) => {
  const response = await api.get("/places/select/all", { params });
  return response;
};

