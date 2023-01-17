// Acepta letras en mayúsculas y minúsculas con tilde, espacios y apostrofes:
export const regExpName = new RegExp("^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$");

// Acepta mail:
export const regExpEmail = new RegExp(
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
);

// Acepta palabras, numeros enteros y espacios:
export const regExpAddress = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);

// Acepta 8 numeros enteros entre 0 y 9:
export const regExpPhone = new RegExp(/^\d{8}$/);

// Valida que un campo no este vacio. Quita espacios al principio y final:
export const isEmpty = (value) => {
  return value.trim().match(/^$/) !== null;
};

// Valida que un objeto no tenga un valor vacio:
export const hasEmptyProp = (arg) => {
  return Object.values(arg).some((val) => val === "");
};
