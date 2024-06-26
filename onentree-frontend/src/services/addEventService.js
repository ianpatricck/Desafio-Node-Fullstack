import eventValidation from "@/validation/eventValidation";
import api from "./_api";

export const eventValidate = async (payload) => {
  const validation = await eventValidation(payload);

  if (validation.errors) {
    const { errors } = validation;
    return { errors };
  } else if (validation.success) {
    const { success } = validation;
    return { success };
  }
}

export const addEventService = async (payload) => {
  const { typeId: type_id, placeId: place_id, ...rest } = payload;
  const payloadBody = { type_id, place_id, ...rest };

  const response = await api.post("/events/create", payloadBody);
  return response;
}

