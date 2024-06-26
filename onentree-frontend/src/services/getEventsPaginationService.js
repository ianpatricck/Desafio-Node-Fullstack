import api from "./_api";

export const getEventsPaginationService = async ({ queryKey }) => {
  const [offset, take] = queryKey;
  const response = await api.get(`/events/pagination/${offset}/${take}`);
  return response;
};

