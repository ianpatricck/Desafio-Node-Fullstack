import api from "./_api";

export const getPlacesLatestService = async () => {
  const response = await api.get("/places/latest/3");
  return response;
};

