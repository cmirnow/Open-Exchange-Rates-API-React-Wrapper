import React, { useState, useEffect, useMemo, Suspense } from "react";
import Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
import addAccessibility from "highcharts/modules/accessibility";
import { fetchExchangeRates } from "./services/exchangeRateService";
import { getChartOptions } from "./config/chartConfig";

addMore(Highcharts);
addAccessibility(Highcharts);

const ExchangeRateChart = React.lazy(() => import("./components/ExchangeRateChart"));

const regions = {
  Europe: ["EUR", "CHF", "GBP", "SEK", "DKK", "NOK", "CZK", "PLN"],
  Oceania: ["AUD", "NZD"],
  "North America": ["USD", "CAD", "MXN"],
  "South America": ["BRL", "ARS", "VES"],
  Africa: ["MGA", "EGP"],
  Asia: ["SGD", "HKD", "JPY", "CNH", "RUB", "TRY", "ILS"],
};

function App() {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    fetchExchangeRates(setApiData).catch((error) => {
      console.error("Error fetching exchange rates:", error.message);
    });
  }, []); // Called only when mounting (opening a page)

  const chartOptions = useMemo(() => getChartOptions(apiData, regions), [apiData]);

  return (
    <div>
      <Suspense fallback={<div>Loading chart...</div>}>
        {apiData.rates && <ExchangeRateChart options={chartOptions} />}
      </Suspense>
    </div>
  );
}

export default App;
