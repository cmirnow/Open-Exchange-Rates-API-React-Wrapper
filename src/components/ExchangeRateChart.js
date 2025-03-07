import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ExchangeRateChart = ({ options }) => (
  <HighchartsReact highcharts={Highcharts} options={options} />
);

export default ExchangeRateChart;
