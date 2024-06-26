import moment from "moment";
import api from "./_api";

export const getPlacesPaginationService = async ({ queryKey }) => {
  const [offset, take] = queryKey;
  const response = await api.get(`/places/pagination/${offset}/${take}`);

  response.data = response.data.map((item) => {
    return {
      ...item,
      updated_at: moment(item.updated_at).format("DD/MM/YYYY")
    };
  });

  return response;
};

