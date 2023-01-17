export const newArrayStars = (arg) => {
  let arreglo = [];
  for (let index = 0; index < arg; index++) {
    arreglo[index] = index;
  }
  return arreglo;
};
