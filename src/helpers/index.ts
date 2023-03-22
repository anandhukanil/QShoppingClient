export const getActualPrice = (price: number, discount: number) => {
  return formatCurrency((price / (1 - discount/100)));
};

export const formatCurrency = (price: number, currency?: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(Number(price?.toFixed(2)));
};

export const validateEmail = (email: string) => {
  return !!email && email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
};

export const validatePassword = (password: string) => {
  return !!password && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/);
};

// eslint-disable-next-line
export const removeKey = (k = "", { [k]:_, ...o }: Record<string, any> = {}) => o;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeKeys = (keys: string[] = [], o: Record<string, any> = {}) => keys
  .reduce((r, k) => removeKey(k, r), o);