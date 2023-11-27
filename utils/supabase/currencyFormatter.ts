export const currencyFormatter = (arg: number) => {
  const numberFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  return numberFormatter.format(arg);
};
