const USD_CLP_ratio = 800;
export const toCLP = (amount, currency) => currency === "CLP" ? amount : amount * USD_CLP_ratio;
export const toUSD = (amount, currency) => currency === "USD" ? amount : amount / USD_CLP_ratio;