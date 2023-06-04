import React, { useState, useEffect } from "react";
import moment from "moment";
import Highcharts from "highcharts";
import addMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
addMore(Highcharts);

const url = `https://openexchangerates.org/api/latest.json?app_id=
${process.env.REACT_APP_CLIENT_ID}
&symbols=EUR,CHF,GBP,SEK,DKK,NOK,CZK,PLN,AUD,NZD,USD,CAD,MXN,SGD,HKD,JPY,CNH,RUB,TRY,ILS,BRL,ARS,VES,MGA,EGP`;

function App() {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setApiData(data));

      return data;
    };
    fetchData();
  }, []);

  var options = {
    chart: {
      type: "packedbubble",
      height: "60%",
    },
    title: {
      text: "Exchange Rates. Source: OpenExchangeRates.org.",
      align: "left",
    },
    subtitle: {
      text: moment.unix(apiData.timestamp).format("MMMM Do YYYY, h:mm:ss a"),
      align: "left",
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
      itemMarginTop: 10,
      itemMarginBottom: 10,
    },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}",
    },
    plotOptions: {
      packedbubble: {
        minSize: "60%",
        maxSize: "120%",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          splitSeries: false,
          gravitationalConstant: 0.02,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: [
      {
        name: "Europe",
        data: [
          {
            name: "EUR",
            value: apiData.rates?.EUR,
          },
          {
            name: "CHF",
            value: apiData.rates?.CHF,
          },
          {
            name: "GBP",
            value: apiData.rates?.GBP,
          },
          {
            name: "SEK",
            value: apiData.rates?.SEK,
          },
          {
            name: "DKK",
            value: apiData.rates?.DKK,
          },
          {
            name: "NOK",
            value: apiData.rates?.NOK,
          },
          {
            name: "CZK",
            value: apiData.rates?.CZK,
          },
          {
            name: "PLN",
            value: apiData.rates?.PLN,
          },
        ],
      },
      {
        name: "Oceania",
        data: [
          {
            name: "AUD",
            value: apiData.rates?.AUD,
          },
          {
            name: "NZD",
            value: apiData.rates?.NZD,
          },
        ],
      },
      {
        name: "North America",
        data: [
          {
            name: "USD",
            value: apiData.rates?.USD,
          },
          {
            name: "CAD",
            value: apiData.rates?.CAD,
          },
          {
            name: "MXN",
            value: apiData.rates?.MXN,
          },
        ],
      },
      {
        name: "South America",
        data: [
          {
            name: "BRL",
            value: apiData.rates?.BRL,
          },
          {
            name: "ARS",
            value: apiData.rates?.ARS,
          },
          {
            name: "VES",
            value: apiData.rates?.VES,
          },
        ],
      },
      {
        name: "Africa",
        data: [
          {
            name: "MGA",
            value: apiData.rates?.MGA,
          },
          {
            name: "EGP",
            value: apiData.rates?.EGP,
          },
        ],
      },
      {
        name: "Asia",
        data: [
          {
            name: "SGD",
            value: apiData.rates?.SGD,
          },
          {
            name: "HKD",
            value: apiData.rates?.HKD,
          },
          {
            name: "JPY",
            value: apiData.rates?.JPY,
          },
          {
            name: "CNH",
            value: apiData.rates?.CNH,
          },
          {
            name: "RUB",
            value: apiData.rates?.RUB,
          },
          {
            name: "TRY",
            value: apiData.rates?.TRY,
          },
          {
            name: "ILS",
            value: apiData.rates?.ILS,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default App;
