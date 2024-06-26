import { 
  existsEmptyFields, 
  existsDefaultFields,
  isCNPJ,
  isCEP,
  isEmail,
  isPhoneNumber
} from "@/utils/validators";


export default async function placeValidation(payload) {
  var errors = [];

  const emptyFields = await existsEmptyFields({
    address: payload.address,
    cep: payload.cep,
    city: payload.city,
    cnpj: payload.cnpj,
    email: payload.email,
    inputs: payload.inputs,
    phone: payload.phone,
    name: payload.name,
    state: payload.state,
    turnstiles: payload.turnstiles,
    typeId: payload.typeId
  });

  if (emptyFields.length) {
    errors.push({ message: "Campo vázio", fields: emptyFields });
  }

  const { typeId, state } = payload;
  const defaultFields = await existsDefaultFields({ typeId, state });

  if (defaultFields.length) {
    errors.push({ message: "Campo vázio", fields: defaultFields });
  }

  if (payload.cnpj && !isCNPJ(payload.cnpj)) {
    errors.push({ message: "CNPJ inválido", fields: ["cnpj"] });
  }

  if (payload.cep && !isCEP(payload.cep)) {
    errors.push({ message: "CEP inválido", fields: ["cep"] });
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

