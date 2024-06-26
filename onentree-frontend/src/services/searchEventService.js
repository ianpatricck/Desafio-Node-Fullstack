import api from "./_api";

export const searchEventService = async (name, offset, take) => {
  const response = await api.get(`/events/search/${name}/${offset}/${take}`);
  return response;
};

