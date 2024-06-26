import moment from "moment";

export function existsDefaultFields(payload) {
  let defaultValues = [];

  Object.keys(payload).forEach((key) => {
    if (payload[key] == "default") {
      defaultValues.push(key);
    }
  });

  return defaultValues;
}

export function existsEmptyFields(payload) {
  let emptyFields = [];

  Object.keys(payload).forEach((key) => {
    if (payload[key].length == 0) {
      emptyFields.push(key);
    }
  });

  return emptyFields;
}

export function isEmail(email) {
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return emailRegex.test(email); 
}

export function isValidDate(date) {
  const dateArray = date.split("/");
  const isDateNumeric = dateArray.map(item => !Number(item) ? false : true);

  if (isDateNumeric.includes(false)) {
    return false;
  }

  if (moment(date, "DD/MM/YYYY").toString() == "Invalid date") {
    return false;
  }

  const [day, month, year] = dateArray;
  const today = new Date();
  const newDate = moment(`${year}-${month}-${day}`); 

  if(newDate.isBefore(today)) {
    return false;
  }

  return true;
}

export function isValidTime(time) {
  let numericTime = time.replace("h", "");
  let timeSplit = numericTime.split(":");
  let isTimeNumeric = timeSplit.map(item => Number(item) || Number(item) == 0 ? true : false);

  if (isTimeNumeric.includes(false)) {
    return false;
  }

  const [hours, minutes] = timeSplit;

  if (Number(hours) > 23) {
    return false;
  }

  if (Number(minutes) > 60) {
    return false;
  }

  return true;
}

export function isPhoneNumber(phone) {
  const phoneRegex = /^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/;
  return phoneRegex.test(phone); 
}

export function isCNPJ(cnpj) {
  const cnpjRegex = /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/;
  return cnpjRegex.test(cnpj);
}

export function isCEP(cep) {
  const cepRegex = /[0-9]{5}-[0-9]{3}/;
  return cepRegex.test(cep);
}

