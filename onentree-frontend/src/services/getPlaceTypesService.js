import api from "./_api";

export const getPlaceTypesService = async () => {
  const response = await api.get("/place-types");
  return response;
};

