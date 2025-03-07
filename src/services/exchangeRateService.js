const cache = {};

const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_CLIENT_ID}&symbols=EUR,CHF,GBP,SEK,DKK,NOK,CZK,PLN,AUD,NZD,USD,CAD,MXN,SGD,HKD,JPY,CNH,RUB,TRY,ILS,BRL,ARS,VES,MGA,EGP`;

export const fetchExchangeRates = async (setApiData) => {
  if (cache[API_URL]) {
    setApiData(cache[API_URL]);
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await response.json();
    cache[API_URL] = data;
    setApiData(data);
  } catch (error) {
    throw error;
  }
};
