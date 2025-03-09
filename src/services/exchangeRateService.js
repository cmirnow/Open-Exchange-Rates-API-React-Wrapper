const cache = {
  data: null,
  timestamp: 0,
};

const CACHE_TTL = 60 * 60 * 1000; // 1 hour milliseconds
const API_URL = `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_CLIENT_ID}&symbols=EUR,CHF,GBP,SEK,DKK,NOK,CZK,PLN,AUD,NZD,USD,CAD,MXN,SGD,HKD,JPY,CNH,RUB,TRY,ILS,BRL,ARS,VES,MGA,EGP`;

export const fetchExchangeRates = async (setApiData) => {
  const now = Date.now();

  // If there is data in the cache and it is not older than 1 hour, we use it
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    setApiData(cache.data);
    return;
  }

  // If the cache is empty or out of date, make a new request
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

    // Save data to cache with the current timestamp
    cache.data = data;
    cache.timestamp = now;

    setApiData(data);
  } catch (error) {
    throw error;
  }
};
