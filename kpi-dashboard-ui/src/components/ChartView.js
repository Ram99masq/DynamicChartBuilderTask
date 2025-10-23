import React from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartView = ({ chartType, data }) => {
  if (!data || data.length === 0) return <p>No data available</p>;

  const labelKeys = ["zone", "class", "hour", "eventType", "id"];
  const labels = data.map((d, i) => {
    for (const key of labelKeys) {
      if (d[key] !== undefined) return d[key];
    }
    return `Item ${i + 1}`;
  });

  const values = data.map((d) => d.value);

  const chartData = {
    labels,
    datasets: [
      {
        label: "KPI Value",
        data: values,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        fill: chartType === "area",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "KPI Chart" },
    },
  };

  if (chartType === "bar") return <Bar data={chartData} options={options} />;
  if (chartType === "line" || chartType === "area") return <Line data={chartData} options={options} />;
  return <p>Unsupported chart type</p>;
};

export default ChartView;
