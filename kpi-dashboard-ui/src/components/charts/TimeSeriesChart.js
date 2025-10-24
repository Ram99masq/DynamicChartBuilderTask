import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const TimeSeriesChart = ({ data }) => {
  const grouped = data.reduce((acc, item) => {
    const key = item.timeBucket;
    acc[key] = (acc[key] || 0) + (item.value || item.count || 1);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "KPI Over Time",
        data: Object.values(grouped),
        borderColor: "#8884d8",
        backgroundColor: "rgba(136,132,216,0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TimeSeriesChart;
