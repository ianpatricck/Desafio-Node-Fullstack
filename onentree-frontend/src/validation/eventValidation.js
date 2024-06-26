import { 
  existsEmptyFields, 
  existsDefaultFields, 
  isEmail, 
  isValidDate, 
  isValidTime, 
  isPhoneNumber 
} from "@/utils/validators";

export default async function eventValidation(payload) {
  var errors = [];

  const emptyFields = await existsEmptyFields(payload);

  if (emptyFields.length) {
    errors.push({ message: "Campo vázio", fields: emptyFields });
  }

  const { typeId, placeId } = payload;

  const defaultFields = await existsDefaultFields({ typeId, placeId });

  if (defaultFields.length) {
    errors.push({ message: "Campo vázio", fields: defaultFields });
  }

  if (payload.date && !isValidDate(payload.date)) {
    errors.push({ message: "Data inválida", fields: ["date"] });
  }

  if (payload.time && !isValidTime(payload.time)) {
    errors.push({ message: "Horário inválido", fields: ["time"] });
  }

  if (payload.email && !isEmail(payload.email)) {
    errors.push({ message: "E-mail inválido", fields: ["email"] });
  }

  if (payload.phone && !isPhoneNumber(payload.phone)) {
    errors.push({ message: "Número inválido", fields: ["phone"] });
  }

  if (errors.length) {
    return { errors: errors };
  }

  return { success: true };
}

