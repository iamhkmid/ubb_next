export const formatToCurrency = (amount: number, frac = 2) => {
  const options = {
    minimumFractionDigits: frac,
    maximumFractionDigits: frac
  };
  const formatted = Number(amount).toLocaleString('id-ID', options);
  return formatted;
};