import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartByClass = ({ data }) => {
  const grouped = data.reduce((acc, item) => {
    const key = item.class;
    acc[key] = (acc[key] || 0) + (item.value || item.count || 1);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: "Total KPI",
        data: Object.values(grouped),
        backgroundColor: ["#8884d8", "#82ca9d"],
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChartByClass;
