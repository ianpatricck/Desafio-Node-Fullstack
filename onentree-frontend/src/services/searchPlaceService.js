import moment from "moment";
import api from "./_api";

export const searchPlaceService = async (name, offset, take) => {
  const response = await api.get(`/places/search/${name}/${offset}/${take}`);

  response.data = response.data.map((item) => {
    return {
      ...item,
      updated_at: moment(item.updated_at).format("DD/MM/YYYY")
    };
  });

  return response;
};

