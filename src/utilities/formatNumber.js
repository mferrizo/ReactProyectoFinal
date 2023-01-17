export const formatNumber = (number) => {
  return new Intl.NumberFormat("es-ar").format(number);
};
