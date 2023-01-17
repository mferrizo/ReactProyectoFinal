let isValid = true;
const getItem = (time, data) => {
  return new Promise((response, reject) => {
    if (isValid) {
      setTimeout(() => {
        response(data);
      }, time);
    } else {
      reject("Error! No se pudo hacer la consulta");
    }
  });
};

export default getItem;
