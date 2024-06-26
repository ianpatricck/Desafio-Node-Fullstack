import placeValidation from "@/validation/placeValidation";
import api from "./_api";

export const placeValidate = async (payload) => {
  const validation = await placeValidation(payload);

  if (validation.errors) {
    const { errors } = validation;
    return { errors };
  } else if (validation.success) {
    const { success } = validation;
    return { success };
  }
}

export const updatePlaceService = async (id, payload) => {

const { typeId: type_id, ...rest } = payload;

  const payloadBody = {
    ...rest, 
    type_id, 
    inputs: payload.inputs.join(", "),
    turnstiles: payload.turnstiles.join(", "),
  };

  const response = await api.put(`/places/update/${id}`, payloadBody);
  return response;

};

