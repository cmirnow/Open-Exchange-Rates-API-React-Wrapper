import moment from "moment";

export const getChartOptions = (apiData, regions) => {
  const timestamp = apiData.timestamp || 0;
  const rates = apiData.rates || {};

  // Form series dynamically based on the object regions
  const series = Object.entries(regions).map(([name, currencies]) => ({
    name,
    data: currencies
      .filter((currency) => rates[currency] !== undefined) // Filter only existing currencies
      .map((currency) => ({
        name: currency,
        value: rates[currency],
      })),
  }));

  return {
    chart: {
      type: "packedbubble",
      height: "60%",
    },
    title: {
      text: "Exchange Rates. Source: OpenExchangeRates.org.",
      align: "left",
    },
    subtitle: {
      text: moment.unix(timestamp).format("MMMM Do YYYY, h:mm:ss a"),
      align: "left",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "bottom",
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
    series, // Using dynamically generated series
  };
};
