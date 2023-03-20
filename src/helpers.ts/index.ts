export const getActualPrice = (price: number, discount: number) => {
  return formatCurrency((price / (1 - discount/100)));
};

export const formatCurrency = (price: number, currency?: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(Number(price?.toFixed(2)));
};